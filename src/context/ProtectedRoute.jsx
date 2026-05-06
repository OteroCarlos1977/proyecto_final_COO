import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { usuario, esAdministrador, cargandoUsuario } = useAuth();

    if (cargandoUsuario) return null;

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !esAdministrador()) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
