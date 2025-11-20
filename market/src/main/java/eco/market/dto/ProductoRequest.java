package eco.market.dto;

import eco.market.entity.Categoria;
import eco.market.entity.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductoRequest {

    private Integer idVendedor;

    private Integer idCategoria;

    private String nombreProducto;

    private String descripcion;

    private BigDecimal precio;

    private Integer stock;


    private String imagenPrincipal;

    private Boolean esOrganico ;

    private Boolean esVegano ;

    private BigDecimal peso;

    private String unidadMedida;

    private BigDecimal calificacionPromedio;

    private Integer totalCalificaciones;
    

}
