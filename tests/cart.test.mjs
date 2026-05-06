import assert from "node:assert/strict";
import { test } from "node:test";

import {
  agregarProducto,
  calcularCantidadTotal,
  calcularTotalCarrito,
  cambiarCantidadProducto,
  eliminarProducto,
} from "../src/utils/cart.js";

const producto = {
  id: 1,
  title: "Producto demo",
  price: 125.5,
  stock: 2,
};

test("agrega un producto nuevo con cantidad inicial uno", () => {
  const carrito = agregarProducto([], producto);

  assert.equal(carrito.length, 1);
  assert.equal(carrito[0].id, producto.id);
  assert.equal(carrito[0].cantidad, 1);
});

test("incrementa cantidad sin superar el stock disponible", () => {
  const conUno = agregarProducto([], producto);
  const conDos = agregarProducto(conUno, producto);
  const sinExcederStock = agregarProducto(conDos, producto);

  assert.equal(conDos[0].cantidad, 2);
  assert.equal(sinExcederStock[0].cantidad, 2);
});

test("cambia cantidad respetando minimo uno y maximo stock", () => {
  const carrito = [{ ...producto, cantidad: 1 }];

  assert.equal(cambiarCantidadProducto(carrito, producto.id, 0)[0].cantidad, 1);
  assert.equal(cambiarCantidadProducto(carrito, producto.id, 10)[0].cantidad, 2);
});

test("calcula total y cantidad acumulada del carrito", () => {
  const carrito = [
    { id: 1, price: 125.5, cantidad: 2 },
    { id: 2, price: 99.99, cantidad: 1 },
  ];

  assert.equal(calcularTotalCarrito(carrito), "350.99");
  assert.equal(calcularCantidadTotal(carrito), 3);
});

test("elimina productos por id", () => {
  const carrito = [
    { id: 1, price: 10, cantidad: 1 },
    { id: 2, price: 20, cantidad: 1 },
  ];

  assert.deepEqual(eliminarProducto(carrito, 1), [{ id: 2, price: 20, cantidad: 1 }]);
});
