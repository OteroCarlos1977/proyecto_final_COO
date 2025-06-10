import React, { useState } from "react";
import { Container, Form, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/AuthContext";
import { AiFillEye, AiFillEyeInvisible, AiOutlineInfoCircle } from "react-icons/ai";
import Button from "../componentes/Button";

// Inicializa SweetAlert con soporte para componentes React
const MySwal = withReactContent(Swal);

// Alerta informativa con credenciales de prueba
const handleInfoClick = () => {
  MySwal.fire({
    title: "Información de Acceso",
    html: `
      <p><strong>Administrador:</strong><br>Usuario: <code>admin</code> Clave: <code>admin123</code></p>
      <p><strong>Usuario:</strong><br>Usuario: <code>user</code> Clave: <code>user123</code></p>
    `,
    icon: "info",
    confirmButtonText: "Cerrar",
  });
};

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(usuario, password);

    if (result.success) {
      MySwal.fire({
        title: `Bienvenido, ${result.user.nombre}`,
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } else {
      MySwal.fire({
        title: "Error",
        text: result.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          {/* Icono de ayuda con info de acceso */}
          <div className="d-flex justify-content-end">
            <AiOutlineInfoCircle
              size={24}
              style={{ cursor: "pointer", color: "#007bff" }}
              title="Información de acceso"
              onClick={handleInfoClick}
            />
          </div>

          <Card.Title className="mb-4 text-center">Iniciar Sesión</Card.Title>

          <Form onSubmit={handleSubmit}>
            {/* Usuario */}
            <Form.Group controlId="formUsuario" className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Form.Group>

            {/* Contraseña con botón mostrar/ocultar */}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  texto=""
                  Icono={showPassword ? AiFillEyeInvisible : AiFillEye}
                  style={{
                    width: "50px",
                    height: "40px",
                    backgroundColor: "#007bff",
                    color: "white",
                  }}
                />
              </div>
            </Form.Group>

            {/* Botón de acceso */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              texto="Acceder"
            />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
