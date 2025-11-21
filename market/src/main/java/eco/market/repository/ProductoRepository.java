package eco.market.repository;

import eco.market.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByEstaActivoTrueAndEstaVerificadoTrue();
    List<Producto> findByCategoria_CategoriaIdAndEstaActivoTrueAndEstaVerificadoTrue(Integer categoriaId);
    List<Producto> findByVendedor_UsuarioId(Integer usuarioId);
    
    @Query("SELECT p FROM Producto p WHERE p.estaActivo = true AND p.estaVerificado = true ORDER BY p.fechaCreacion DESC")
    List<Producto> findActiveProductsOrderByDate();
}