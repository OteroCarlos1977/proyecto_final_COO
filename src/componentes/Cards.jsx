import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Container, Row, Col, Spinner, Alert, Form, FormControl } from "react-bootstrap";

import Button from "./Button";
import { FaShoppingCart } from "react-icons/fa";

import { useCarrito } from "../context/CarritoContext";
import { useCategoryFilter } from "../context/CategoryFilterContext";

import Swal from "sweetalert2";

import DataProductos from "../hooks/DataProductos";

function Cards() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = DataProductos("https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos");
  const [filteredDatos, setFilteredDatos] = useState([]);

  const { agregarAlCarrito, carrito } = useCarrito();
  const { categoryFilter } = useCategoryFilter();

  useEffect(() => {
    let resultadosFiltrados = data?.filter((producto) => producto.stock > 0) || [];

    if (categoryFilter) {
      resultadosFiltrados = resultadosFiltrados.filter(
        (producto) => producto.category === categoryFilter
      );
    }

    if (searchTerm) {
      const textoBusqueda = searchTerm.toLowerCase();
      resultadosFiltrados = resultadosFiltrados.filter(
        (producto) =>
          producto.title?.toLowerCase().includes(textoBusqueda) ||
          producto.description?.toLowerCase().includes(textoBusqueda) ||
          producto.category?.toLowerCase().includes(textoBusqueda)
      );
    }

    setFilteredDatos(resultadosFiltrados);
  }, [searchTerm, data, categoryFilter]);

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

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Cargando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar productos: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        {!searchTerm && !categoryFilter && <h1>Nuestros Productos</h1>}
        {searchTerm && <h2>Resultados para: "{searchTerm}"</h2>}
        {categoryFilter && !searchTerm && <h2>Productos Seleccionados</h2>}
      </div>

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

      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
        {filteredDatos.length > 0 ? (
          filteredDatos.map((producto) => (
            <Col key={producto.id} className="d-flex justify-content-center">
              <Card className="shadow-sm w-100 d-flex flex-column h-100">
                <Card.Title className="p-2" style={{ fontSize: "1rem", minHeight: "3em" }}>
                  {producto.title}
                </Card.Title>
                <Card.Title className="p-2" style={{ fontSize: "1rem", minHeight: "3em" }}>
                  Stock: {producto.stock}
                </Card.Title>

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
