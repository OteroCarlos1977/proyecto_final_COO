import { useNavigate } from 'react-router-dom'; // Hook para redireccionar entre rutas
import {
  Container,
  ListGroup,
  Alert,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button as BsButton
} from 'react-bootstrap'; // Componentes de Bootstrap
import Button from "./Button"; // Componente de botón reutilizable
import { FaTrash } from "react-icons/fa"; // Icono de eliminación
import Swal from 'sweetalert2'; // Librería de alertas
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import { useCarrito } from '../context/CarritoContext'; // Contexto personalizado del carrito
import { useAuth } from '../context/AuthContext'; // Contexto de autenticación

function Carrito() {
  const navigate = useNavigate();

  // Accedemos al carrito y funciones del contexto
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    cambiarCantidad // Función que modifica la cantidad de un producto
  } = useCarrito();

  const { usuario } = useAuth(); // Acceso al usuario autenticado

  // Calcula el total de la compra sumando los subtotales de cada ítem
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.cantidad, 0).toFixed(2);
  };

  // Confirmación antes de eliminar un producto del carrito
  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este producto del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarDelCarrito(id); // Llama a la función de eliminación
        Swal.fire('Eliminado', 'El producto fue eliminado del carrito.', 'success');
      }
    });
  };

  // Lógica al finalizar la compra
  const finalizarCompra = () => {
    // Si no hay usuario logueado, se redirige al login
    if (!usuario) {
      Swal.fire({
        title: 'Inicia sesión para continuar',
        text: 'Debes iniciar sesión para finalizar la compra.',
        icon: 'info',
        confirmButtonText: 'Ir al Login',
      }).then(() => {
        navigate('/login');
      });
      return;
    }

    // Si el usuario está logueado, se confirma la compra
    Swal.fire({
      title: 'Compra completada',
      text: 'Tu compra ha sido procesada. Pronto recibirás información de la entrega.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      vaciarCarrito(); // Vacía el carrito
      navigate('/');   // Redirige al inicio
    });
  };

  // Si el carrito está vacío, se muestra un mensaje amigable
  if (!carrito || carrito.length === 0) {
    return (
      <Container className="mt-4 text-center">
        <h2>Carrito de Compras</h2>
        <Alert variant="info" className="mt-3">Tu carrito está vacío.</Alert>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => navigate('/')}
          texto="Volver a la Tienda"
        />
      </Container>
    );
  }

  // Si el carrito tiene productos, se muestra la tabla
  return (
    <Container className="mt-4">
      <h2>Carrito de Compras</h2>

      <ListGroup className="mb-3">
        {carrito.map(item => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between align-items-center flex-wrap"
          >
            <Row className="w-100 align-items-center">
              {/* Imagen del producto */}
              <Col xs={2} md={1} className="text-center p-1">
                <Image
                  src={item.image}
                  alt={item.title}
                  fluid
                  thumbnail
                  style={{ maxHeight: '50px' }}
                />
              </Col>

              {/* Nombre del producto */}
              <Col xs={10} md={2}>
                <small>{item.title}</small>
              </Col>

              {/* Precio unitario */}
              <Col xs={10} md={2}>
                <small>Precio: ${item.price.toFixed(2)}</small>
              </Col>

              {/* Selector de cantidad con botones + y - */}
              <Col xs={6} md={3} className="text-md-end mt-2 mt-md-0">
                <ButtonGroup size="sm">
                  <BsButton
                    variant="outline-secondary"
                    onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </BsButton>
                  <BsButton variant="light" disabled>
                    {item.cantidad}
                  </BsButton>
                  <BsButton
                    variant="outline-secondary"
                    onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                  >
                    +
                  </BsButton>
                </ButtonGroup>
              </Col>

              {/* Subtotal por producto */}
              <Col xs={6} md={2} className="text-md-end mt-2 mt-md-0">
                <span>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</span>
              </Col>

              {/* Botón para eliminar producto */}
              <Col xs={6} md={2} className="text-end mt-2 mt-md-0">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => confirmarEliminacion(item.id)}
                  Icono={FaTrash}
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Total acumulado */}
      <div className="mt-3 d-flex justify-content-end align-items-center">
        <h4>Total: ${calcularTotal()}</h4>
      </div>

      {/* Botones de acción */}
      <div className="mt-3 d-flex justify-content-between flex-wrap">
        <Button
          variant="primary"
          onClick={() => navigate('/')}
          className="mb-2"
          texto="Seguir Comprando"
        />
        <Button
          variant="success"
          className="mb-2"
          onClick={finalizarCompra}
          texto="Finalizar Compra"
        />
      </div>
    </Container>
  );
}

export default Carrito;
