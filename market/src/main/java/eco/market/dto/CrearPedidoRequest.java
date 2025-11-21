package eco.market.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import lombok.Data;
import java.util.List;

@Data
public class CrearPedidoRequest {
    @NotNull(message = "El usuario ID es obligatorio")
    private Integer usuarioId;

    @NotBlank(message = "El nombre del destinatario es obligatorio")
    private String nombreDestinatario;

    @NotBlank(message = "La dirección de envío es obligatoria")
    private String direccionEnvio;

    @NotBlank(message = "La ciudad es obligatoria")
    private String ciudad;

    @NotBlank(message = "El código postal es obligatorio")
    private String codigoPostal;

    @NotBlank(message = "El teléfono es obligatorio")
    private String telefonoContacto;

    @NotBlank(message = "El método de envío es obligatorio")
    private String metodoEnvio; // STANDARD, EXPRESS

    @NotBlank(message = "El método de pago es obligatorio")
    private String metodoPago; // CARD, PAYPAL, TRANSFER

    @NotNull(message = "El subtotal es obligatorio")
    @Min(value = 0, message = "El subtotal debe ser mayor a 0")
    private Double subtotal;

    @NotNull(message = "El costo de envío es obligatorio")
    @Min(value = 0, message = "El costo de envío no puede ser negativo")
    private Double costoEnvio;

    @NotNull(message = "El total es obligatorio")
    @Min(value = 0, message = "El total debe ser mayor a 0")
    private Double total;

    // Items del pedido
    @NotNull(message = "Los items del pedido son obligatorios")
    private List<ItemPedidoRequest> items;

    private String notas;
}

@Data
class ItemPedidoRequest {
    private Integer productoId;
    private Integer cantidad;
    private Double precio;
}
