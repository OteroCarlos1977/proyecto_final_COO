import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import Button from "./Button";
import useFetchProductById from "../hooks/DataProductoDetalle";

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { producto, loading, error } = useFetchProductById(
    "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos",
    id
  );

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar el producto: {error}</Alert>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No se encontró el producto</Alert>
      </Container>
    );
  }

  return (
    <Container className="m-4">
      <h2 className="mb-3">{producto.title}</h2>

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

      <p>
        <strong>Precio:</strong> ${producto.price}
      </p>

      <p>
        <strong>Categoría:</strong> {producto.category}
      </p>

      <p>
        <strong>Stock disponible:</strong> {producto.stock}
      </p>

      <p>
        <strong>Descripción:</strong> {producto.description}
      </p>

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
