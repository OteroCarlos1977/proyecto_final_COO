import React from "react";
import { Container } from "react-bootstrap";

const Nosotros = () => {
  return (
    // Contenedor principal con margen superior para separar del encabezado u otros elementos
    <Container className="mt-4">
      {/* Contenedor interno para centrar contenido y dar padding */}
      <div className="container mx-auto px-4 py-10">
        {/* Título principal centrado y con estilo */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Somos TU HOGAR
        </h1>

        {/* Párrafo descriptivo centrado con texto destacado y máximo ancho para mejor lectura */}
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Bienvenido a <strong>Tu Hogar</strong>, un e-commerce que está dando
          sus primeros pasos con pasión y entusiasmo. Nos dedicamos a ofrecer lo
          mejor en <strong>ropa</strong>, <strong>tecnología</strong> y{" "}
          <strong>bijouterie</strong>, siempre pensando en la calidad, el estilo y el
          bienestar de nuestros clientes.
        </p>

        {/* Grid responsive con 3 columnas en dispositivos medianos en adelante, y espacio entre columnas */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Sección de ropa con imagen, título y descripción */}
          <div className="text-center">
            <img
              src="../../public/ropa.jpg"
              alt="Ropa"
              className="rounded-2xl shadow-lg mb-4 w-full h-60 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Moda para todos
            </h2>
            <p className="text-gray-600 text-sm">
              Prendas cómodas, modernas y accesibles para que cada día sea una
              pasarela.
            </p>
          </div>

          {/* Sección de tecnología con imagen, título y descripción */}
          <div className="text-center">
            <img
              src="../../public/electronica.jpg"
              alt="Tecnología"
              className="rounded-2xl shadow-lg mb-4 w-full h-60 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Tecnología actual
            </h2>
            <p className="text-gray-600 text-sm">
              Gadgets, smartphones y accesorios para mantenerte siempre
              conectado.
            </p>
          </div>

          {/* Sección de bijouterie con imagen, título y descripción */}
          <div className="text-center">
            <img
              src="../../public/joyas.jpg"
              alt="Bijouterie"
              className="rounded-2xl shadow-lg mb-4 w-full h-60 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Bijouterie elegante
            </h2>
            <p className="text-gray-600 text-sm">
              Accesorios únicos para complementar tu estilo con un toque especial.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Nosotros;
