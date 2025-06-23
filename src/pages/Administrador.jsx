import { useState } from "react";
import { Container, Table, Spinner, Alert, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import DataProductos from "../hooks/DataProductos";
import Button from "../componentes/Button";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import FormularioProducto from "../componentes/FormularioProducto";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Administrador() {
  const { usuario } = useAuth();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [actualizar, setActualizar] = useState(false);

  const { data, loading, error } = DataProductos(
    "https://6846dc797dbda7ee7ab0a12b.mockapi.io/tuhogar/productos",
    actualizar
  );

  const handleAgregarProducto = () => setMostrarFormulario(true);
  const handleCerrarFormulario = () => setMostrarFormulario(false);

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

  const handleEditarProducto = (id) => {
    console.log(`Editar producto con ID: ${id}`);
  };

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
        if (!response.ok) throw new Error("Error al eliminar el producto");
        setActualizar(!actualizar);

        MySwal.fire("Eliminado", "El producto fue eliminado correctamente.", "success");
      } catch (error) {
        MySwal.fire("Error", "No se pudo eliminar el producto.", "error");
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Cargando datos de productos para el administrador...</p>
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
    <Container className="mt-5">
      {/* Botón para agregar nuevo producto */}
      <Button
        Icono={FaPlus}
        texto="Nuevo"
        variant="primary"
        onClick={handleAgregarProducto}
        className="rounded-20"
        style={{ width: "120px", height: "50px", marginBottom: "1rem" }}
        tooltip="Agregar"
      />

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
                  <th>Stock</th>
                  <th>Imagen</th>
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
                      <td style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {producto.description}
                      </td>
                      <td>{producto.category}</td>
                      <td>{producto.stock}</td>
                      <td>
                        <Image
                          src={producto.image}
                          alt={producto.title}
                          style={{ width: "50px", height: "50px", objectFit: "contain" }}
                        />
                      </td>
                      <td>
                        <Button
                          Icono={FaEdit}
                          variant="success"
                          onClick={() => handleEditarProducto(producto.id)}
                          className="rounded-20"
                          style={{ width: "40px", height: "40px", marginRight: "0.2rem" }}
                          tooltip="Editar"
                        />
                        <Button
                          Icono={FaTrash}
                          variant="danger"
                          onClick={() => handleEliminarProducto(producto.id)}
                          className="rounded-15"
                          style={{ width: "40px", height: "40px" }}
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

      {/* Modal para formulario de producto */}
      <FormularioProducto
        show={mostrarFormulario}
        handleClose={handleCerrarFormulario}
        onProductoAgregado={handleProductoAgregado}
      />
    </Container>
  );
}

export default Administrador;
