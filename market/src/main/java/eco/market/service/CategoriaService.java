package eco.market.service;

import eco.market.entity.Categoria;
import eco.market.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    public Categoria getCategoriaById(Integer id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada con ID: " + id));
    }


    public List<Categoria> getCategoriasActivas() {
        return categoriaRepository.findByEstaActivaTrue();
    }

    public Categoria crearCategoria(Categoria categoria) {
        if (categoria.getNombreCategoria() == null || categoria.getNombreCategoria().isEmpty()) {
            throw new RuntimeException("El nombre de la categoría es obligatorio");
        }

        categoria.setFechaCreacion(LocalDateTime.now());
        if (categoria.getEstaActiva() == null) {
            categoria.setEstaActiva(true);
        }

        return categoriaRepository.save(categoria);
    }


    public Categoria actualizarCategoria(Integer id, Categoria categoriaActualizada) {
        Categoria categoriaExistente = getCategoriaById(id);

        if (categoriaActualizada.getNombreCategoria() != null) {
            categoriaExistente.setNombreCategoria(categoriaActualizada.getNombreCategoria());
        }

        if (categoriaActualizada.getDescripcion() != null) {
            categoriaExistente.setDescripcion(categoriaActualizada.getDescripcion());
        }

        if (categoriaActualizada.getImagenUrl() != null) {
            categoriaExistente.setImagenUrl(categoriaActualizada.getImagenUrl());
        }

        if (categoriaActualizada.getEstaActiva() != null) {
            categoriaExistente.setEstaActiva(categoriaActualizada.getEstaActiva());
        }

        return categoriaRepository.save(categoriaExistente);
    }


    public void eliminarCategoria(Integer id) {
        Categoria categoria = getCategoriaById(id);
        categoria.setEstaActiva(false);
        categoriaRepository.save(categoria);
    }


    public void eliminarCategoriaPermanente(Integer id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("Categoría no encontrada con ID: " + id);
        }
        categoriaRepository.deleteById(id);
    }
}