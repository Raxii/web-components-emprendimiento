# Práctica de laboratorio · `<tarjeta-producto>`

Programación Integrativa de Componentes Web · Unidad 1: Web Components

| Dato | Información |
|---|---|
| Emprendimiento | StepUp Sneakers |
| Estudiantes | Byron Aguilar, Mateo Villacreces  , Estefania Arana  , Carlos Carrasco|
| NRC | 36642 |
| Fecha | 13 de octubre de 2026 |
| Enlace del repositorio | https://github.com/Raxii/web-components-emprendimiento |

## Propuesta del emprendimiento

- Nombre del emprendimiento: StepUp Sneakers.
- Problema que resuelve: facilita encontrar calzado urbano cómodo y de estilo actual en un catálogo simple y reutilizable.
- Cliente al que se dirige: estudiantes y jóvenes que buscan zapatillas para uso diario.

## Cómo abrir el proyecto

1. Abrir la carpeta en Visual Studio Code.
2. Clic derecho sobre `index.html` y seleccionar **Open with Live Server**.
3. Abrir las herramientas del navegador con F12 y revisar la consola.

## Registro de los pasos

### Paso 1 · index.html y el módulo

- Etiqueta registrada: `<tarjeta-producto>`.
- El nombre lleva guion porque los Custom Elements deben usar un nombre compuesto para diferenciarse de las etiquetas HTML nativas.
- La página importa el módulo con `<script type="module" src="./componentes/tarjeta-producto.js"></script>`.

### Paso 2 · Plantilla, Shadow DOM y slots

- Slots con nombre: `foto` y `nombre`.
- Texto de respaldo del slot sin nombre: `Sin descripción`.
- `cloneNode(true)` crea una copia independiente de la plantilla para cada instancia del componente.

### Paso 3 · Atributo precio y estilos

- Método que reacciona cuando cambia `precio`: `attributeChangedCallback`.
- Color de marca: `--color-marca`, definido en `estilos.css`.
- Valor de respaldo del componente: `#2F6B45`.

### Paso 4 · Productos del emprendimiento

| # | Producto | Precio |
|---|---|---:|
| 1 | Urban Classic | $69.99 |
| 2 | Street Runner | $84.50 |
| 3 | Retro High | $79.90 |
| 4 | Canvas Pro | $64.00 |

### Paso 5 · Repositorio del equipo

| Integrante | Qué hizo en este laboratorio |
|---|---|
| Byron | Agregó la tarjeta Urban Classic y verificó el componente destacado. |
| Mateo | Agregó la tarjeta Street Runner y su imagen. |
| Estefi | Agregó la tarjeta Retro High y su imagen. |
| Carlos | Agregó la tarjeta Canvas Pro y su imagen. |

## Verificación

- [x] La etiqueta tiene guion.
- [x] La página solo cambia lo que el componente expone con `var()`.
- [x] `setAttribute` cambia el precio en pantalla.
- [x] La consola no muestra errores al ejecutar con Live Server.

Prueba en consola:

```js
document.querySelector("tarjeta-producto").setAttribute("precio", "25");
```

Resultado esperado: la primera tarjeta muestra `$25.00`.

## Reto extra

- [x] El atributo `destacado` cambia el borde con `:host([destacado])`.

## Herramientas utilizadas

- Visual Studio Code: utilizado para desarrollar, editar y probar los archivos HTML, CSS y JavaScript del proyecto.
- Live Server: utilizado para ejecutar el proyecto localmente y comprobar el funcionamiento de los componentes web.
- Git y GitHub: utilizados para trabajar con las ramas individuales de cada integrante, realizar commits, subir cambios e integrar el trabajo del equipo.
- ChatGPT: utilizado de forma puntual como apoyo para revisar algunos errores y orientar al equipo en los comandos de Git necesarios para subir e integrar los aportes de todos los integrantes en GitHub.

El desarrollo, modificación, revisión y pruebas del código fueron realizados por los integrantes del equipo.
