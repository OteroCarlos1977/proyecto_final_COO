// Importa hooks necesarios de React
import { useState, useEffect } from 'react';

/*  Hook personalizado para realizar peticiones fetch a una URL.
 Retorna los datos obtenidos, el estado de carga y cualquier error.*/
function useFetchData(url, trigger = false) {
  // Estado para almacenar los datos obtenidos
  const [data, setData] = useState(null);
  // Estado para controlar si los datos están siendo cargados
  const [loading, setLoading] = useState(true);
  // Estado para almacenar un mensaje de error en caso de que ocurra
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta o cuando cambia la URL
  useEffect(() => {
    // Función asíncrona para realizar la petición
    const fetchData = async () => {
      setLoading(true);  // Inicia el estado de carga
      setError(null);    // Resetea cualquier error previo

      try {
        // Realiza la petición fetch a la URL proporcionada
        const response = await fetch(url);
        // Lanza un error si la respuesta no es exitosa (código diferente a 200)
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        // Parsea la respuesta como JSON y actualiza el estado con los datos
        const jsonData = await response.json();
        console.log(jsonData)
        setData(jsonData);
      } catch (err) {
        // Si ocurre un error, actualiza el estado de error y lo muestra en consola
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        // Finaliza el estado de carga, tanto si hubo éxito como si hubo error
        setLoading(false);
      }
    };

    // Ejecuta la función de carga de datos
    fetchData();
  }, [url, trigger]); // Se vuelve a ejecutar si cambia la URL

  // Retorna un objeto con los datos, el estado de carga y cualquier error
  return { data, loading, error };
}

export default useFetchData;
