// Importación de módulos de React Router y componentes de contexto
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Provee contexto de autenticación
import { CarritoProvider } from "./context/CarritoContext"; // Provee contexto para el carrito de compras
import { CategoryFilterProvider } from './context/CategoryFilterContext'; // Provee contexto para el filtro de categorías

// Importación de páginas y componentes
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Administrador from "./pages/Administrador";
import Carrito from "./componentes/Carrito";
import Footer from "./componentes/Footer";
import Navbar from "./componentes/Navbar";
import DetalleProducto from "./componentes/DetalleProducto";
import ProtectedRoute from "./context/ProtectedRoute"; // Componente para proteger rutas privadas
import PerfilUsuario from "./pages/PerfilUsuario";


function App() {
    return (
        // Envoltura principal del enrutador de React
        <Router>
            {/* Contexto de autenticación: mantiene información del usuario logueado */}
            <AuthProvider>
                {/* Contexto del carrito: permite acceder y modificar el carrito desde cualquier componente */}
                <CarritoProvider>
                    {/* Contexto de filtro de categoría: permite filtrar productos por categoría */}
                    <CategoryFilterProvider>
                        {/* Contenedor principal de la aplicación */}
                        <div className="app-container">
                            {/* Navbar visible en todas las páginas */}
                            <Navbar />
                            {/* Contenedor principal de contenido, según la ruta actual */}
                            <main className="app-content">
                                <Routes>
                                    {/* Ruta de inicio */}
                                    <Route path="/" element={<Home />} />
                                    {/* Ruta a la página "Nosotros" */}
                                    <Route path="/nosotros" element={<Nosotros />} />
                                    {/* Ruta a la página de contacto */}
                                    <Route path="/contacto" element={<Contacto />} />
                                    {/* Ruta a la página de login */}
                                    <Route path="/login" element={<Login />} />
                                    {/* Ruta para visualizar el carrito */}
                                    <Route path="/carrito" element={<Carrito />} />
                                    {/* Ruta dinámica para el detalle de un producto específico */}
                                    <Route path="/producto/:id" element={<DetalleProducto />} />
                                    
                                    {/* Ruta protegida para el perfil de usuario (requiere login) */}
                                    <Route
                                        path="/perfil"
                                        element={
                                            <ProtectedRoute>
                                                <PerfilUsuario />
                                            </ProtectedRoute>
                                        }
                                    />

                                    {/* Ruta protegida y solo accesible por administradores */}
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
                            {/* Footer visible en todas las páginas */}
                            <Footer />
                        </div>
                    </CategoryFilterProvider>
                </CarritoProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
