package eco.market.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "Pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pedido_id")
    private Integer pedidoId;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @Column(name = "numero_pedido", unique = true, nullable = false, length = 50)
    private String numeroPedido;
    
    @Column(name = "estado", nullable = false, length = 50)
    private String estado = "PENDIENTE"; // PENDIENTE, PAGADO, ENVIADO, ENTREGADO, CANCELADO
    
    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;
    
    @Column(name = "costo_envio", precision = 10, scale = 2)
    private BigDecimal costoEnvio = BigDecimal.ZERO;
    
    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;
    
    // Shipping information
    @Column(name = "nombre_destinatario", length = 200)
    private String nombreDestinatario;
    
    @Column(name = "direccion_envio", columnDefinition = "TEXT")
    private String direccionEnvio;
    
    @Column(name = "ciudad", length = 100)
    private String ciudad;
    
    @Column(name = "codigo_postal", length = 20)
    private String codigoPostal;
    
    @Column(name = "telefono_contacto", length = 20)
    private String telefonoContacto;
    
    @Column(name = "metodo_envio", length = 50)
    private String metodoEnvio = "STANDARD"; // STANDARD, EXPRESS
    
    // Payment information
    @Column(name = "metodo_pago", length = 50)
    private String metodoPago = "CARD"; // CARD, PAYPAL, TRANSFER
    
    @Column(name = "referencia_pago", length = 255)
    private String referenciaPago;
    
    @Column(name = "esta_pagado")
    private Boolean estaPagado = false;
    
    @Column(name = "fecha_pago")
    private LocalDateTime fechaPago;
    
    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion = LocalDateTime.now();
    
    @Column(name = "fecha_envio")
    private LocalDateTime fechaEnvio;
    
    @Column(name = "fecha_entrega")
    private LocalDateTime fechaEntrega;
    
    @Column(name = "notas", columnDefinition = "TEXT")
    private String notas;
}
