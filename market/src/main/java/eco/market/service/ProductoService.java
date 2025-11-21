package eco.market.service;

import eco.market.dto.ProductoResponse;
import eco.market.dto.CrearProductoRequest;
import eco.market.entity.Categoria;
import eco.market.entity.Producto;
import eco.market.entity.Usuario;
import eco.market.repository.CategoriaRepository;
import eco.market.repository.ProductoRepository;
import eco.market.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<ProductoResponse> obtenerTodosLosProductos() {
        return productoRepository.findActiveProductsOrderByDate()
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    public List<ProductoResponse> obtenerProductosPorCategoria(Integer categoriaId) {
        return productoRepository.findByCategoria_CategoriaIdAndEstaActivoTrueAndEstaVerificadoTrue(categoriaId)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }

    public ProductoResponse obtenerProductoPorId(Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!producto.getEstaActivo() || !producto.getEstaVerificado()) {
            throw new RuntimeException("Producto no disponible");
        }

        return convertirAResponse(producto);
    }

    public List<Categoria> obtenerCategorias() {
        return categoriaRepository.findByEstaActivaTrue();
    }

    private ProductoResponse convertirAResponse(Producto producto) {
        ProductoResponse response = new ProductoResponse();
        response.setProductoId(producto.getProductoId());
        response.setNombreProducto(producto.getNombreProducto());
        response.setDescripcion(producto.getDescripcion());
        response.setPrecio(producto.getPrecio());
        response.setPrecioOriginal(producto.getPrecioOriginal());
        response.setStock(producto.getStock());
        response.setImagenPrincipal(producto.getImagenPrincipal());
        response.setEsOrganico(producto.getEsOrganico());
        response.setEsVegano(producto.getEsVegano());
        response.setPeso(producto.getPeso());
        response.setUnidadMedida(producto.getUnidadMedida());
        response.setCalificacionPromedio(producto.getCalificacionPromedio());
        response.setTotalCalificaciones(producto.getTotalCalificaciones());
        /*
         * response.setNombreCategoria(producto.getCategoria().getNombreCategoria());
         * response.setNombreVendedor(producto.getVendedor().getNombre() + " " +
         * producto.getVendedor().getApellido());
         */
        response.setFechaCreacion(producto.getFechaCreacion());
        return response;
    }

    // Métodos para CRUD de productos por vendedor

    public ProductoResponse crearProducto(CrearProductoRequest request, Integer vendedorId) {
        Usuario vendedor = usuarioRepository.findById(vendedorId)
                .orElseThrow(() -> new RuntimeException("Vendedor no encontrado"));

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Producto producto = new Producto();
        producto.setNombreProducto(request.getNombreProducto());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setPrecioOriginal(
                request.getPrecioOriginal() != null ? request.getPrecioOriginal() : request.getPrecio());
        producto.setStock(request.getStock());
        producto.setCategoria(categoria);
        producto.setVendedor(vendedor);
        producto.setEsOrganico(request.getEsOrganico() != null ? request.getEsOrganico() : false);
        producto.setEsVegano(request.getEsVegano() != null ? request.getEsVegano() : false);
        producto.setImagenPrincipal(request.getImagenPrincipal());
        producto.setEstaActivo(false); // Pendiente de verificación
        producto.setEstaVerificado(false);
        producto.setFechaCreacion(LocalDateTime.now());

        Producto productoGuardado = productoRepository.save(producto);
        return convertirAResponse(productoGuardado);
    }

    public ProductoResponse actualizarProducto(Integer productoId, CrearProductoRequest request, Integer vendedorId) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Validar que el vendedor sea el dueño del producto
        if (!producto.getVendedor().getUsuarioId().equals(vendedorId)) {
            throw new RuntimeException("No tienes permiso para actualizar este producto");
        }

        Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        producto.setNombreProducto(request.getNombreProducto());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        if (request.getPrecioOriginal() != null) {
            producto.setPrecioOriginal(request.getPrecioOriginal());
        }
        producto.setStock(request.getStock());
        producto.setCategoria(categoria);
        producto.setEsOrganico(request.getEsOrganico() != null ? request.getEsOrganico() : false);
        producto.setEsVegano(request.getEsVegano() != null ? request.getEsVegano() : false);
        if (request.getImagenPrincipal() != null) {
            producto.setImagenPrincipal(request.getImagenPrincipal());
        }
        producto.setFechaActualizacion(LocalDateTime.now());

        Producto productoActualizado = productoRepository.save(producto);
        return convertirAResponse(productoActualizado);
    }

    public void eliminarProducto(Integer productoId, Integer vendedorId) {
        Producto producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Validar que el vendedor sea el dueño del producto
        if (!producto.getVendedor().getUsuarioId().equals(vendedorId)) {
            throw new RuntimeException("No tienes permiso para eliminar este producto");
        }

        productoRepository.delete(producto);
    }

    public List<ProductoResponse> obtenerProductosDelVendedor(Integer vendedorId) {
        return productoRepository.findByVendedor_UsuarioId(vendedorId)
                .stream()
                .map(this::convertirAResponse)
                .collect(Collectors.toList());
    }
}
