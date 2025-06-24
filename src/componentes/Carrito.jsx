// Importa hook de navegación de rutas
import { useNavigate } from 'react-router-dom';

// Componentes visuales de Bootstrap
import {
  Container,
  ListGroup,
  Alert,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button as BsButton
} from 'react-bootstrap';

// Botón personalizado reutilizable y un ícono para eliminar
import Button from "./Button";
import { FaTrash } from "react-icons/fa";

// Librería para alertas visuales
import Swal from 'sweetalert2';

// Estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Contexto del carrito y de usuario autenticado
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

// Componente principal del carrito
function Carrito() {
  const navigate = useNavigate(); // Para redireccionar entre páginas

  // Trae el estado y funciones del carrito
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    cambiarCantidad
  } = useCarrito();

  // Estado del usuario autenticado
  const { usuario } = useAuth();

  // Calcula el total acumulado de la compra
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
        eliminarDelCarrito(id); // Llama a la función del contexto
        Swal.fire('Eliminado', 'El producto fue eliminado del carrito.', 'success');
      }
    });
  };

  // Finaliza la compra, descuenta stock y vacía el carrito
  const finalizarCompra = async () => {
    if (!usuario) {
      // Si no hay sesión iniciada, redirige al login
      Swal.fire({
        title: 'Inicia sesión para continuar',
        text: 'Debes iniciar sesión para finalizar la compra.',
        icon: 'info',
        confirmButtonText: 'Ir al Login',
      }).then(() => navigate('/login'));
      return;
    }

    try {
      // Itera sobre cada producto del carrito y actualiza su stock
      for (const item of carrito) {
        const res = await fetch(`https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos/${item.id}`);
        const producto = await res.json();
        const nuevoStock = Math.max(producto.stock - item.cantidad, 0);

        await fetch(`https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...producto, stock: nuevoStock })
        });
      }

      Swal.fire({
        title: 'Compra completada',
        text: 'Tu compra ha sido procesada. Pronto recibirás información de la entrega.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        vaciarCarrito();
        navigate('/');
      });

    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      Swal.fire("Error", "Hubo un problema al procesar la compra.", "error");
    }
  };

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
              <Col xs={2} md={1} className="text-center p-1">
                <Image src={item.image} alt={item.title} fluid thumbnail style={{ maxHeight: '50px' }} />
              </Col>

              <Col xs={10} md={2}><small>{item.title}</small></Col>
              <Col xs={10} md={2}><small>Precio: ${item.price.toFixed(2)}</small></Col>

              <Col xs={6} md={3} className="text-md-end mt-2 mt-md-0">
                <ButtonGroup size="sm">
                  <BsButton
                    variant="outline-secondary"
                    onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >-</BsButton>
                  <BsButton variant="light" disabled>{item.cantidad}</BsButton>
                  <BsButton
                    variant="outline-secondary"
                    onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                    disabled={item.cantidad >= item.stock}
                  >+</BsButton>
                </ButtonGroup>
                <div><small>Stock disponible: {item.stock}</small></div>
              </Col>

              <Col xs={6} md={2} className="text-md-end mt-2 mt-md-0">
                <span>Subtotal: ${(item.price * item.cantidad).toFixed(2)}</span>
              </Col>

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

      <div className="mt-3 d-flex justify-content-end align-items-center">
        <h4>Total: ${calcularTotal()}</h4>
      </div>

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
