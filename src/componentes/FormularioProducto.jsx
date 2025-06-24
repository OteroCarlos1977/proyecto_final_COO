// Importa hooks de React y componentes necesarios
import { useState, useEffect } from "react";
import { Modal, Form, Button as BsButton } from "react-bootstrap";
import Swal from "sweetalert2";

// Componente para crear o editar un producto
function FormularioProducto({ show, handleClose, onProductoAgregado, productoEditar }) {
  // Estados locales para cada campo del formulario
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [id, setId] = useState(""); // solo visible en edición

  // Efecto que carga datos del producto cuando se va a editar
  useEffect(() => {
    if (productoEditar) {
      setTitle(productoEditar.title || "");
      setPrice(productoEditar.price || "");
      setDescription(productoEditar.description || "");
      setCategory(productoEditar.category || "");
      setStock(productoEditar.stock || "");
      setId(productoEditar.id || "");
    } else {
      // Si no hay producto para editar, limpia el formulario (alta)
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setStock("");
      setId("");
    }
  }, [productoEditar]);

  // 🔄 Devuelve una imagen aleatoria desde loremflickr según categoría
  const obtenerImagenPorCategoria = (cat) => {
    const urls = {
      // Estas claves llevan comillas por tener espacios y/o apóstrofes
      "men's clothing": `https://loremflickr.com/320/240/clothing,man?random=${Math.floor(Math.random() * 1000)}`,
      "women's clothing": `https://loremflickr.com/320/240/clothing,woman?random=${Math.floor(Math.random() * 1000)}`,
      electronics: `https://loremflickr.com/320/240/electronics,gadget?random=${Math.floor(Math.random() * 1000)}`,
      jewelery: `https://loremflickr.com/320/240/jewelery?random=${Math.floor(Math.random() * 1000)}`,
    };
    // Si no encuentra la categoría, usa una imagen genérica
    return urls[cat] || `https://loremflickr.com/320/240/product?random=${Math.floor(Math.random() * 1000)}`;
  };

  // Maneja el envío del formulario (POST o PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos requeridos
    if (!title || !price || !description || !category) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Completá todos los campos obligatorios.",
      });
      return;
    }

    // Validación de stock como número válido
    const stockNumerico = parseInt(stock);
    if (isNaN(stockNumerico) || stockNumerico < 0) {
      Swal.fire({
        icon: "warning",
        title: "Stock inválido",
        text: "El stock debe ser un número igual o mayor a 0.",
      });
      return;
    }

    // Construcción del objeto a guardar
    const producto = {
      title,
      price,
      description,
      category,
      stock: stockNumerico,
      // Si es edición, se conserva la imagen; si es alta, se genera aleatoriamente
      image: productoEditar ? productoEditar.image : obtenerImagenPorCategoria(category),
    };

    try {
      // Define la URL y el método según sea edición (PUT) o alta (POST)
      const url = productoEditar
        ? `https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos/${productoEditar.id}`
        : "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos";

      const metodo = productoEditar ? "PUT" : "POST";

      // Llamado a la API
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });

      if (!res.ok) throw new Error("Error al guardar producto");

      // Éxito
      Swal.fire({
        icon: "success",
        title: "Guardado",
        text: "Producto guardado correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });

      onProductoAgregado(); // Refresca productos
      handleClose(); // Cierra el modal
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar el producto.", "error");
    }
  };

  // Renderizado del formulario
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Solo visible en modo edición */}
          {productoEditar && (
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" value={id} disabled />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Seleccionar</option>
              <option value="men's clothing">Ropa de Hombre</option>
              <option value="women's clothing">Ropa de Mujer</option>
              <option value="electronics">Electrónica</option>
              <option value="jewelery">Joyería</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          {/* Imagen solo visible en modo edición */}
          {productoEditar && (
            <Form.Group className="mb-3">
              <Form.Label>Imagen asignada</Form.Label>
              <Form.Control type="text" value={productoEditar.image} disabled />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <BsButton variant="secondary" onClick={handleClose}>
            Cancelar
          </BsButton>
          <BsButton variant="primary" type="submit">
            Guardar
          </BsButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default FormularioProducto;
