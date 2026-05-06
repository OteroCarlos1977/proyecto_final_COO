import { Button as BootstrapButton } from 'react-bootstrap';

function Button({
  texto,
  style,
  onClick,
  Icono,
  tooltip,
  variant = "primary",
  ...props
}) {
  return (
    <BootstrapButton
      style={style}
      onClick={onClick}
      title={tooltip}
      variant={variant}
      {...props}
    >
      {Icono && <Icono style={{ marginRight: texto ? "8px" : "0" }} />}  
      {texto}
    </BootstrapButton>
  );
}

export default Button;
