
import { useState, useEffect } from 'react';
import { productoService } from '../services/productoService';
import { ProductoResponse, ProductoFiltros } from '../types';

export const useProductos = () => {
  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productoService.getAllProducts();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar los productos. Por favor, intenta nuevamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const refetch = () => {
    fetchProductos();
  };

  return {
    productos,
    loading,
    error,
    refetch,
  };
};

export const useProducto = (id: number) => {
  const [producto, setProducto] = useState<ProductoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productoService.getProductById(id);
        setProducto(data);
      } catch (err) {
        setError('Error al cargar el producto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProducto();
    }
  }, [id]);

  return {
    producto,
    loading,
    error,
  };
};

export const useProductosPorCategoria = (categoriaId: number | null) => {
  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      if (!categoriaId) {
        setProductos([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await productoService.getProductsByCategory(categoriaId);
        setProductos(data);
      } catch (err) {
        setError('Error al cargar los productos de la categoría.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaId]);

  return {
    productos,
    loading,
    error,
  };
};

// Hook para filtrar productos
export const useProductosFiltrados = (filtros: ProductoFiltros) => {
  const { productos, loading, error } = useProductos();
  const [productosFiltrados, setProductosFiltrados] = useState<ProductoResponse[]>([]);

  useEffect(() => {
    if (productos.length > 0) {
      const filtrados = productoService.filterProducts(productos, filtros);
      setProductosFiltrados(filtrados);
    }
  }, [productos, filtros]);

  return {
    productos: productosFiltrados,
    loading,
    error,
  };
};