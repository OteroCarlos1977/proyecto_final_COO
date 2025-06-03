import React, { useState } from "react";
import { Container, Form, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "../context/AuthContext";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Button from "../componentes/Button";

// Inicializa SweetAlert con soporte para componentes React
const MySwal = withReactContent(Swal);

//Alerta circunstancial para probar el ingreso
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
  // Estado para almacenar el nombre de usuario ingresado
  const [usuario, setUsuario] = useState("");
  // Estado para almacenar la contraseña ingresada
  const [password, setPassword] = useState("");
  // Estado para controlar la visibilidad de la contraseña (mostrar/ocultar)
  const [showPassword, setShowPassword] = useState(false);

  // Hook personalizado que provee la función de login desde el contexto de autenticación
  const { login } = useAuth();

  // Función que se ejecuta al enviar el formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Llama a la función login con usuario y contraseña
    const result = await login(usuario, password);

    if (result.success) {
      // Si login es exitoso, muestra un mensaje de bienvenida con SweetAlert
      MySwal.fire({
        title: `Bienvenido, ${result.user.nombre}`,
        icon: "success",
        confirmButtonText: "Continuar",
      });
    } else {
      // Si falla el login, muestra un mensaje de error con SweetAlert
      MySwal.fire({
        title: "Error",
        text: result.message,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Alterna el estado de visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          {/*Se agrega info para la prueba de usario/administrador*/}
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
            {/* Campo para ingresar el nombre de usuario */}
            <Form.Group controlId="formUsuario" className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Form.Group>

            {/* Campo para ingresar la contraseña con botón para mostrar/ocultar */}
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  // Cambia el tipo entre 'text' y 'password' según el estado showPassword
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Botón para alternar visibilidad de la contraseña */}
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  texto="" // Sin texto, solo muestra el ícono
                  Icono={showPassword ? AiFillEyeInvisible : AiFillEye}
                  style={{
                    width: "50px",
                    height: "40px",
                    backgroundColor: "#007bff",
                    color: "white",
                  }}
                ></Button>
              </div>
            </Form.Group>

            {/* Botón para enviar el formulario */}
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
