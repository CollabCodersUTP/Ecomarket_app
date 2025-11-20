import api from './api';
import type { Categoria } from '../types/types';

export const categoriaService = {
  getAllCategorias: async (): Promise<Categoria[]> => {
    try {
      const response = await api.get<Categoria[]>('/categorias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw error;
    }
  },

  getCategoriaById: async (id: number): Promise<Categoria> => {
    try {
      const response = await api.get<Categoria>(`/categorias/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener categoría ${id}:`, error);
      throw error;
    }
  },

  getCategoriasActivas: async (): Promise<Categoria[]> => {
    try {
      const categorias = await categoriaService.getAllCategorias();
      return categorias.filter((cat) => cat.estaActiva);
    } catch (error) {
      console.error('Error al obtener categorías activas:', error);
      throw error;
    }
  },
};