//Importación de componentes de Reac y React Dom
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Importación de componentes de Bootstrap y utilidades
import { Card, Container, Row, Col, Spinner, Alert, Form, FormControl} from "react-bootstrap";
import Button from "./Button"; // Componente de botón personalizado
import { FaShoppingCart } from "react-icons/fa"; // Ícono de carrito
import { useCarrito } from "../context/CarritoContext"; // Contexto para manejar el carrito de compras
import { useCategoryFilter } from "../context/CategoryFilterContext"; // Contexto para el filtro por categoría
import Swal from "sweetalert2"; // Alertas
import DataProductos from "../hooks/DataProductos"; // Hook personalizado para obtener productos

function Cards() {
  //Inicializo el useNavigate, para navegar entre paginas
  const navigate = useNavigate();

  // Estado local para almacenar el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Hook personalizado que obtiene los productos desde la API 
  const { data, loading, error } = DataProductos(
    "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos"
  );

  // Estado local que almacena los productos ya filtrados
  const [filteredDatos, setFilteredDatos] = useState([]);

  // Funciones del contexto: para agregar productos al carrito
  const { agregarAlCarrito } = useCarrito();

  // Filtro de categoría actual seleccionado desde el contexto
  const { categoryFilter } = useCategoryFilter();

  // Efecto para filtrar productos cada vez que cambian los datos, el término de búsqueda o la categoría
  useEffect(() => {
    let resultadosFiltrados = data || [];

    // Filtrar por categoría si se seleccionó alguna
    if (categoryFilter) {
      resultadosFiltrados = resultadosFiltrados.filter(
        (producto) => producto.categoria === categoryFilter
      );
    }

    // Filtrar por término de búsqueda (título o descripción)
    if (searchTerm) {
      const textoBusqueda = searchTerm.toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter(
        (producto) =>
          (producto.producto &&
            producto.producto.toLowerCase().includes(textoBusqueda)) ||
          (producto.descripcion &&
            producto.descripcion.toLowerCase().includes(textoBusqueda)) ||
          (producto.categoria &&
            producto.categoria.toLowerCase().includes(textoBusqueda))
      );
    }

    // Actualiza el estado con los resultados filtrados
    setFilteredDatos(resultadosFiltrados);
  }, [searchTerm, data, categoryFilter]);

  // Maneja el evento de agregar un producto al carrito y muestra alerta con SweetAlert
  const handleComprar = (producto) => {
    agregarAlCarrito(producto);
    Swal.fire({
      title: "¡Agregado!",
      text: `${producto.producto} se ha agregado al carrito.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Muestra spinner mientras los datos están cargando
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando productos...</p>
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

  return (
    <Container className="mt-4">
      {/* Título dinámico según el filtro o término de búsqueda */}
      <div className="text-center mb-4">
        {!searchTerm && !categoryFilter && <h1>Nuestros Productos</h1>}
        {searchTerm && <h2>Resultados para: "{searchTerm}"</h2>}
        {categoryFilter && !searchTerm && <h2>Productos Seleccionados</h2>}
      </div>

      {/* Campo de búsqueda */}
      <div className="mb-3">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Buscar productos..."
            className="me-2"
            aria-label="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "50%",
              border: "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
        </Form>
      </div>

      {/* Renderizado de productos */}
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
        {filteredDatos.length > 0 ? (
          filteredDatos.map((producto) => (
            <Col key={producto.id} className="d-flex justify-content-center">
              <Card className="shadow-sm w-100 d-flex flex-column h-100">
                {/* Título del producto */}
                <Card.Title
                  className="p-2"
                  style={{ fontSize: "1rem", minHeight: "3em" }}
                >
                  {producto.producto}
                </Card.Title>

                {/* Imagen del producto */}
                <div
                  className="d-flex justify-content-center align-items-center p-3"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.producto}
                    title= "Ver Detalle" 
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      cursor: "pointer", 
                    }}
                    onClick={() => navigate(`/producto/${producto.id}`)}
                  />
                  
                </div>

                {/* Cuerpo de la tarjeta con descripción, precio y botón */}
                <Card.Body className="d-flex flex-column p-2">
                  {/*<Card.Text
                    style={{
                      fontSize: "0.8rem",
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: "3",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {producto.description}
                  </Card.Text>*/}
                  <Card.Text className="mt-auto pt-2">
                    <strong>Precio:</strong> $
                    {producto.precio}{" "}
                    {/* Se multiplica para simular moneda local */}
                  </Card.Text>

                  {/* Botón de comprar */}
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
          // Mensaje si no hay productos que coincidan con los filtros
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
