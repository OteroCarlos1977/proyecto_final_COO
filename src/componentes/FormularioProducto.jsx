import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const FormularioProducto = ({ show, handleClose, onProductoAgregado }) => {
  const [producto, setProducto] = useState({
    producto: "",
    precio: "",
    imagen: "",
    descripcion: "",
    categoria: "sillas",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
    setErrores({ ...errores, [name]: "" }); // Limpiar errores al escribir
  };

  const validarCampos = () => {
    let erroresTemp = {};

    if (!producto.producto.trim()) {
      erroresTemp.producto = "El nombre del producto es obligatorio.";
    }

    if (!producto.precio || isNaN(producto.precio) || parseFloat(producto.precio) <= 0) {
      erroresTemp.precio = "El precio debe ser un número mayor a 0.";
    }

    if (!producto.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria.";
    }

    if (!producto.imagen.trim()) {
      erroresTemp.imagen = "Debe indicar el nombre del archivo de imagen (ej: silla8.png).";
    } else if (!producto.imagen.endsWith(".png")) {
      erroresTemp.imagen = "La imagen debe tener extensión .png";
    }

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
      precio: parseFloat(producto.precio),
      imagen: `/imagenes/${producto.categoria}/${producto.imagen}`,
    };

    try {
      const response = await fetch("https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar el producto");
      }

      onProductoAgregado();
      handleClose();
      setProducto({
        producto: "",
        precio: "",
        imagen: "",
        descripcion: "",
        categoria: "sillas",
      });
      setErrores({});
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Control
              type="text"
              name="producto"
              value={producto.producto}
              onChange={handleChange}
              isInvalid={!!errores.producto}
            />
            <Form.Control.Feedback type="invalid">
              {errores.producto}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              isInvalid={!!errores.precio}
              min={0}
            />
            <Form.Control.Feedback type="invalid">
              {errores.precio}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              rows={2}
              value={producto.descripcion}
              onChange={handleChange}
              isInvalid={!!errores.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errores.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
            >
              <option value="sillas">Sillas</option>
              <option value="sillones">Sillones</option>
              <option value="textiles">Textiles</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombre de Imagen (ej. silla8.png)</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={producto.imagen}
              onChange={handleChange}
              isInvalid={!!errores.imagen}
            />
            <Form.Control.Feedback type="invalid">
              {errores.imagen}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              La imagen se buscará en /imagenes/{producto.categoria}/{producto.imagen}
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Agregar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FormularioProducto;
