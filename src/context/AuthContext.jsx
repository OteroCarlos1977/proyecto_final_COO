// Importa funciones necesarias de React y React Router
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importa un array de usuarios desde un archivo local (simulación de base de datos)
import usuarios from "../data/usuarios";

// Crea el contexto de autenticación
const AuthContext = createContext();

/**
 * Función para generar un token simulado con partes aleatorias y timestamp
 * Esto permite tener un token pseudoúnico en cada inicio de sesión
 */
function generarTokenSimulado() {
  const parte1 = Math.random().toString(36).substring(2, 8); // Letras y números aleatorios
  const parte2 = Date.now().toString(36);                    // Timestamp codificado en base 36
  const parte3 = Math.random().toString(36).substring(2, 8); // Otra parte aleatoria

  return `token-${parte1}-${parte2}-${parte3}`;              // Retorna el token completo
}

/**
 * Componente proveedor del contexto de autenticación
 * Permite acceder a las funciones de login, logout y al estado del usuario
 */
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);      // Estado del usuario autenticado
  const [cargandoUsuario, setCargandoUsuario] = useState(true); //Para la persistencia del usuario
  const navigate = useNavigate();                    // Hook para redirección de rutas

  /**
   * Función de inicio de sesión
   * Verifica si las credenciales coinciden con algún usuario simulado
   */
  const login = (username, password) => {
    const user = usuarios.find(
      (u) => u.usuario === username && u.password === password
    );

    if (user) {
      const token = generarTokenSimulado();                // Genera un token simulado
      setUsuario(user);                                    // Guarda el usuario en el estado
      localStorage.setItem("usuario", JSON.stringify(user)); // Guarda usuario en localStorage
      localStorage.setItem("token", token);                // Guarda el token en localStorage

      // Redirige al panel correspondiente según el rol
      navigate(user.rol === "admin" ? "/administrador" : "/");

      // Devuelve el resultado exitoso
      return { success: true, user, token };
    }

    // Si las credenciales no coinciden, devuelve error
    return { success: false, message: "Credenciales inválidas" };
  };

  /**
   * Función para cerrar sesión
   * Limpia tanto el estado como el almacenamiento local
   */
  const logout = () => {
    setUsuario(null);                   // Limpia el usuario del estado
    localStorage.removeItem("usuario"); // Elimina el usuario guardado
    localStorage.removeItem("token");   // Elimina el token simulado
    navigate("/login");                // Redirige al login
  };

  /**
   * Al montar el componente, verifica si hay un usuario autenticado previamente guardado
   */
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado)); // Si hay, lo carga al estado
    }
      setCargandoUsuario(false); //Verifica el usuario
  }, []);

  /**
   * Función que verifica si el usuario tiene rol de administrador
   */
  const esAdministrador = () => usuario?.rol === "admin";

  // Provee el contexto a los componentes hijos
  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, esAdministrador, cargandoUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para usar el contexto de autenticación fácilmente
 */
export const useAuth = () => useContext(AuthContext);
