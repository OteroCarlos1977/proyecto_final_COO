export const agregarProducto = (carrito, producto) => {
  const existente = carrito.find((item) => item.id === producto.id);

  if (!existente) {
    return [...carrito, { ...producto, cantidad: 1 }];
  }

  if (existente.cantidad >= producto.stock) {
    return carrito;
  }

  return carrito.map((item) =>
    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
  );
};

export const eliminarProducto = (carrito, id) =>
  carrito.filter((item) => item.id !== id);

export const cambiarCantidadProducto = (carrito, id, nuevaCantidad) =>
  carrito.map((item) =>
    item.id === id
      ? { ...item, cantidad: Math.min(Math.max(1, nuevaCantidad), item.stock || 1) }
      : item
  );

export const calcularTotalCarrito = (carrito) =>
  carrito.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);

export const calcularCantidadTotal = (carrito) =>
  carrito.reduce((acc, item) => acc + item.cantidad, 0);
