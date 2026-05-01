# Proyecto Final COO

Aplicación web desarrollada como proyecto final académico. Implementa una experiencia tipo e-commerce con catálogo de productos, navegación por páginas, carrito de compras, autenticación simulada, perfil de usuario y panel de administración protegido.

## Características

- Catálogo de productos con componentes reutilizables.
- Navegación con React Router.
- Carrito de compras mediante contexto global.
- Filtro de categorías con contexto dedicado.
- Login con usuarios locales y token simulado en `localStorage`.
- Rutas protegidas para usuario autenticado y administrador.
- Panel administrativo.
- Alertas visuales con SweetAlert2.
- Estilos basados en Bootstrap y React Bootstrap.

## Tecnologías

- React 19
- Vite 6
- React Router DOM 7
- Bootstrap / React Bootstrap
- SweetAlert2
- React Icons
- localStorage

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

La aplicación queda disponible normalmente en `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

## Estructura general

```text
src/
  componentes/   Componentes reutilizables de UI
  context/       Contextos de autenticación, carrito y filtros
  data/          Datos locales de productos y usuarios
  pages/         Páginas principales de la aplicación
  App.jsx        Rutas y composición principal
```

## Autenticación

La autenticación es simulada para fines académicos. Los usuarios se validan contra datos locales y el token se guarda en `localStorage` con expiración de una hora.

Este enfoque no debe usarse como seguridad real en producción. Para una versión productiva se recomienda backend con sesiones/JWT reales, contraseñas hasheadas y validación del lado servidor.

## Mejoras pendientes

- Agregar capturas de pantalla y enlace de demo.
- Documentar usuarios demo disponibles.
- Agregar pruebas básicas para rutas, login y carrito.
- Separar datos mock de lógica de negocio para facilitar integración con una API real.
