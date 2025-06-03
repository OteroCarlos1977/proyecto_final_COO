import { useAuth } from "../context/AuthContext";
import { Container } from "react-bootstrap";

//Pagina simple para que renderice algo, luego se podrá modificar
function PerfilUsuario() {
    const { usuario } = useAuth();

    if (!usuario) {
        return <p>No hay ningún usuario logueado.</p>;
    }

    return (
        <Container className="mt-4">
            <h1>Datos de Usuario</h1>
            <p><strong>Apellido y Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Usuario:</strong> {usuario.usuario}</p>
            <p><strong>Contraseña:</strong> {usuario.password}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
        </Container>
    );
}

export default PerfilUsuario;