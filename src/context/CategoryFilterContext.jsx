// Importa funciones necesarias desde React
import React, { createContext, useState, useContext } from 'react';

// Crea un contexto para manejar el filtro por categoría
const CategoryFilterContext = createContext();

// Hook personalizado para acceder fácilmente al contexto
export function useCategoryFilter() {
    return useContext(CategoryFilterContext);
}

// Proveedor del contexto de filtro de categoría
export function CategoryFilterProvider({ children }) {
    // Estado para almacenar la categoría seleccionada como filtro
    const [categoryFilter, setCategoryFilter] = useState(null);

    // Objeto que se pasará al contexto con el estado y su función para actualizarlo
    const value = {
        categoryFilter,
        setCategoryFilter,
    };

    // Provee el contexto a los componentes hijos
    return (
        <CategoryFilterContext.Provider value={value}>
            {children}
        </CategoryFilterContext.Provider>
    );
}
