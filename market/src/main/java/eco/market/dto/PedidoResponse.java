package eco.market.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PedidoResponse {
    private Integer pedidoId;
    private String numeroPedido;
    private String estado;
    private BigDecimal total;
    private BigDecimal subtotal;
    private BigDecimal costoEnvio;
    private String nombreDestinatario;
    private String direccionEnvio;
    private String metodoEnvio;
    private String metodoPago;
    private Boolean estaPagado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaPago;
    private String mensaje;
}
