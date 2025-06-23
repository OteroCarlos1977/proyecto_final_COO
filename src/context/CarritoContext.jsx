import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto del carrito
const CarritoContext = createContext();

// Proveedor del contexto que encapsula la lógica global del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        // Si el producto ya está en el carrito, aumenta su cantidad
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no está, lo agrega con cantidad inicial 1
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para vaciar todo el carrito
  const vaciarCarrito = () => setCarrito([]);

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito
      .reduce((total, item) => total + item.price * item.cantidad, 0)
      .toFixed(2);
  };

  // Función para contar la cantidad total de unidades
  const cantidadTotal = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  // ✅ Función para cambiar la cantidad de un producto (usada con botones + / -)
  const cambiarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, nuevaCantidad) } // No permite menos de 1
          : item
      )
    );
  };

  // Al iniciar, carga el carrito desde localStorage si existe
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Cada vez que el carrito cambia, lo guarda en localStorage
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
        cambiarCantidad, // ✅ Expuesta para que otros componentes la usen
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado para consumir el contexto del carrito fácilmente
export const useCarrito = () => useContext(CarritoContext);
