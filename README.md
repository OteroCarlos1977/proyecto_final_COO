# Proyecto Final COO

Proyecto final academico desarrollado con React y Vite. La aplicacion simula una tienda online con catalogo de productos, filtros por categoria, autenticacion local, perfil de usuario, panel de administracion protegido y carrito de compras funcional.

## Objetivo

El proyecto demuestra una experiencia e-commerce completa desde el frontend: navegacion, catalogo, seleccion de productos, control de stock, carrito persistente y cierre de compra con actualizacion de datos en una API mock externa.

## Funcionalidades

- Catalogo de productos consumido desde MockAPI.
- Busqueda de productos por texto.
- Filtro por categorias desde contexto global.
- Detalle de producto.
- Carrito de compras funcional con contexto global.
- Persistencia del carrito en `localStorage`.
- Agregado de productos con validacion de stock.
- Incremento y decremento de cantidades sin superar stock disponible.
- Eliminacion individual de productos.
- Vaciado del carrito al finalizar compra.
- Calculo de subtotal por item y total general.
- Finalizacion de compra con actualizacion de stock en MockAPI.
- Login con usuarios locales.
- Perfil de usuario autenticado.
- Panel de administracion protegido por rol.
- Alertas visuales con SweetAlert2.
- UI basada en Bootstrap, React Bootstrap y React Icons.

## Tecnologias

- React 19
- Vite 6
- React Router DOM 7
- Context API
- Bootstrap
- React Bootstrap
- SweetAlert2
- React Icons
- MockAPI
- localStorage

## Usuarios Demo

Administrador:

```text
Usuario: admin
Password: admin123
```

Usuario comun:

```text
Usuario: user
Password: user123
```

Tambien existen usuarios academicos de prueba en `src/data/usuarios.js`.

## Instalacion

```bash
npm install
```

## Ejecucion Local

```bash
npm run dev
```

La aplicacion queda disponible normalmente en:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

Para previsualizar el build:

```bash
npm run preview
```

## Validacion

```bash
npm test
npm run lint
npm run build
```

Los tests, el lint y el build quedaron validados luego de la limpieza de comentarios y del repaso del carrito funcional.

## Estructura

```text
src/
  componentes/   Componentes reutilizables: cards, carrito, navbar, formularios
  context/       Autenticacion, carrito, rutas protegidas y filtros
  data/          Usuarios locales de prueba
  hooks/         Consumo de datos de productos
  pages/         Vistas principales
```

## Carrito Funcional

El carrito esta implementado en `src/context/CarritoContext.jsx` y se consume desde `src/componentes/Carrito.jsx`.

La logica pura del carrito se encuentra en `src/utils/cart.js` para poder testear reglas de negocio sin depender del renderizado de React.

Incluye:

- Estado global disponible en toda la aplicacion.
- Persistencia en `localStorage`.
- Validacion para no agregar mas unidades que el stock disponible.
- Control manual de cantidad con botones `+` y `-`.
- Calculo de total y subtotales.
- Confirmacion antes de eliminar productos.
- Redireccion a login si el usuario intenta finalizar compra sin iniciar sesion.
- Actualizacion de stock en MockAPI al completar la compra.

## Tests

```bash
npm test
```

Los tests actuales cubren:

- Agregado de producto nuevo.
- Incremento de cantidad sin superar stock.
- Cambio manual de cantidades respetando minimo y maximo.
- Calculo de total y cantidad acumulada.
- Eliminacion de productos por id.
- Validacion de credenciales demo.
- Creacion de sesion simulada con token y expiracion.
- Ruta posterior al login segun rol.
- Vigencia de sesion por timestamp.
- Decisiones de rutas protegidas para carga, login, usuario comun y administrador.

## Autenticacion

La autenticacion es simulada para fines academicos. Los usuarios se validan contra datos locales y el token se guarda en `localStorage` con expiracion de una hora.

La logica pura de autenticacion se encuentra en `src/utils/auth.js` para poder testear credenciales, rutas por rol y expiracion de sesion.

Este enfoque no debe usarse como seguridad real en produccion. Para una version productiva se recomienda backend con sesiones o JWT reales, contrasenas hasheadas y validacion del lado servidor.
