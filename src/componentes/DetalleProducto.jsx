// Importa hooks de React Router
import { useParams, useNavigate } from "react-router-dom";

// Importa componentes para el front
import { Container, Spinner, Alert } from "react-bootstrap";
import Button from "./Button";

// Hook personalizado para obtener los datos del producto por ID
import useFetchProductById from "../hooks/DataProductoDetalle";

function DetalleProducto() {
  // Extrae el ID del producto desde la URL usando useParams
  const { id } = useParams();

  // Hook para redireccionar a otra ruta 
  const navigate = useNavigate();

  // Hook personalizado que obtiene el producto desde la API usando el ID
  const { product, loading, error } = useFetchProductById(
    "https://68100c3d27f2fdac24101ab5.mockapi.io/",
    id
  );

  // Mostrar spinner mientras se carga el producto
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  // Muestra mensaje de error si falla la carga de datos
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar productos: {error}</Alert>
      </Container>
    );
  }

  // Si no se encontró el producto con el ID proporcionado
  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No se encontró el producto</Alert>
      </Container>
    );
  }

  
  // Renderiza los detalles del producto
  return (
    <Container className="m-4">
      {/* Título del producto */}
      <h2>{product.producto}</h2>

      {/* Imagen del producto con estilo para que se vea bien */}
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "contain",
          marginBottom: "1rem",
        }}
      />

      {/* Precio del producto */}
      <p>
        <strong>Precio:</strong> ${product.price}
      </p>

      {/* Categoría a la que pertenece el producto */}
      <p>
        <strong>Producto:</strong> {product.producto}
      </p>

      {/* Descripción detallada del producto */}
      <p>
        <strong>Descripción:</strong> {product.description}
      </p>

      {/* Información del rating del producto (si está disponible) */}
      <p>
        <strong>Material:</strong> {product.material} 
      </p>

      {/* Botón para volver a la página principal */}
      <Button
        className="mt-2 align-self-center w-20"
        texto="Volver"
        onClick={() => navigate("/")}
        tooltip="Volver Página Principal"
        variant="primary"
      />
    </Container>
  );
}

export default DetalleProducto;
