package eco.market.repository;

import eco.market.entity.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Integer> {
    List<Notificacion> findByUsuarioUsuarioIdOrderByFechaCreacionDesc(Integer usuarioId);
}