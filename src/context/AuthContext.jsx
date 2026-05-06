import { createContext, useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usuarios from "../data/usuarios";

const AuthContext = createContext();

function generarTokenSimulado() {
  const parte1 = Math.random().toString(36).substring(2, 8);
  const parte2 = Date.now().toString(36);
  const parte3 = Math.random().toString(36).substring(2, 8);
  return `token-${parte1}-${parte2}-${parte3}`;
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const navigate = useNavigate();

  const login = (username, password) => {
    const user = usuarios.find(
      (u) => u.usuario === username && u.password === password
    );

    if (user) {
      const token = generarTokenSimulado();
      const expiracion = Date.now() + 1000 * 60 * 60;

      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("expiracion", expiracion.toString());

      navigate(user.rol === "admin" ? "/administrador" : "/");

      return { success: true, user, token };
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
      const exp = parseInt(expiracion, 10);
      if (Date.now() < exp) {
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
