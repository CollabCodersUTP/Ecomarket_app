import { useState, useEffect } from "react";

export interface CartItem {
  productoId: number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  imagenPrincipal?: string;
  stock: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading cart:", e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: any, cantidad: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productoId === product.productoId);
      if (existing) {
        return prev.map((i) =>
          i.productoId === product.productoId
            ? { ...i, cantidad: Math.min(i.cantidad + cantidad, i.stock) }
            : i
        );
      }
      return [
        ...prev,
        {
          productoId: product.productoId,
          nombreProducto: product.nombreProducto,
          precio: product.precio,
          cantidad,
          imagenPrincipal: product.imagenPrincipal,
          stock: product.stock,
        },
      ];
    });
  };

  const updateQuantity = (productoId: number, cantidad: number) => {
    if (cantidad <= 0) {
      removeItem(productoId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productoId === productoId
          ? { ...i, cantidad: Math.min(cantidad, i.stock) }
          : i
      )
    );
  };

  const removeItem = (productoId: number) => {
    setItems((prev) => prev.filter((i) => i.productoId !== productoId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  const getCount = () => {
    return items.reduce((acc, item) => acc + item.cantidad, 0);
  };

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
    getCount,
  };
}
