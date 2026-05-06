import assert from "node:assert/strict";
import { test } from "node:test";

import usuarios from "../src/data/usuarios.js";
import {
  SESSION_DURATION_MS,
  buscarUsuarioPorCredenciales,
  crearSesionSimulada,
  obtenerRutaPostLogin,
  sesionEstaVigente,
} from "../src/utils/auth.js";

test("encuentra usuario demo con credenciales validas", () => {
  const admin = buscarUsuarioPorCredenciales(usuarios, "admin", "admin123");
  const user = buscarUsuarioPorCredenciales(usuarios, "user", "user123");

  assert.equal(admin?.rol, "admin");
  assert.equal(user?.rol, "usuario");
});

test("rechaza credenciales invalidas", () => {
  assert.equal(buscarUsuarioPorCredenciales(usuarios, "admin", "incorrecta"), null);
  assert.equal(buscarUsuarioPorCredenciales(usuarios, "noexiste", "admin123"), null);
});

test("crea sesion simulada con token y expiracion de una hora", () => {
  const timestamp = 1_700_000_000_000;
  const admin = buscarUsuarioPorCredenciales(usuarios, "admin", "admin123");
  const session = crearSesionSimulada(admin, timestamp);

  assert.match(session.token, /^token-/);
  assert.equal(session.expiracion, timestamp + SESSION_DURATION_MS);
  assert.equal(session.user.usuario, "admin");
});

test("define ruta posterior al login segun rol", () => {
  const admin = buscarUsuarioPorCredenciales(usuarios, "admin", "admin123");
  const user = buscarUsuarioPorCredenciales(usuarios, "user", "user123");

  assert.equal(obtenerRutaPostLogin(admin), "/administrador");
  assert.equal(obtenerRutaPostLogin(user), "/");
});

test("valida vigencia de sesion por timestamp", () => {
  const now = 1_700_000_000_000;

  assert.equal(sesionEstaVigente(String(now + 10), now), true);
  assert.equal(sesionEstaVigente(String(now), now), false);
  assert.equal(sesionEstaVigente("valor-invalido", now), false);
});
