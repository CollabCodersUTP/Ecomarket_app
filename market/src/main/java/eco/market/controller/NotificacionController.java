package eco.market.controller;

import eco.market.entity.Notificacion;
import eco.market.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*")
public class NotificacionController {
    
    @Autowired
    private NotificacionService notificacionService;
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Notificacion>> obtenerNotificacionesUsuario(@PathVariable Integer usuarioId) {
        List<Notificacion> notificaciones = notificacionService.obtenerNotificacionesUsuario(usuarioId);
        return ResponseEntity.ok(notificaciones);
    }
}