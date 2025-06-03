// Importa el componente Navigate de React Router para navegar
import { Navigate } from "react-router-dom";
// Importa el hook de autenticación desde el contexto
import { useAuth } from "../context/AuthContext";

// Componente para proteger rutas según el rol del usuario
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { usuario, esAdministrador } = useAuth(); // Obtiene el usuario actual y si es admin

    // Si el usuario no está autenticado, redirige a la página de login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Si la ruta es solo para administradores y el usuario no lo es, redirige al inicio
    if (adminOnly && !esAdministrador()) {
        return <Navigate to="/" replace />;
    }

    // Si pasa las verificaciones, renderiza el contenido protegido
    return children;
};

export default ProtectedRoute;
