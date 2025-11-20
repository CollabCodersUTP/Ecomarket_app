package eco.market.controller;

import eco.market.dto.ProductoRequest;
import eco.market.dto.ProductoResponse;
import eco.market.entity.Categoria;
import eco.market.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    
    @Autowired
    private ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoResponse> crear(@RequestBody ProductoRequest request){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productoService.crearProducto(request));
    }

    @GetMapping
    public ResponseEntity<List<ProductoResponse>> obtenerTodosLosProductos() {
        List<ProductoResponse> productos = productoService.getAllProducts();
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

    @DeleteMapping("/{idProduct}")
    public ResponseEntity<Void> deleteById(@PathVariable Integer idProduct) throws Exception {
        productoService.deleteById(idProduct);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<ProductoResponse>> obtenerProductosPorCategoria(@PathVariable Integer categoriaId) {
        List<ProductoResponse> productos = productoService.obtenerProductosPorCategoria(categoriaId);
        return ResponseEntity.ok(productos);
    }
}