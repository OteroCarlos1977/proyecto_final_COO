import { Button as BootstrapButton } from 'react-bootstrap'; // Importa el componente Button de la librería React Bootstrap

/**
 * Componente reutilizable de botón, basado en el Button de React Bootstrap.
 * Permite personalizar texto, estilo, evento onClick, ícono y tooltip.
 */
function Button({ 
  texto,          // Texto que se mostrará dentro del botón
  style,          // Estilos inline personalizados para el botón
  onClick,        // Función que se ejecutará al hacer clic
  Icono,          // Componente de ícono opcional 
  tooltip,        // Texto que se muestra como tooltip 
  variant = "primary", // Variante visual del botón (por defecto: "primary")
  ...props        // Cualquier otra prop adicional será pasada al componente BootstrapButton
}) {
  return (
    <BootstrapButton
      style={style}
      onClick={onClick}
      title={tooltip}
      variant={variant}
      {...props}
    >
      {/* Si se pasa un ícono, lo renderiza con margen derecho si hay texto */}
      {Icono && <Icono style={{ marginRight: texto ? "8px" : "0" }} />}  
      {texto} {/* Muestra el texto del botón si se provee */}
    </BootstrapButton>
  );
}

export default Button;
