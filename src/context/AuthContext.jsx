// Importa funciones necesarias de React y React Router
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importa un array de usuarios desde un archivo local (simulación de base de datos)
import usuarios from "../data/usuarios";

// Crea el contexto de autenticación
const AuthContext = createContext();

/**
 * Genera un token simulado con partes aleatorias y un timestamp
 */
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

  /**
   * Función de inicio de sesión
   * Verifica credenciales, genera token, guarda usuario y token con expiración (1 hora)
   */
  const login = (username, password) => {
    const user = usuarios.find(
      (u) => u.usuario === username && u.password === password
    );

    if (user) {
      const token = generarTokenSimulado();
      const expiracion = Date.now() + 1000 * 60 * 60; // 1 hora en ms

      setUsuario(user);
      localStorage.setItem("usuario", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("expiracion", expiracion.toString());

      navigate(user.rol === "admin" ? "/administrador" : "/");

      return { success: true, user, token };
    }

    return { success: false, message: "Credenciales inválidas" };
  };

  /**
   * Función para cerrar sesión manual o por expiración
   */
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("expiracion");
    navigate("/login");
  };

  /**
   * Verifica al cargar la app si hay usuario válido y token no expirado
   */
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const expiracion = localStorage.getItem("expiracion");

    if (usuarioGuardado && expiracion) {
      const exp = parseInt(expiracion, 10);
      if (Date.now() < exp) {
        setUsuario(JSON.parse(usuarioGuardado));
      } else {
        logout(); // Token expirado
      }
    }

    setCargandoUsuario(false);
  }, []);

  /**
   * Retorna true si el usuario es administrador
   */
  const esAdministrador = () => usuario?.rol === "admin";

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, esAdministrador, cargandoUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto
 */
export const useAuth = () => useContext(AuthContext);
