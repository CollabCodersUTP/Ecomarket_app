package eco.market.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "Productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "producto_id")
    private Integer productoId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendedor_id", nullable = false)
    private Usuario vendedor;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;
    
    @Column(name = "nombre_producto", nullable = false, length = 200)
    private String nombreProducto;
    
    @Column(name = "descripcion", nullable = false, columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @Column(name = "precio_original", precision = 10, scale = 2)
    private BigDecimal precioOriginal;
    
    @Column(name = "stock", nullable = false)
    private Integer stock = 0;
    
    @Column(name = "imagen_principal", length = 255)
    private String imagenPrincipal;
    
    @Column(name = "es_organico")
    private Boolean esOrganico = false;
    
    @Column(name = "es_vegano")
    private Boolean esVegano = false;
    
    @Column(name = "peso", precision = 8, scale = 2)
    private BigDecimal peso;
    
    @Column(name = "unidad_medida", length = 20)
    private String unidadMedida;
    
    @Column(name = "calificacion_promedio", precision = 3, scale = 2)
    private BigDecimal calificacionPromedio = BigDecimal.ZERO;
    
    @Column(name = "total_calificaciones")
    private Integer totalCalificaciones = 0;
    
    @Column(name = "esta_activo")
    private Boolean estaActivo = true;
    
    @Column(name = "esta_verificado")
    private Boolean estaVerificado = false;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();
    
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion = LocalDateTime.now();
}