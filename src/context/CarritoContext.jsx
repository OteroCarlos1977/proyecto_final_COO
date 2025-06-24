// Importa funciones esenciales de React
import { createContext, useContext, useState, useEffect } from "react";

// Crea el contexto del carrito (acceso global sin prop drilling)
const CarritoContext = createContext();

// Componente proveedor del contexto, que envuelve a toda la app
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]); // Estado global del carrito

  // ✅ Agrega un producto al carrito
  // Si ya existe, aumenta la cantidad solo si no supera el stock
  // Si no existe, lo agrega con cantidad 1
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        if (existente.cantidad >= producto.stock) {
          return prev; // No agrega más si supera el stock
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

  // ✅ Elimina un producto del carrito por ID
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Vacía completamente el carrito
  const vaciarCarrito = () => setCarrito([]);

  // ✅ Calcula el total en pesos del carrito
  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => total + item.price * item.cantidad, 0)
      .toFixed(2); // Se devuelve como string con 2 decimales
  };

  // ✅ Cuenta la cantidad total de unidades en el carrito
  const cantidadTotal = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  // ✅ Cambia la cantidad de un producto de forma manual (+/-), sin superar stock
  const cambiarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.min(Math.max(1, nuevaCantidad), item.stock || 1) }
          : item
      )
    );
  };

  // ✅ Carga el carrito desde localStorage si existe (una sola vez al montar)
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // ✅ Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Exporta las funciones y estado como valor del contexto
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

// Hook personalizado para consumir fácilmente el contexto del carrito
export const useCarrito = () => useContext(CarritoContext);