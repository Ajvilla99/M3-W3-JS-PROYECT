# Lista de Productos

Este proyecto es una aplicación web para la gestión de productos, desarrollada con JavaScript, HTML y CSS. Permite crear, editar, eliminar y visualizar productos, utilizando una API REST simulada (por ejemplo, con json-server).

## Características

- Visualización de una tabla con todos los productos.
- Búsqueda rápida de productos.
- Creación de nuevos productos mediante un formulario modal.
- Edición de productos existentes.
- Eliminación de productos.
- Interfaz moderna y responsiva.

## Estructura del Proyecto

```
├── db.json                # Base de datos simulada (json-server)
├── index.html             # Página principal
├── package.json           # Dependencias y scripts
├── public/
│   ├── no-image.png       # Imagen por defecto
│   └── vite.svg           # Icono
├── src/
│   ├── api.js             # Funciones para llamadas a la API
│   ├── main.js            # Lógica principal de la app
│   └── style.css          # Estilos
└── README.md              # Este archivo
```

## Instalación y Ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Ajvilla99/M3-W3-JS-PROYECT
   cd M3-W3-JS
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **(Opcional) Inicia json-server para la API:**
   ```bash
   npx json-server --watch db.json --port 3000
   ```

5. **Abre la aplicación:**
   Ve a `http://localhost:5173` en tu navegador.

## Uso

- Haz clic en "+ Agregar producto" para crear un nuevo producto.
- Usa los botones "Editar" y "Eliminar" en cada fila para modificar o borrar productos.
- El estado del producto puede ser "Disponible" o "No Disponible".

## Dependencias principales

- [Vite](https://vitejs.dev/) - Bundler para desarrollo rápido.
- [json-server](https://github.com/typicode/json-server) - API REST fake para pruebas.

## Personalización

Puedes modificar los estilos en `src/style.css` y la estructura de productos en `db.json`.

## Autor

- [Abrahan Villa](https://github.com/Ajvilla99)

## Licencia

Este proyecto está bajo la licencia MIT.
