import { createContext, useState, useContext } from 'react';

const CategoryFilterContext = createContext();

export function useCategoryFilter() {
    return useContext(CategoryFilterContext);
}

export function CategoryFilterProvider({ children }) {
    const [categoryFilter, setCategoryFilter] = useState(null);

    const value = {
        categoryFilter,
        setCategoryFilter,
    };

    return (
        <CategoryFilterContext.Provider value={value}>
            {children}
        </CategoryFilterContext.Provider>
    );
}
