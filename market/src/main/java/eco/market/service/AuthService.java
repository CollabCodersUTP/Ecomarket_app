package eco.market.service;

import eco.market.dto.*;
import eco.market.entity.*;
import eco.market.repository.*;
import eco.market.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private NotificacionService notificacionService;

    @Autowired
    private EmailService emailService;

    public AuthResponse registrarUsuario(RegistroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Buscar rol de comprador (por defecto)
        Rol rolComprador = rolRepository.findByNombreRol("COMPRADOR")
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setEmail(request.getEmail());
        usuario.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        usuario.setTelefono(request.getTelefono());
        usuario.setDireccion(request.getDireccion());
        usuario.setCiudad(request.getCiudad());
        usuario.setPais(request.getPais());
        usuario.setCodigoPostal(request.getCodigoPostal());
        usuario.setRol(rolComprador);

        usuario = usuarioRepository.save(usuario);

        // Enviar notificación de bienvenida
        notificacionService.crearNotificacion(
                usuario.getUsuarioId(),
                "¡Bienvenido a EcoMarket!",
                "Tu cuenta ha sido creada exitosamente. ¡Comienza a explorar nuestros productos ecológicos!",
                Notificacion.TipoNotificacion.sistema);

        // Enviar email de confirmación
        emailService.enviarEmailBienvenida(usuario.getEmail(), usuario.getNombre());

        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getUsuarioId(),
                usuario.getRol().getNombreRol());

        return new AuthResponse(token, usuario.getUsuarioId(), usuario.getEmail(), usuario.getNombre(), usuario.getRol().getNombreRol());
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        if (!usuario.getEstaActivo()) {
            throw new RuntimeException("Cuenta desactivada");
        }

        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getUsuarioId(),
                usuario.getRol().getNombreRol());

        return new AuthResponse(token, usuario.getUsuarioId(), usuario.getEmail(),
                usuario.getNombre(), usuario.getRol().getNombreRol());
    }
}