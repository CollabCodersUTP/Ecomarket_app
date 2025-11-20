
import { useState, useEffect } from 'react';
import { categoriaService } from '../services/categoriaService';
import { Categoria } from '../types';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriaService.getAllCategorias();
        setCategorias(data);
      } catch (err) {
        setError('Error al cargar las categorías.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
  };
};

export const useCategoriasActivas = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoriaService.getCategoriasActivas();
        setCategorias(data);
      } catch (err) {
        setError('Error al cargar las categorías activas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return {
    categorias,
    loading,
    error,
  };
};