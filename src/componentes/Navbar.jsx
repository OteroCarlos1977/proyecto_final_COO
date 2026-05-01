import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { MdLogin, MdLogout } from "react-icons/md";
import { useCategoryFilter } from "../context/CategoryFilterContext";

function MiNavbar() {
  const navigate = useNavigate();
  const { cantidadTotal } = useCarrito();
  const { usuario, logout } = useAuth();
  const { setCategoryFilter } = useCategoryFilter();
  const location = useLocation();

  const esAdministrador = usuario && usuario.rol === "admin";
  const mostrarDropdown = location.pathname === "/";
  const activeLinkStyle = {
    color: "#0d6efd", 
    fontWeight: "bold",
    borderBottom: "2px solid #0d6efd",
    paddingBottom: "3px",
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="logo"
            src="/imagenes/tuhogar.png"
            width="50"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {!esAdministrador && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
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

        <div className="d-flex ms-auto align-items-center">
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

          <Button
            variant="outline-primary"
            onClick={() => navigate("/carrito")}
            className="ms-2"
            style={{ position: "relative" }}
            Icono={FaShoppingCart}
            texto={
              cantidadTotal() > 0 ? (
                <>
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
