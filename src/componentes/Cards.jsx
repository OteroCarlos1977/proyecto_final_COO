// Hooks y dependencias de React y React Router
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes de Bootstrap para layout, tarjetas y formularios
import { Card, Container, Row, Col, Spinner, Alert, Form, FormControl } from "react-bootstrap";

// Botón personalizado e ícono
import Button from "./Button";
import { FaShoppingCart } from "react-icons/fa";

// Contextos para carrito y filtro por categoría
import { useCarrito } from "../context/CarritoContext";
import { useCategoryFilter } from "../context/CategoryFilterContext";

// Librería para alertas visuales
import Swal from "sweetalert2";

// Hook personalizado para obtener productos desde la API
import DataProductos from "../hooks/DataProductos";

// Componente principal que renderiza las tarjetas de productos
function Cards() {
  const navigate = useNavigate(); // Navegación entre rutas
  const [searchTerm, setSearchTerm] = useState(""); // Estado para búsqueda
  const { data, loading, error } = DataProductos("https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos"); // Carga de productos
  const [filteredDatos, setFilteredDatos] = useState([]); // Productos filtrados para mostrar

  const { agregarAlCarrito, carrito } = useCarrito(); // Función y datos del carrito
  const { categoryFilter } = useCategoryFilter(); // Filtro de categoría actual

  // Efecto que filtra productos según stock, categoría y búsqueda
  useEffect(() => {
    let resultadosFiltrados = data?.filter((producto) => producto.stock > 0) || [];

    // Filtro por categoría si está activa
    if (categoryFilter) {
      resultadosFiltrados = resultadosFiltrados.filter(
        (producto) => producto.category === categoryFilter
      );
    }

    // Filtro por texto ingresado en búsqueda
    if (searchTerm) {
      const textoBusqueda = searchTerm.toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter(
        (producto) =>
          producto.title?.toLowerCase().includes(textoBusqueda) ||
          producto.description?.toLowerCase().includes(textoBusqueda) ||
          producto.category?.toLowerCase().includes(textoBusqueda)
      );
    }

    // Actualiza los productos visibles
    setFilteredDatos(resultadosFiltrados);
  }, [searchTerm, data, categoryFilter]);

  // Agrega al carrito solo si el stock disponible lo permite
  const handleComprar = (producto) => {
    const enCarrito = carrito.find((item) => item.id === producto.id);

    if (enCarrito && enCarrito.cantidad >= producto.stock) {
      Swal.fire({
        title: "Sin stock suficiente",
        text: `Solo quedan ${producto.stock} unidades disponibles.`,
        icon: "warning",
      });
      return;
    }

    agregarAlCarrito(producto);
    Swal.fire({
      title: "¡Agregado!",
      text: `${producto.title} se ha agregado al carrito.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Actualiza el estado de búsqueda en tiempo real
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  // Muestra spinner si los productos están cargando
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Cargando productos...</p>
      </Container>
    );
  }

  // Muestra mensaje de error si la carga falló
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar productos: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Título dinámico según filtro o búsqueda */}
      <div className="text-center mb-4">
        {!searchTerm && !categoryFilter && <h1>Nuestros Productos</h1>}
        {searchTerm && <h2>Resultados para: "{searchTerm}"</h2>}
        {categoryFilter && !searchTerm && <h2>Productos Seleccionados</h2>}
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Buscar productos..."
            className="me-2"
            aria-label="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: "50%", border: "1px solid #ccc", padding: "5px", borderRadius: "5px" }}
          />
        </Form>
      </div>

      {/* Renderizado de productos filtrados */}
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
        {filteredDatos.length > 0 ? (
          filteredDatos.map((producto) => (
            <Col key={producto.id} className="d-flex justify-content-center">
              <Card className="shadow-sm w-100 d-flex flex-column h-100">
                {/* Título del producto */}
                <Card.Title className="p-2" style={{ fontSize: "1rem", minHeight: "3em" }}>
                  {producto.title}
                </Card.Title>
                <Card.Title className="p-2" style={{ fontSize: "1rem", minHeight: "3em" }}>
                  Stock: {producto.stock}
                </Card.Title>

                {/* Imagen del producto clickeable */}
                <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={producto.image}
                    alt={producto.title}
                    title="Ver Detalle"
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", cursor: "pointer" }}
                    onClick={() => navigate(`/producto/${producto.id}`)}
                  />
                </div>

                {/* Cuerpo con precio y botón de compra */}
                <Card.Body className="d-flex flex-column p-2">
                  <Card.Text className="mt-auto pt-2">
                    <strong>Precio:</strong> ${producto.price}
                  </Card.Text>
                  <Button
                    className="mt-2 align-self-center w-75"
                    texto="Comprar"
                    onClick={() => handleComprar(producto)}
                    Icono={FaShoppingCart}
                    tooltip="Agregar al Carrito"
                    variant="primary"
                  />
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          // Mensaje si no hay productos para mostrar
          <Col xs={12} className="text-center mt-4">
            <Alert variant="info">
              {searchTerm || categoryFilter
                ? "No se encontraron productos que coincidan con los criterios de búsqueda."
                : "No hay productos disponibles en este momento."}
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Cards;
