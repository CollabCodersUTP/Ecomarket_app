package eco.market.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductoResponse {
    private Integer productoId;
    private String nombreProducto;
    private String descripcion;
    private BigDecimal precio;
    private BigDecimal precioOriginal;
    private Integer stock;
    private String imagenPrincipal;
    private Boolean esOrganico;
    private Boolean esVegano;
    private BigDecimal peso;
    private String unidadMedida;
    private BigDecimal calificacionPromedio;
    private Integer totalCalificaciones;
    private String nombreCategoria;
    private String nombreVendedor;
    private LocalDateTime fechaCreacion;
}