// Importa funciones necesarias de React y React Router
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importa un array de usuarios desde un archivo local
import usuarios from "../data/usuarios";

// Crea un contexto de autenticación para compartir entre componentes
const AuthContext = createContext();

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario autenticado
    const navigate = useNavigate(); // Hook para navegar
    
    // Función para iniciar sesión
    const login = (username, password) => {
        // Busca en la lista de usuarios un usuario con el username y password correctos
        const user = usuarios.find(u => u.usuario === username && u.password === password);

        if (user) {
            // Si se encuentra, guarda al usuario en el estado y en localStorage
            setUsuario(user);
            localStorage.setItem("usuario", JSON.stringify(user));
            // Redirige según el rol del usuario
            navigate(user.rol === "admin" ? "/administrador" : "/");
            // Retorna un objeto de éxito
            return { success: true, user };
        }

        // Si no se encuentra el usuario, retorna error
        return { success: false, message: "Credenciales inválidas" };
    };

    // Función para cerrar sesión
    const logout = () => {
        setUsuario(null); // Limpia el estado del usuario
        localStorage.removeItem("usuario"); // Elimina el usuario del almacenamiento local
        navigate('/login'); // Redirige a la pantalla de login
    };

    // Al montar el componente, revisa si hay un usuario guardado en localStorage
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado)); // Si lo hay, lo carga al estado
        }
    }, []);

    // Función para saber si el usuario actual es administrador
    const esAdministrador = () => usuario?.rol === "admin";

    // Provee el contexto con las funciones y datos del usuario
    return (
        <AuthContext.Provider value={{ usuario, login, logout, esAdministrador }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación fácilmente
export const useAuth = () => useContext(AuthContext);
