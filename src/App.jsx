import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";
import { CategoryFilterProvider } from './context/CategoryFilterContext';

import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Administrador from "./pages/Administrador";
import Carrito from "./componentes/Carrito";
import Footer from "./componentes/Footer";
import Navbar from "./componentes/Navbar";
import DetalleProducto from "./componentes/DetalleProducto";
import ProtectedRoute from "./context/ProtectedRoute";
import PerfilUsuario from "./pages/PerfilUsuario";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CarritoProvider>
          <CategoryFilterProvider>
            <div className="app-container">
              <Navbar />
              <main className="app-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/nosotros" element={<Nosotros />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/producto/:id" element={<DetalleProducto />} />
                  <Route
                    path="/perfil"
                    element={
                      <ProtectedRoute>
                        <PerfilUsuario />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/administrador"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <Administrador />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </CategoryFilterProvider>
        </CarritoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
