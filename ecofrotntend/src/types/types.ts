
export interface Categoria {
  categoriaId: number;
  nombreCategoria: string;
  descripcion?: string;
  imagenUrl?: string;
  fechaCreacion?: string;
  estaActiva: boolean;
}

export interface ProductoResponse {
  productoId: number;
  vendedor: string;
  categoria: string;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  stock: number;
  imagenPrincipal?: string;
  esOrganico: boolean;
  esVegano: boolean;
  peso?: number;
  unidadMedida?: string;
  calificacionPromedio: number;
  totalCalificaciones: number;
  estaActivo: boolean;
  estaVerificado: boolean;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface ProductoRequest {
  idVendedor: number;
  idCategoria: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  stock: number;
  // Campos comentados en el backend - descomenta si los activas allá:
  // imagenPrincipal?: string;
  // esOrganico?: boolean;
  // esVegano?: boolean;
  // peso?: number;
  // unidadMedida?: string;
  // calificacionPromedio?: number;
  // totalCalificaciones?: number;
}

// Filtros para el catálogo
export interface ProductoFiltros {
  categoriaId?: number;
  categoriaNombre?: string;
  precioMin?: number;
  precioMax?: number;
  esOrganico?: boolean;
  esVegano?: boolean;
  soloActivos?: boolean;
}