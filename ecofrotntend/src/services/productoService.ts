import api from './api';
import type { ProductoResponse, ProductoRequest, ProductoFiltros } from '../types/types';

export const productoService = {
  getAllProducts: async (): Promise<ProductoResponse[]> => {
    try {
      const response = await api.get<ProductoResponse[]>('/productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  getProductById: async (id: number): Promise<ProductoResponse> => {
    try {
      const response = await api.get<ProductoResponse>(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener producto ${id}:`, error);
      throw error;
    }
  },

  getProductsByCategory: async (categoriaId: number): Promise<ProductoResponse[]> => {
    try {
      const response = await api.get<ProductoResponse[]>(`/productos/categoria/${categoriaId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener productos de categoría ${categoriaId}:`, error);
      throw error;
    }
  },

  createProduct: async (producto: ProductoRequest): Promise<ProductoResponse> => {
    try {
      const response = await api.post<ProductoResponse>('/productos', producto);
      return response.data;
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      await api.delete(`/productos/${id}`);
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw error;
    }
  },

  filterProducts: (
    productos: ProductoResponse[],
    filtros: ProductoFiltros
  ): ProductoResponse[] => {
    return productos.filter((producto) => {
      if (filtros.categoriaId && filtros.categoriaNombre) {
        if (producto.categoria !== filtros.categoriaNombre) {
          return false;
        }
      }

      if (filtros.precioMin !== undefined && producto.precio < filtros.precioMin) {
        return false;
      }
      if (filtros.precioMax !== undefined && producto.precio > filtros.precioMax) {
        return false;
      }

      if (filtros.esOrganico !== undefined && producto.esOrganico !== filtros.esOrganico) {
        return false;
      }

      if (filtros.esVegano !== undefined && producto.esVegano !== filtros.esVegano) {
        return false;
      }

      if (filtros.soloActivos && !producto.estaActivo) {
        return false;
      }

      return true;
    });
  },

  sortProducts: (
    productos: ProductoResponse[],
    sortBy: 'precio-asc' | 'precio-desc' | 'rating' | 'newest' | 'relevance'
  ): ProductoResponse[] => {
    const sorted = [...productos];

    switch (sortBy) {
      case 'precio-asc':
        return sorted.sort((a, b) => a.precio - b.precio);
      case 'precio-desc':
        return sorted.sort((a, b) => b.precio - a.precio);
      case 'rating':
        return sorted.sort((a, b) => b.calificacionPromedio - a.calificacionPromedio);
      case 'newest':
        return sorted.sort((a, b) => {
          if (!a.fechaCreacion || !b.fechaCreacion) return 0;
          return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
        });
      default:
        return sorted;
    }
  },
};