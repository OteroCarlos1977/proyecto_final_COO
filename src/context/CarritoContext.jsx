import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        if (existente.cantidad >= producto.stock) {
          return prev;
        }
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => total + item.price * item.cantidad, 0)
      .toFixed(2);
  };

  const cantidadTotal = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(Math.max(1, nuevaCantidad), item.stock || 1) }
          : item
      )
    );
  };

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // La demo conserva el carrito entre recargas usando persistencia local del navegador.
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        calcularTotal,
        cantidadTotal,
        cambiarCantidad,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
