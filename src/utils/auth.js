export const SESSION_DURATION_MS = 1000 * 60 * 60;

export const generarTokenSimulado = (timestamp = Date.now()) => {
  const parte1 = Math.random().toString(36).substring(2, 8);
  const parte2 = timestamp.toString(36);
  const parte3 = Math.random().toString(36).substring(2, 8);
  return `token-${parte1}-${parte2}-${parte3}`;
};

export const buscarUsuarioPorCredenciales = (usuarios, username, password) =>
  usuarios.find((user) => user.usuario === username && user.password === password) || null;

export const crearSesionSimulada = (user, timestamp = Date.now()) => ({
  user,
  token: generarTokenSimulado(timestamp),
  expiracion: timestamp + SESSION_DURATION_MS,
});

export const obtenerRutaPostLogin = (user) =>
  user?.rol === "admin" ? "/administrador" : "/";

export const sesionEstaVigente = (expiracion, timestamp = Date.now()) => {
  const expirationTime = Number.parseInt(expiracion, 10);
  return Number.isFinite(expirationTime) && timestamp < expirationTime;
};
