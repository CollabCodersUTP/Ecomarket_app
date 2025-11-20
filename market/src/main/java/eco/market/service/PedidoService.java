package eco.market.service;

import eco.market.dto.CrearPedidoRequest;
import eco.market.dto.PedidoResponse;
import eco.market.entity.Pedido;
import eco.market.entity.Usuario;
import eco.market.entity.Notificacion;
import eco.market.repository.PedidoRepository;
import eco.market.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private NotificacionService notificacionService;
    
    @Autowired
    private EmailService emailService;
    
    public PedidoResponse crearPedido(CrearPedidoRequest request) {
        // Validar usuario
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Crear número de pedido único
        String numeroPedido = "PED-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        // Crear pedido
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setNumeroPedido(numeroPedido);
        pedido.setEstado("PENDIENTE");
        pedido.setSubtotal(BigDecimal.valueOf(request.getSubtotal() != null ? request.getSubtotal() : 0.0));
        pedido.setCostoEnvio(BigDecimal.valueOf(request.getCostoEnvio() != null ? request.getCostoEnvio() : 0.0));
        pedido.setTotal(BigDecimal.valueOf(request.getTotal() != null ? request.getTotal() : 0.0));
        pedido.setNombreDestinatario(request.getNombreDestinatario());
        pedido.setDireccionEnvio(request.getDireccionEnvio());
        pedido.setCiudad(request.getCiudad());
        pedido.setCodigoPostal(request.getCodigoPostal());
        pedido.setTelefonoContacto(request.getTelefonoContacto());
        pedido.setMetodoEnvio(request.getMetodoEnvio());
        pedido.setMetodoPago(request.getMetodoPago());
        pedido.setNotas(request.getNotas());
        
        // Procesar pago simulado
        pedido.setEstaPagado(true);
        pedido.setFechaPago(LocalDateTime.now());
        pedido.setReferenciaPago("TXN-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase());
        pedido.setEstado("PAGADO");
        
        // Guardar pedido
        pedido = pedidoRepository.save(pedido);
        
        // Enviar notificaciones
        notificacionService.crearNotificacion(
            usuario.getUsuarioId(),
            "Pedido Confirmado",
            "Tu pedido " + numeroPedido + " ha sido confirmado y pagado correctamente. Total: €" + request.getTotal(),
            Notificacion.TipoNotificacion.orden
        );
        
        // Enviar email
        emailService.enviarEmailBienvenida(usuario.getEmail(), usuario.getNombre());
        
        return convertirAResponse(pedido);
    }
    
    public PedidoResponse obtenerPedidoPorId(Integer pedidoId) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        return convertirAResponse(pedido);
    }
    
    public PedidoResponse obtenerPedidoPorNumero(String numeroPedido) {
        Pedido pedido = pedidoRepository.findByNumeroPedido(numeroPedido)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        return convertirAResponse(pedido);
    }
    
    public List<PedidoResponse> obtenerPedidosDelUsuario(Integer usuarioId) {
        return pedidoRepository.findByUsuario_UsuarioIdOrderByFechaCreacionDesc(usuarioId)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    public List<PedidoResponse> obtenerPedidosPorEstado(String estado) {
        return pedidoRepository.findByEstadoOrderByFechaCreacionDesc(estado)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
    
    public PedidoResponse actualizarEstadoPedido(Integer pedidoId, String nuevoEstado) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        
        String estadoAnterior = pedido.getEstado();
        pedido.setEstado(nuevoEstado);
        
        if ("ENVIADO".equals(nuevoEstado)) {
            pedido.setFechaEnvio(LocalDateTime.now());
        } else if ("ENTREGADO".equals(nuevoEstado)) {
            pedido.setFechaEntrega(LocalDateTime.now());
        }
        
        pedido = pedidoRepository.save(pedido);
        
        // Notificar al usuario
        String mensaje = "Tu pedido " + pedido.getNumeroPedido() + " ha cambiado de estado a: " + nuevoEstado;
        notificacionService.crearNotificacion(
            pedido.getUsuario().getUsuarioId(),
            "Actualización de Pedido",
            mensaje,
            Notificacion.TipoNotificacion.orden
        );
        
        return convertirAResponse(pedido);
    }
    
    private PedidoResponse convertirAResponse(Pedido pedido) {
        return new PedidoResponse(
            pedido.getPedidoId(),
            pedido.getNumeroPedido(),
            pedido.getEstado(),
            pedido.getTotal(),
            pedido.getSubtotal(),
            pedido.getCostoEnvio(),
            pedido.getNombreDestinatario(),
            pedido.getDireccionEnvio(),
            pedido.getMetodoEnvio(),
            pedido.getMetodoPago(),
            pedido.getEstaPagado(),
            pedido.getFechaCreacion(),
            pedido.getFechaPago(),
            "Pedido procesado correctamente"
        );
    }
}
