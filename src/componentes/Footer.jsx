// Importación de componentes de diseño de react-bootstrap
import { Container, Row, Col } from "react-bootstrap"; // Componentes para estructurar el contenido

// Importación de íconos de redes sociales
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

// Componente funcional Footer que representa el pie de página de la aplicación
function Footer() {
    return (
        // Elemento <footer> con clases de Bootstrap para estilo: 
        // fondo oscuro, texto blanco, padding y margen superior
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                {/* Fila que alinea verticalmente los elementos en pantallas medianas hacia adelante y centra en pantallas pequeñas */}
                <Row className="align-items-center text-center text-md-start">
                    {/* Columna izquierda: texto de autor y derechos reservados */}
                    <Col md={6}>
                        <p className="mb-2 mb-md-0">
                            Proyecto Realizado por <strong>@Carlos Otero</strong>, &copy; {new Date().getFullYear()} Todos los derechos reservados.
                        </p>
                    </Col>

                    {/* Columna derecha: íconos de redes sociales alineados a la derecha en pantallas medianas o mayores */}
                    <Col md={6} className="text-md-end">
                        {/* Enlaces a redes sociales con íconos, cada uno abre en una nueva pestaña */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                            <FaXTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaInstagram size={24} />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}


export default Footer;
