package eco.market.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import java.math.BigDecimal;

public class CrearProductoRequest {
    
    @NotBlank(message = "El nombre del producto es requerido")
    private String nombreProducto;
    
    @NotBlank(message = "La descripción es requerida")
    private String descripcion;
    
    @NotNull(message = "El precio es requerido")
    @Min(value = 0, message = "El precio debe ser mayor a 0")
    private BigDecimal precio;
    
    private BigDecimal precioOriginal;
    
    @NotNull(message = "El stock es requerido")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;
    
    @NotNull(message = "La categoría es requerida")
    private Integer categoriaId;
    
    private Boolean esOrganico = false;
    private Boolean esVegano = false;
    private String imagenPrincipal;
    private Integer usuarioId;
    
    // Constructores
    public CrearProductoRequest() {
    }
    
    public CrearProductoRequest(String nombreProducto, String descripcion, BigDecimal precio, 
                               Integer stock, Integer categoriaId) {
        this.nombreProducto = nombreProducto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoriaId = categoriaId;
    }
    
    // Getters y Setters
    public String getNombreProducto() {
        return nombreProducto;
    }
    
    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public BigDecimal getPrecio() {
        return precio;
    }
    
    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
    
    public BigDecimal getPrecioOriginal() {
        return precioOriginal;
    }
    
    public void setPrecioOriginal(BigDecimal precioOriginal) {
        this.precioOriginal = precioOriginal;
    }
    
    public Integer getStock() {
        return stock;
    }
    
    public void setStock(Integer stock) {
        this.stock = stock;
    }
    
    public Integer getCategoriaId() {
        return categoriaId;
    }
    
    public void setCategoriaId(Integer categoriaId) {
        this.categoriaId = categoriaId;
    }
    
    public Boolean getEsOrganico() {
        return esOrganico;
    }
    
    public void setEsOrganico(Boolean esOrganico) {
        this.esOrganico = esOrganico;
    }
    
    public Boolean getEsVegano() {
        return esVegano;
    }
    
    public void setEsVegano(Boolean esVegano) {
        this.esVegano = esVegano;
    }
    
    public String getImagenPrincipal() {
        return imagenPrincipal;
    }
    
    public void setImagenPrincipal(String imagenPrincipal) {
        this.imagenPrincipal = imagenPrincipal;
    }
    
    public Integer getUsuarioId() {
        return usuarioId;
    }
    
    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }
}
