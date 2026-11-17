# Lista de tareas con ruleta

> Práctica 3.1: Maquetación Responsive con SASS y Vite  
> Diseño de Interfaces. S2DAW.

Página web de una lista de tareas con un botón de sorteo. Al pulsarlo, una "ruleta" va mostrando tareas al azar y al terminar aparece una ventana en el centro de la pantalla con la tarea elegida.

**Web publicada:** https://github.com/CVZiMo/P3.1-Proyecto-final-responsive-Sass

## Funcionalidades

- Añadir, marcar como hecha y borrar tareas.
- Sorteo aleatorio entre las tareas pendientes (las hechas no participan).
- Ventana modal con la tarea elegida, con opción de marcarla como hecha.
- Diseño responsive: dos columnas en escritorio y una columna en móvil.

## Tecnologías

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/) (con `@use`)
- Figma (diseño y sistema de diseño)

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/CVZiMo/P3.1-Proyecto-final-responsive-Sass
cd [nombre de la carpeta]

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción (genera la carpeta docs)
npm run build
```

## Estructura del proyecto

```
src/
├── styles/
│   ├── _variables.scss   # Colores, fuentes y espaciados (exportados de Figma)
│   ├── _mixins.scss      # Mixin de botón y gestor de media queries
│   ├── _components.scss  # Formulario, lista, ruleta y modal
│   ├── _layout.scss      # Estructura general de la página
│   ├── _globals.scss     # Estilos base
│   └── main.scss         # Importa todos los parciales
├── assets/
├── App.jsx
└── main.jsx
```

## Conceptos de SASS utilizados

- **Variables** para colores, fuentes y tamaños comunes.
- **Mixins**: `boton` (estilos de botón reutilizables) y `respond-to` (media queries).
- **Mapas**: `$breakpoints` con los puntos de ruptura.
- **Anidamiento** en los componentes.
- **Media queries** para adaptar el diseño a móvil.

## Breakpoints

| Nombre | Ancho máximo |
| ------ | ------------ |
| small  | 599px        |
| medium | 1199px       |

## Diseño

El diseño prototipo está hecho en Figma, con versión de escritorio y versión móvil: 
https://www.figma.com/design/8KkCZWjOOjwiH0IerevtxR/tarea-de-lista-ruleta?node-id=0-1&t=sR2Po2ASLs1Kgiug-1

## Autor

Víctor Chen