import { createContext, useContext, useState, useEffect } from "react";
import {
  agregarProducto,
  calcularCantidadTotal,
  calcularTotalCarrito,
  cambiarCantidadProducto,
  eliminarProducto,
} from "../utils/cart";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => agregarProducto(prev, producto));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => eliminarProducto(prev, id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const calcularTotal = () => calcularTotalCarrito(carrito);

  const cantidadTotal = () => calcularCantidadTotal(carrito);

  const cambiarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) => cambiarCantidadProducto(prev, id, nuevaCantidad));
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
