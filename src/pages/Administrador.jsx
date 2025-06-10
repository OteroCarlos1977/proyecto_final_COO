import { useState } from "react";
import { Container, Table, Spinner, Alert, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Hook de autenticación
import DataProductos from "../hooks/DataProductos"; // Hook para obtener productos
import Button from "../componentes/Button"; // Botón reutilizable
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"; // Iconos
import FormularioProducto from "../componentes/FormularioProducto";

// Importa SweetAlert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Administrador() {
  const { usuario } = useAuth(); // Usuario autenticado
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // Control modal
  const [actualizar, setActualizar] = useState(false); // Trigger para recargar productos

  const { data, loading, error } = DataProductos(
    "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos",
    actualizar
  );

  const handleAgregarProducto = () => {
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
  };

  // Al agregar un producto, recarga la tabla y muestra alerta
  const handleProductoAgregado = () => {
    setActualizar(!actualizar);
    MySwal.fire({
      icon: "success",
      title: "Producto agregado",
      text: "El nuevo producto fue guardado correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Función para editar (pendiente de implementar)
  const handleEditarProducto = (id) => {
    console.log(`Función de editar producto con ID: ${id}`);
  };

  // Elimina un producto con confirmación de SweetAlert2
  const handleEliminarProducto = async (id) => {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos/${id}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar el producto");
        }

        setActualizar(!actualizar); // Recarga productos

        MySwal.fire("Eliminado", "El producto fue eliminado correctamente.", "success");
      } catch (error) {
        MySwal.fire("Error", "No se pudo eliminar el producto. Intenta nuevamente.", "error");
        console.error(error);
      }
    }
  };

  // Cargando datos
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando datos...</span>
        </Spinner>
        <p>Cargando datos de productos para el administrador...</p>
      </Container>
    );
  }

  // Error al cargar datos
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error al cargar datos de productos: {error}</Alert>
      </Container>
    );
  }

  // Render principal
  return (
    <Container className="mt-5">
      <div>
        {/* Botón para abrir el formulario de nuevo producto */}
        <Button
          Icono={FaPlus}
          texto="Nuevo"
          variant="primary"
          onClick={handleAgregarProducto}
          className="rounded-20"
          style={{
            padding: "0.0rem",
            marginRight: "0.2rem",
            width: "100px",
            height: "30px",
          }}
          tooltip="Agregar"
        />
      </div>

      {usuario ? (
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.producto}</td>
                      <td>${producto.precio}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {producto.descripcion}
                      </td>
                      <td>{producto.categoria}</td>
                      <td>
                        <Image
                          src={producto.imagen}
                          alt={producto.producto}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                          }}
                        />
                      </td>
                      <td>
                        {/* Botón editar */}
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
                        {/* Botón eliminar */}
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
        <div className="text-center">
          <p>Cargando información del administrador...</p>
        </div>
      )}

      {/* Modal para agregar nuevo producto */}
      <FormularioProducto
        show={mostrarFormulario}
        handleClose={handleCerrarFormulario}
        onProductoAgregado={handleProductoAgregado}
      />
    </Container>
  );
}

export default Administrador;
