import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { evaluarRutaProtegida } from "../utils/routes";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { usuario, cargandoUsuario } = useAuth();
    const decision = evaluarRutaProtegida({ usuario, adminOnly, cargandoUsuario });

    if (decision.action === "loading") return null;

    if (decision.action === "redirect") {
        return <Navigate to={decision.to} replace />;
    }

    return children;
};

export default ProtectedRoute;
