package eco.market.repository;

import eco.market.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    Optional<Pedido> findByNumeroPedido(String numeroPedido);
    List<Pedido> findByUsuario_UsuarioIdOrderByFechaCreacionDesc(Integer usuarioId);
    List<Pedido> findByEstadoOrderByFechaCreacionDesc(String estado);
}
