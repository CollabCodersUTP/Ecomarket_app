package eco.market.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoRequest {

    @NotNull(message = "Vendedor es requerido")
    private Integer vendedorId;

    @NotNull(message = "La categoría es requerida")
    private Integer categoriaId;

    @NotBlank(message = "El nombre del producto es requerido")
    private String nombreProducto;

    @NotBlank(message = "La descripción es requerida")
    private String descripcion;

    @NotNull(message = "El precio es requerido")
    @Min(value = 0, message = "El precio debe ser mayor a 0")
    private BigDecimal precio;

    @NotNull(message = "El stock es requerido")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;


    private String imagenPrincipal;
    private Boolean esOrganico ;
    private Boolean esVegano ;

}
