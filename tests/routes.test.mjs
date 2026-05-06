import assert from "node:assert/strict";
import { test } from "node:test";

import { evaluarRutaProtegida } from "../src/utils/routes.js";

const admin = { usuario: "admin", rol: "admin" };
const user = { usuario: "user", rol: "usuario" };

test("mantiene estado de carga mientras se recupera la sesion", () => {
  assert.deepEqual(evaluarRutaProtegida({ cargandoUsuario: true }), { action: "loading" });
});

test("redirige al login si no hay usuario autenticado", () => {
  assert.deepEqual(evaluarRutaProtegida({ usuario: null }), {
    action: "redirect",
    to: "/login",
  });
});

test("permite rutas privadas a usuarios autenticados", () => {
  assert.deepEqual(evaluarRutaProtegida({ usuario: user }), { action: "allow" });
});

test("redirige al home si una ruta admin recibe usuario comun", () => {
  assert.deepEqual(evaluarRutaProtegida({ usuario: user, adminOnly: true }), {
    action: "redirect",
    to: "/",
  });
});

test("permite rutas admin a usuarios administradores", () => {
  assert.deepEqual(evaluarRutaProtegida({ usuario: admin, adminOnly: true }), { action: "allow" });
});
