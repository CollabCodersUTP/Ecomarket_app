package eco.market.service;

import eco.market.entity.Notificacion;
import eco.market.entity.Usuario;
import eco.market.repository.NotificacionRepository;
import eco.market.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class NotificacionService {
    
    @Autowired
    private NotificacionRepository notificacionRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    public void crearNotificacion(Integer usuarioId, String titulo, String mensaje, Notificacion.TipoNotificacion tipo) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Notificacion notificacion = new Notificacion();
        notificacion.setUsuario(usuario);
        notificacion.setTitulo(titulo);
        notificacion.setMensaje(mensaje);
        notificacion.setTipo(tipo);
        
        notificacionRepository.save(notificacion);
    }
    
    public List<Notificacion> obtenerNotificacionesUsuario(Integer usuarioId) {
        return notificacionRepository.findByUsuarioUsuarioIdOrderByFechaCreacionDesc(usuarioId);
    }
}