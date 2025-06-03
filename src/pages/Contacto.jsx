import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

// Componente de formulario de contacto con validación y feedback visual
const Contacto = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  // Estado para manejar la validación del formulario
  const [validated, setValidated] = useState(false);

  // Maneja los cambios en los inputs del formulario y actualiza el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    if (form.checkValidity() === false) {
      // Si el formulario no es válido, se detiene la propagación
      e.stopPropagation();
    } else {
      // Si es válido, se podrían enviar los datos a una API o email service
      console.log('Mensaje enviado:', formData);

      // Muestra un mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: 'Mensaje enviado',
        text: 'Tu mensaje ha sido enviado. Pronto nos pondremos en contacto contigo.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      // Limpia los campos del formulario después del envío
      setFormData({ nombre: '', email: '', mensaje: '' });
    }

    // Marca el formulario como validado para mostrar mensajes de feedback
    setValidated(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Contacto</h2>

      <Row>
        {/* Columna izquierda: datos de contacto y mapa de ubicación */}
        <Col md={6}>
          <h5>Datos de la empresa</h5>
          <p><strong>Teléfono:</strong> +54 11 1234 5678</p>
          <p><strong>Email:</strong> contacto@miempresa.com</p>
          <p><strong>Dirección:</strong> Av. Siempre Viva 742, Buenos Aires</p>

          {/* Mapa embebido de Google Maps con dirección de la empresa */}
          <div className="mt-3">
            <iframe
              title="Mapa de la empresa"
              src="https://www.google.com/maps/embed?pb=..."
              width="75%"
              height="250"
              style={{ border: '3px solid #ccc' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>

        {/* Columna derecha: formulario de contacto */}
        <Col md={6} style={{ background: 'rgba(0,0,0,0.3)' }}>
          <h5 style={{ padding: '5px' }}>Envianos tu mensaje</h5>

          {/* Formulario con validación controlada */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Campo: Nombre */}
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                style={{ padding: '5px', border: '2px solid #ccc' }}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa tu nombre.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Email */}
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tuemail@ejemplo.com"
                style={{ border: '2px solid #ccc' }}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingresa un email válido.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Mensaje */}
            <Form.Group controlId="mensaje" className="mt-3">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Escribe tu mensaje"
                style={{ border: '2px solid #ccc' }}
              />
              <Form.Control.Feedback type="invalid">
                El mensaje no puede estar vacío.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Botón de envío */}
            <Button variant="primary" type="submit" className="mt-4" style={{ marginBottom: '20px' }}>
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
