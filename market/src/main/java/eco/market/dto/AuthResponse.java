package eco.market.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String tipo = "Bearer";
    private Integer usuarioId;
    private String email;
    private String nombre;
    private String rol;
    
    public AuthResponse(String token, Integer usuarioId, String email, String nombre, String rol) {
        this.token = token;
        this.usuarioId = usuarioId;
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
    }
}