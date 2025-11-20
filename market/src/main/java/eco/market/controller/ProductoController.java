package eco.market.controller;

import eco.market.dto.ProductoResponse;
import eco.market.dto.CrearProductoRequest;
import eco.market.config.JwtUtil;
import eco.market.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private Integer obtenerUsuarioIdDelToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token no válido");
        }
        String token = authHeader.substring(7);
        return jwtUtil.getUsuarioIdFromToken(token);
    }
    
    private void validarVendedor(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token no válido");
        }
        String token = authHeader.substring(7);
        String rol = jwtUtil.getRolFromToken(token);
        if (!rol.equals("VENDEDOR")) {
            throw new RuntimeException("Solo los vendedores pueden crear productos");
        }
    }
    
    @GetMapping
    public ResponseEntity<List<ProductoResponse>> obtenerTodosLosProductos() {
        List<ProductoResponse> productos = productoService.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProductoPorId(@PathVariable Integer id) {
        try {
            ProductoResponse producto = productoService.obtenerProductoPorId(id);
            return ResponseEntity.ok(producto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<ProductoResponse>> obtenerProductosPorCategoria(@PathVariable Integer categoriaId) {
        List<ProductoResponse> productos = productoService.obtenerProductosPorCategoria(categoriaId);
        return ResponseEntity.ok(productos);
    }
    
    // Endpoints para vendedores
    
    @PostMapping
    public ResponseEntity<?> crearProducto(
            @Valid @RequestBody CrearProductoRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            validarVendedor(authHeader);
            Integer vendedorId = obtenerUsuarioIdDelToken(authHeader);
            ProductoResponse producto = productoService.crearProducto(request, vendedorId);
            return ResponseEntity.ok(producto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(
            @PathVariable Integer id, 
            @Valid @RequestBody CrearProductoRequest request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            validarVendedor(authHeader);
            Integer vendedorId = obtenerUsuarioIdDelToken(authHeader);
            ProductoResponse producto = productoService.actualizarProducto(id, request, vendedorId);
            return ResponseEntity.ok(producto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(
            @PathVariable Integer id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            validarVendedor(authHeader);
            Integer vendedorId = obtenerUsuarioIdDelToken(authHeader);
            productoService.eliminarProducto(id, vendedorId);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/vendedor/{vendedorId}")
    public ResponseEntity<?> obtenerProductosDelVendedor(@PathVariable Integer vendedorId) {
        try {
            List<ProductoResponse> productos = productoService.obtenerProductosDelVendedor(vendedorId);
            return ResponseEntity.ok(productos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
