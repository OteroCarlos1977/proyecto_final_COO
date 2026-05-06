import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usuarios from "../data/usuarios";
import {
  buscarUsuarioPorCredenciales,
  crearSesionSimulada,
  obtenerRutaPostLogin,
  sesionEstaVigente,
} from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const navigate = useNavigate();

  const login = (username, password) => {
    const user = buscarUsuarioPorCredenciales(usuarios, username, password);

    if (user) {
      const session = crearSesionSimulada(user);

      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user));
      localStorage.setItem("token", session.token);
      localStorage.setItem("expiracion", session.expiracion.toString());

      navigate(obtenerRutaPostLogin(user));

      return { success: true, user, token: session.token };
    }

    return { success: false, message: "Credenciales inválidas" };
  };

  const logout = useCallback(() => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("expiracion");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const expiracion = localStorage.getItem("expiracion");

    if (usuarioGuardado && expiracion) {
      if (sesionEstaVigente(expiracion)) {
        setUsuario(JSON.parse(usuarioGuardado));
      } else {
        logout();
      }
    }

    setCargandoUsuario(false);
  }, [logout]);

  const esAdministrador = () => usuario?.rol === "admin";

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, esAdministrador, cargandoUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
