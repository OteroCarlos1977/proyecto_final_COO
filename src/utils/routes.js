export const evaluarRutaProtegida = ({ usuario, adminOnly = false, cargandoUsuario = false }) => {
  if (cargandoUsuario) {
    return { action: "loading" };
  }

  if (!usuario) {
    return { action: "redirect", to: "/login" };
  }

  if (adminOnly && usuario.rol !== "admin") {
    return { action: "redirect", to: "/" };
  }

  return { action: "allow" };
};
