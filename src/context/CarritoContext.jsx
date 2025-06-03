
// Contexto para manejar las operaciones del carrito en toda la aplicación
import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto del carrito
const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    // Función para agregar productos al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existente = prev.find((item) => item.id === producto.id);
            if (existente) {
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

    // Función para eliminar elementos del carrito
    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter((item) => item.id !== id));
    };

    // Función para vaciar el carrito
    const vaciarCarrito = () => setCarrito([]);

    // Función para calcular el total del carrito
    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
    };

    // Contar la cantidad total de productos
    const cantidadTotal = () => {
        return carrito.reduce((acc, item) => acc + item.cantidad, 0);
    };

    // Efecto para persistir el carrito en localStorage
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, calcularTotal, cantidadTotal }}>
            {children}
        </CarritoContext.Provider>
    );
};

// Crear el hook para usar el contexto fácilmente
export const useCarrito = () => useContext(CarritoContext);
