import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"; // Componentes de Bootstrap para estructura y diseño del navbar
import { Link, useNavigate, useLocation } from "react-router-dom"; // Herramientas de enrutamiento
import Button from "./Button"; // Componente personalizado de botón
import { FaShoppingCart } from "react-icons/fa"; // Icono de carrito
import { useCarrito } from "../context/CarritoContext"; // Contexto para manejar el carrito
import { useAuth } from "../context/AuthContext"; // Contexto para manejar autenticación de usuario
import { MdLogin, MdLogout } from "react-icons/md"; // Iconos de usuario
import { useCategoryFilter } from "../context/CategoryFilterContext"; // Contexto para aplicar filtro por categoría

function MiNavbar() {
  const navigate = useNavigate(); // Hook para redireccionamiento
  const { cantidadTotal } = useCarrito(); // Obtiene cantidad total de productos en el carrito
  const { usuario, logout } = useAuth(); // Obtiene información del usuario autenticado y función para cerrar sesión
  const { setCategoryFilter } = useCategoryFilter(); // Permite establecer filtro de categoría
  const location = useLocation(); // Obtiene la ruta actual

  

  // Determina si el usuario actual es un administrador
  // a traves del rol 
  const esAdministrador = usuario && usuario.rol === "admin";

  // Solo se muestra el dropdown de productos si la ruta actual es "/"
  const mostrarDropdown = location.pathname === "/";

  // Estilos para el Link Activo
  const activeLinkStyle = {
    color: "#0d6efd", 
    fontWeight: "bold",
    borderBottom: "2px solid #0d6efd",
    paddingBottom: "3px",
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        {/* Logo que redirige a inicio */}
        <Navbar.Brand as={Link} to="/">
          <img
            alt="logo"
            src="/imagenes/tuhogar.png"
            width="50"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Botón para colapsar el menú en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido del menú colapsable */}
        {!esAdministrador && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Links de navegación principales */}
              <Nav.Link as={Link} to="/" active={location.pathname === "/"} style={location.pathname === "/" ? activeLinkStyle : {}}>
                Inicio
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/nosotros"
                active={location.pathname === "/nosotros"}
                style={location.pathname === "/nosotros" ? activeLinkStyle : {}}
              >
                Nosotros
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contacto"
                active={location.pathname === "/contacto"}
                style={location.pathname === "/contacto" ? activeLinkStyle : {}}
              >
                Contacto
              </Nav.Link>
              {usuario && (
                <Nav.Link
                  as={Link}
                  to="/perfil"
                  active={location.pathname === "/perfil"}
                  style={location.pathname === "/perfil" ? activeLinkStyle : {}}
                >
                  Perfil
                </Nav.Link>
              )}

              {/* Dropdown de categorías (solo en la página de inicio y si NO es administrador) */}
              {mostrarDropdown && (
                <NavDropdown title="Productos" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setCategoryFilter(null)}>
                    Todos
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => setCategoryFilter("electronics")}
                  >
                    Tecnología
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => setCategoryFilter("men's clothing")}
                  >
                    Ropa Hombre
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => setCategoryFilter("women's clothing")}
                  >
                    Ropa Mujer
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => setCategoryFilter("jewelery")}
                  >
                    Joyería
                  </NavDropdown.Item>
                  
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        )}

        {/* Zona derecha del navbar: login/logout y carrito */}
        <div className="d-flex ms-auto align-items-center">
          {/* Botón de sesión según estado del usuario */}
          {usuario ? (
            <Button
              variant="outline-primary"
              onClick={logout}
              className="ms-2"
              texto={`Cerrar Sesión (${usuario.nombre})`}
              Icono={MdLogout}
            />
          ) : (
            <Button
              variant="outline-primary"
              onClick={() => navigate("/login")}
              className="ms-2"
              texto="Ingresar"
              Icono={MdLogin}
            />
          )}

          {/* Botón del carrito con cantidad de productos */}
          <Button
            variant="outline-primary"
            onClick={() => navigate("/carrito")}
            className="ms-2"
            style={{ position: "relative" }}
            Icono={FaShoppingCart}
            texto={
              cantidadTotal() > 0 ? (
                <>
                  {/* Indicador visual de cantidad en el carrito */}
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "0.8em",
                    }}
                  >
                    {cantidadTotal()}
                  </span>
                </>
              ) : (
                ""
              )
            }
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default MiNavbar;
