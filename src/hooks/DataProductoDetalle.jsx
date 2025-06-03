// Importa hooks necesarios de React
import { useState, useEffect } from 'react';

// Custom hook para obtener un producto por ID desde una URL base
function useFetchProductById(baseUrl, id) {
  // Estado para almacenar el producto
  const [product, setProduct] = useState(null);
  // Estado para indicar si está cargando
  const [loading, setLoading] = useState(true);
  // Estado para almacenar posibles errores
  const [error, setError] = useState(null);

  // Efecto que se ejecuta cada vez que cambian la URL base o el ID
  useEffect(() => {
    if (!id) return; // Si no hay ID, no realiza la petición

    // Función asincrónica para obtener el producto
    const fetchProduct = async () => {
      setLoading(true);   // Indica que está cargando
      setError(null);     // Resetea errores anteriores

      try {
        // Realiza la petición HTTP usando fetch
        const response = await fetch(`${baseUrl}/${id}`);
        
        // Si la respuesta no es exitosa, lanza un error
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Convierte la respuesta a JSON y la guarda en el estado
        const jsonData = await response.json();
        setProduct(jsonData);
      } catch (err) {
        // Si ocurre un error, lo guarda en el estado de error
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        // Finaliza la carga, ya sea con éxito o con error
        setLoading(false);
      }
    };

    // Llama a la función para obtener el producto
    fetchProduct();
  }, [baseUrl, id]); // Se vuelve a ejecutar si cambia baseUrl o id

  // Devuelve el producto, el estado de carga y posibles errores
  return { product, loading, error };
}


export default useFetchProductById;
