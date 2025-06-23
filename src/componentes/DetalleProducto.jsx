import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import Button from "./Button";
import useFetchProductById from "../hooks/DataProductoDetalle";

function DetalleProducto() {
  // Obtiene el ID del producto desde la URL
  const { id } = useParams();

  // Hook de navegación
  const navigate = useNavigate();

  // Hook personalizado que obtiene un producto por ID desde la API
  const { producto, loading, error } = useFetchProductById(
    "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos",
    id
  );

  // Si está cargando, muestra spinner centrado
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  // Si hay error en la carga
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar el producto: {error}</Alert>
      </Container>
    );
  }

  // Si no se encontró producto con el ID
  if (!producto) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No se encontró el producto</Alert>
      </Container>
    );
  }

  // Renderiza la vista de detalle del producto
  return (
    <Container className="m-4">
      {/* Título */}
      <h2 className="mb-3">{producto.title}</h2>

      {/* Imagen */}
      <img
        src={producto.image}
        alt={producto.title}
        className="img-fluid rounded border"
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "contain",
          marginBottom: "1rem",
        }}
      />

      {/* Precio */}
      <p>
        <strong>Precio:</strong> ${producto.price}
      </p>

      {/* Categoría */}
      <p>
        <strong>Categoría:</strong> {producto.category}
      </p>

      {/* Stock */}
      <p>
        <strong>Stock disponible:</strong> {producto.stock}
      </p>

      {/* Descripción */}
      <p>
        <strong>Descripción:</strong> {producto.description}
      </p>

      {/* Botón para volver */}
      <Button
        className="mt-3"
        texto="Volver"
        onClick={() => navigate("/")}
        tooltip="Volver a la página principal"
        variant="primary"
      />
    </Container>
  );
}

export default DetalleProducto;
