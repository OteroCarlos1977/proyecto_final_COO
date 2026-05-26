import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row className="align-items-center text-center text-md-start">
                    <Col md={6}>
                        <p className="mb-2 mb-md-0">
                            <span className="developer-badge">CO</span>{" "}
                            Desarrollado por <strong>Carlos Otero</strong>, &copy; {new Date().getFullYear()}.
                        </p>
                    </Col>

                    <Col md={6} className="text-md-end">
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
