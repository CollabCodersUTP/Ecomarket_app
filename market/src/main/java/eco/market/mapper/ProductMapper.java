package eco.market.mapper;

import eco.market.dto.ProductoRequest;
import eco.market.dto.ProductoResponse;
import eco.market.entity.Producto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "productoId", ignore = true)

    @Mapping(target="vendedor", ignore = true)
    @Mapping(target="categoria", ignore = true)

    @Mapping(target = "estaActivo", ignore = true)
    @Mapping(target = "estaVerificado", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    Producto toEntity (ProductoRequest request);

    @Mapping(target = "vendedor", source = "vendedor.nombre")
    @Mapping(target = "categoria", source = "categoria.nombreCategoria")
    ProductoResponse toResponse (Producto producto);

    @Mapping(target = "productoId", ignore = true)
    @Mapping(target="vendedor", ignore = true)
    @Mapping(target="categoria", ignore = true)
    void update (@MappingTarget Producto producto, ProductoRequest request);

}
