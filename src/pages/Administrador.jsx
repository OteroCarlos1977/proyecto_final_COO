import React from "react";
import { Container, Table, Spinner, Alert, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Hook personalizado para obtener el usuario autenticado
import DataProductos from "../hooks/DataProductos"; // Hook personalizado para obtener los datos de productos
import Button from "../componentes/Button"; // Componente de botón reutilizable
import { FaTrash, FaEdit } from "react-icons/fa"; // Iconos de edición y eliminación

function Administrador() {
  // Obtener el usuario autenticado desde el contexto
  const { usuario } = useAuth();

  // Obtener datos de productos desde la API usando el hook personalizado
  const { data, loading, error } = DataProductos(
    "https://fakestoreapi.com/products"
  );

  // Función manejadora para la acción de editar un producto
  const handleEditarProducto = (id) => {
    console.log(`Función de editar producto con ID: ${id}`);
    // Aquí se integraría la lógica para editar el producto
  };

  // Función manejadora para la acción de eliminar un producto
  const handleEliminarProducto = (id) => {
    console.log(`Función de eliminar producto con ID: ${id}`);
    // Aquí se integraría la lógica para eliminar el producto
  };

  // Mostrar spinner de carga mientras se obtienen los datos
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">
            Cargando datos de productos...
          </span>
        </Spinner>
        <p>Cargando datos de productos para el administrador...</p>
      </Container>
    );
  }

  // Mostrar alerta de error si falla la carga de datos
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error al cargar datos de productos: {error}
        </Alert>
      </Container>
    );
  }

  // Render principal del panel de administrador
  return (
    <Container className="mt-5">
      {usuario ? ( // Verifica si hay un usuario autenticado
        <>
          <div className="text-center mb-4">
            <h2>Panel de Administración de Productos</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Valoracion</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.title}</td>
                      <td>${producto.price}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {producto.description}
                      </td>
                      <td>{producto.category}</td>
                      <td>
                        <Image
                          src={producto.image}
                          alt={producto.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                        />
                      </td>
                      <td>{producto.rating.rate}</td>
                      <td>{producto.rating.count}</td>
                      <td>
                        {/* Botón para editar el producto */}
                        <Button
                          Icono={FaEdit}
                          variant="success"
                          onClick={() => handleEditarProducto(producto.id)}
                          className="rounded-20"
                          style={{
                            padding: "0.0rem",
                            marginRight: "0.2rem",
                            width: "30px",
                            height: "30px",
                          }}
                          tooltip="Editar"
                        />
                        {/* Botón para eliminar el producto */}
                        <Button
                          Icono={FaTrash}
                          variant="danger"
                          onClick={() => handleEliminarProducto(producto.id)}
                          className="rounded-15"
                          style={{
                            padding: "0.0rem",
                            width: "30px",
                            height: "30px",
                          }}
                          tooltip="Eliminar"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        // Si no hay usuario autenticado, mostrar mensaje
        <div className="text-center">
          <p>Cargando información del administrador...</p>
          {/* Alternativamente, aquí podrías mostrar "Acceso no autorizado" */}
        </div>
      )}
    </Container>
  );
}

export default Administrador;
