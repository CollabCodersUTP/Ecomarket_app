package eco.market.config;

import eco.market.entity.*;
import eco.market.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private RolRepository rolRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Crear roles si no existen
        if (rolRepository.count() == 0) {
            Rol comprador = new Rol();
            comprador.setNombreRol("COMPRADOR");
            comprador.setDescripcion("Usuario comprador");
            rolRepository.save(comprador);
            
            Rol vendedor = new Rol();
            vendedor.setNombreRol("VENDEDOR");
            vendedor.setDescripcion("Usuario vendedor");
            rolRepository.save(vendedor);
            
            Rol admin = new Rol();
            admin.setNombreRol("ADMIN");
            admin.setDescripcion("Administrador");
            rolRepository.save(admin);
        }
        
        // Crear categorías si no existen
        if (categoriaRepository.count() == 0) {
            Categoria frutas = new Categoria();
            frutas.setNombreCategoria("Frutas Orgánicas");
            frutas.setDescripcion("Frutas frescas y orgánicas");
            categoriaRepository.save(frutas);
            
            Categoria verduras = new Categoria();
            verduras.setNombreCategoria("Verduras Orgánicas");
            verduras.setDescripcion("Verduras frescas y orgánicas");
            categoriaRepository.save(verduras);
            
            Categoria lacteos = new Categoria();
            lacteos.setNombreCategoria("Lácteos Orgánicos");
            lacteos.setDescripcion("Productos lácteos orgánicos");
            categoriaRepository.save(lacteos);
        }
        
        // Crear usuario vendedor de ejemplo si no existe
        if (usuarioRepository.count() == 0) {
            Rol rolVendedor = rolRepository.findByNombreRol("VENDEDOR").orElse(null);
            if (rolVendedor != null) {
                Usuario vendedor = new Usuario();
                vendedor.setNombre("Juan");
                vendedor.setApellido("Pérez");
                vendedor.setEmail("vendedor@ecomarket.com");
                vendedor.setPasswordHash(passwordEncoder.encode("123456"));
                vendedor.setRol(rolVendedor);
                vendedor.setEstaActivo(true);
                vendedor.setEsVerificado(true);
                usuarioRepository.save(vendedor);
                
                // Crear productos de ejemplo
                Categoria frutasCategoria = categoriaRepository.findByEstaActivaTrue().get(0);
                
                Producto manzanas = new Producto();
                manzanas.setNombreProducto("Manzanas Orgánicas");
                manzanas.setDescripcion("Manzanas rojas orgánicas, frescas y deliciosas");
                manzanas.setPrecio(new BigDecimal("15.50"));
                manzanas.setStock(100);
                manzanas.setVendedor(vendedor);
                manzanas.setCategoria(frutasCategoria);
                manzanas.setEsOrganico(true);
                manzanas.setPeso(new BigDecimal("1.0"));
                manzanas.setUnidadMedida("kg");
                manzanas.setEstaActivo(true);
                manzanas.setEstaVerificado(true);
                productoRepository.save(manzanas);
                
                Producto platanos = new Producto();
                platanos.setNombreProducto("Plátanos Orgánicos");
                platanos.setDescripcion("Plátanos amarillos orgánicos, perfectos para el desayuno");
                platanos.setPrecio(new BigDecimal("12.00"));
                platanos.setStock(80);
                platanos.setVendedor(vendedor);
                platanos.setCategoria(frutasCategoria);
                platanos.setEsOrganico(true);
                platanos.setPeso(new BigDecimal("1.0"));
                platanos.setUnidadMedida("kg");
                platanos.setEstaActivo(true);
                platanos.setEstaVerificado(true);
                productoRepository.save(platanos);
            }
        }
    }
}