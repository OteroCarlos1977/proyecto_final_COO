import React from 'react';
import Cards from '../componentes/Cards';

// Componente Home que recibe filtros de categoría y una función para agregar productos al carrito
function Home({ categoryFilter, onAgregarAlCarrito }) {
    return (
        <div>
            {/* Renderiza el componente Cards pasando los props recibidos */}
            <Cards
                categoryFilter={categoryFilter}         // Filtra las tarjetas por categoría seleccionada
                onAgregarAlCarrito={onAgregarAlCarrito} // Función para agregar un producto al carrito
            />
        </div>
    );
}

export default Home;
