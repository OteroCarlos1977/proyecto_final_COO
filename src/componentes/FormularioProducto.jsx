import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Generador de imagen aleatoria según categoría
const obtenerImagenAleatoria = (categoria) => {
  const query = {
    "men's clothing": "man",
    "women's clothing": "woman",
    "jewelery": "jewel",
    "electronics": "electronics",
  };

  const keyword = query[categoria] || "product";
  return `https://loremflickr.com/320/240/${keyword}?random=${Date.now()}`;
};

const FormularioProducto = ({ show, handleClose, onProductoAgregado, productoEditar }) => {
  // Estado inicial del formulario (nuevo o para edición)
  const [producto, setProducto] = useState({
    title: "",
    price: "",
    image: obtenerImagenAleatoria("men's clothing"),
    description: "",
    category: "men's clothing",
    stock: "",
  });

  const [errores, setErrores] = useState({});

  // Al detectar un producto para editar, cargar sus datos
  useEffect(() => {
    if (productoEditar) {
      setProducto(productoEditar);
    } else {
      setProducto({
        title: "",
        price: "",
        image: obtenerImagenAleatoria("men's clothing"),
        description: "",
        category: "men's clothing",
        stock: "",
      });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si cambia la categoría, solo actualiza imagen si no está editando
    if (name === "category") {
      setProducto({
        ...producto,
        category: value,
        image: productoEditar ? producto.image : obtenerImagenAleatoria(value),
      });
    } else {
      setProducto({ ...producto, [name]: value });
    }
    setErrores({ ...errores, [name]: "" });
  };

  const validarCampos = () => {
    let erroresTemp = {};
    if (!producto.title.trim()) erroresTemp.title = "El nombre del producto es obligatorio.";
    if (!producto.price || isNaN(producto.price) || parseFloat(producto.price) <= 0)
      erroresTemp.price = "El precio debe ser un número mayor a 0.";
    if (!producto.description.trim()) erroresTemp.description = "La descripción es obligatoria.";
    if (!producto.image.trim()) erroresTemp.image = "Debe tener una imagen asociada.";
    if (!producto.stock || isNaN(producto.stock) || parseInt(producto.stock) < 0)
      erroresTemp.stock = "El stock debe ser un número mayor o igual a 0.";
    return erroresTemp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidados = validarCampos();
    if (Object.keys(erroresValidados).length > 0) {
      setErrores(erroresValidados);
      return;
    }

    const nuevoProducto = {
      ...producto,
      price: parseFloat(producto.price),
      stock: parseInt(producto.stock),
    };

    try {
      const url = productoEditar
        ? `https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos/${productoEditar.id}`
        : "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos";

      const metodo = productoEditar ? "PUT" : "POST";

      const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      onProductoAgregado();
      handleClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Campos del formulario */}
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={producto.title}
              onChange={handleChange}
              isInvalid={!!errores.title}
            />
            <Form.Control.Feedback type="invalid">{errores.title}</Form.Control.Feedback>
          </Form.Group>

          {/* Precio */}
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={producto.price}
              onChange={handleChange}
              isInvalid={!!errores.price}
              min={0}
            />
            <Form.Control.Feedback type="invalid">{errores.price}</Form.Control.Feedback>
          </Form.Group>

          {/* Descripción */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={2}
              value={producto.description}
              onChange={handleChange}
              isInvalid={!!errores.description}
            />
            <Form.Control.Feedback type="invalid">{errores.description}</Form.Control.Feedback>
          </Form.Group>

          {/* Categoría */}
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select name="category" value={producto.category} onChange={handleChange}>
              <option value="jewelery">Joyería</option>
              <option value="men's clothing">Ropa Hombre</option>
              <option value="women's clothing">Ropa Mujer</option>
              <option value="electronics">Electrónica</option>
            </Form.Select>
          </Form.Group>

          {/* Stock */}
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              isInvalid={!!errores.stock}
              min={0}
            />
            <Form.Control.Feedback type="invalid">{errores.stock}</Form.Control.Feedback>
          </Form.Group>

          {/* Imagen solo en creación */}
          {!productoEditar && producto.image && (
            <div className="mb-3 text-center">
              <Form.Label>Imagen generada automáticamente</Form.Label>
              <div>
                <img
                  src={producto.image}
                  alt="Vista previa"
                  style={{ maxHeight: "150px", objectFit: "cover" }}
                  className="img-fluid border rounded"
                />
              </div>
              <Form.Text className="text-muted">
                Se genera automáticamente según la categoría seleccionada.
              </Form.Text>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="primary">
            {productoEditar ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormularioProducto;