package eco.market.controller;

import eco.market.dto.CrearPedidoRequest;
import eco.market.dto.PedidoResponse;
import eco.market.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<?> crearPedido(@Valid @RequestBody CrearPedidoRequest request) {
        try {
            PedidoResponse response = pedidoService.crearPedido(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("mensaje", "Error al crear pedido: " + e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/{pedidoId}")
    public ResponseEntity<?> obtenerPedido(@PathVariable Integer pedidoId) {
        try {
            PedidoResponse response = pedidoService.obtenerPedidoPorId(pedidoId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/numero/{numeroPedido}")
    public ResponseEntity<?> obtenerPedidoPorNumero(@PathVariable String numeroPedido) {
        try {
            PedidoResponse response = pedidoService.obtenerPedidoPorNumero(numeroPedido);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> obtenerPedidosDelUsuario(@PathVariable Integer usuarioId) {
        try {
            List<PedidoResponse> response = pedidoService.obtenerPedidosDelUsuario(usuarioId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PutMapping("/{pedidoId}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Integer pedidoId, @RequestParam String estado) {
        try {
            PedidoResponse response = pedidoService.actualizarEstadoPedido(pedidoId, estado);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
