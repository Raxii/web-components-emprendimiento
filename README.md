# Práctica de laboratorio · Componentes web de FunkoManía

**Programación Integrativa de Componentes Web · Unidad 1: Web Components**

| Dato | Información |
|---|---|
| Emprendimiento | FunkoManía |
| Estudiantes | Byron Aguilar, Mateo Villacreces, Estefanía Arana y Carlos Carrasco |
| NRC | 36642 |
| Fecha | 13 de octubre de 2026 |
| Repositorio del equipo | https://github.com/Raxii/web-components-emprendimiento |

## Propuesta del emprendimiento

- **Nombre:** FunkoManía.
- **Problema que resuelve:** facilita la búsqueda y visualización de figuras coleccionables mediante un catálogo digital sencillo, organizado y reutilizable.
- **Cliente objetivo:** personas aficionadas a las figuras coleccionables, las películas, las series y el anime.
- **Objetivo de la práctica:** integrar cuatro tarjetas personalizadas con módulos ES, plantillas HTML, Shadow DOM, slots, estilos encapsulados y precios que se actualizan al modificar un atributo.

## Estructura del proyecto integrado

```text
web-components-emprendimiento/
├── index.html
├── estilos.css
├── app.js
├── README.md
├── componentes/
│   ├── tarjeta-byron.js
│   ├── tarjeta-mateo.js
│   ├── tarjeta-estefi.js
│   └── tarjeta-carlos.js
└── img/
    ├── woody_1.png
    ├── StrangerThings.png
    ├── Nami.png
    └── Vegapunk.webp
```

**Nota:** los nombres de las imágenes deben coincidir exactamente con los archivos que realmente estén en `img/`, incluidas las mayúsculas, minúsculas y extensiones.

## Cómo abrir el proyecto

1. Abrir la carpeta del repositorio en Visual Studio Code.
2. Hacer clic derecho en `index.html` y elegir **Open with Live Server**.
3. Presionar **F12** para abrir la consola del navegador.
4. Evitar abrir el proyecto con `file://`, ya que los módulos ES deben servirse desde un servidor local.

## Cómo editar el proyecto

| Qué se desea editar | Archivo | Qué cambiar |
|---|---|---|
| Productos, descripciones, precios y rutas de imágenes | `index.html` | Contenido de las cuatro etiquetas personalizadas y atributo `precio`. |
| Estilos generales de la página | `estilos.css` | Diseño del encabezado, catálogo y distribución general. |
| Importación de componentes | `app.js` | Las cuatro sentencias `import`. |
| Apariencia y comportamiento de cada tarjeta | `componentes/tarjeta-*.js` | Plantilla, estilos del Shadow DOM, slots y actualización de precio. |
| Imágenes | `img/` | Agregar fotografías y comprobar sus rutas. |
| Documentación | `README.md` | Información del emprendimiento, aportes, pruebas e integración. |

Cada módulo tiene un estilo visual propio. La variable `--color-marca` admite personalización desde la página; **si se aplica el mismo color globalmente a las cuatro tarjetas, se reemplazarán sus respectivos colores de respaldo**.

## Registro de los pasos

### Paso 1 · Elementos personalizados y módulos ES

Cada integrante conserva un archivo JavaScript y registra una etiqueta diferente:

| Integrante | Módulo ES | Etiqueta |
|---|---|---|
| Byron | `componentes/tarjeta-byron.js` | `<tarjeta-byron>` |
| Mateo | `componentes/tarjeta-mateo.js` | `<tarjeta-mateo>` |
| Estefanía | `componentes/tarjeta-estefi.js` | `<tarjeta-estefi>` |
| Carlos | `componentes/tarjeta-carlos.js` | `<tarjeta-carlos>` |

Los nombres llevan guion porque así lo exige la especificación de los Custom Elements. Los cuatro módulos pueden exportar una clase llamada `TarjetaProducto` porque cada archivo tiene su propio ámbito de módulo. **No deben registrar todos la misma etiqueta**, pues provocaría un error de registro duplicado.

`index.html` carga un único punto de entrada:

```html
<script type="module" src="./app.js"></script>
```

`app.js` importa las implementaciones:

```js
import "./componentes/tarjeta-byron.js";
import "./componentes/tarjeta-mateo.js";
import "./componentes/tarjeta-estefi.js";
import "./componentes/tarjeta-carlos.js";
```

### Paso 2 · Plantilla, Shadow DOM y slots

- Cada módulo declara **una plantilla** con `document.createElement("template")`, fuera de su clase.
- En el constructor se usa `super()` y `attachShadow({ mode: "open" })`.
- `connectedCallback()` llama a `this.render()` y `render()` clona la plantilla con `cloneNode(true)`.
- Los slots con nombre son **`foto`**, **`nombre`** y **`descripcion`**.
- Existe un slot sin nombre con texto de respaldo: **«Figura coleccionable»**.
- La clonación permite que cada instancia tenga su propio contenido sin vaciar la plantilla compartida.

### Paso 3 · Precio reactivo y estilos

- El atributo `precio` se declara en `observedAttributes`.
- `attributeChangedCallback()` actualiza el texto cuando cambia `precio`.
- Los métodos `get precio()` y `set precio(valor)` sincronizan la propiedad con el atributo HTML.
- `:host` establece `display: block` y las reglas básicas de cada tarjeta.
- Los estilos se encapsulan dentro del Shadow DOM y usan variables como `var(--color-marca, respaldo)`.

| Integrante | Estilo personalizado | Color de respaldo de `--color-marca` |
|---|---|---|
| Byron | Vaquero, tonos café y borde discontinuo | `#8C4F19` |
| Mateo | Oscuro con detalles rojos | `#E35D6A` |
| Estefanía | Oceánico, celeste y naranja | `#D86A1E` |
| Carlos | Tecnológico y futurista | `#B7374D` |

### Paso 4 · Productos de FunkoManía

| N.º | Integrante | Figura | Precio utilizado en el ejemplo |
|---|---|---|---:|
| 1 | Byron | Sheriff Woody | $21.00 |
| 2 | Mateo | Vecna | $25.00 |
| 3 | Estefanía | Nami | $20.00 |
| 4 | Carlos | Dr. Vegapunk | $22.00 |

Los precios proceden de la versión de ejemplo trabajada por el equipo y deben contrastarse con el catálogo definitivo antes de entregar.

### Paso 5 · Repositorio e integración del equipo

El repositorio utiliza las siguientes ramas:

- `tarjeta-byron`: aporte de Byron.
- `tarjeta-mateo`: aporte de Mateo.
- `tarjeta-estefi`: aporte de Estefanía.
- `tarjeta-carlos`: aporte de Carlos.
- `develop`: integración y pruebas de las cuatro tarjetas.
- `main`: versión final de entrega.

**Procedimiento previsto:** cada integrante realiza `commit` y `push` en su rama; después crea un Pull Request hacia `develop`. Una vez revisados los cambios y resueltos los posibles conflictos en `index.html`, `estilos.css` u otros archivos, se prueba el catálogo completo y se abre un Pull Request final de `develop` hacia `main`.

| Integrante | Aporte asignado |
|---|---|
| Byron Aguilar | Componente de Sheriff Woody: `tarjeta-byron.js`, contenido HTML e imagen. |
| Mateo Villacreces | Componente de Vecna: `tarjeta-mateo.js`, contenido HTML e imagen. |
| Estefanía Arana | Componente de Nami: `tarjeta-estefi.js`, contenido HTML e imagen. |
| Carlos Carrasco | Componente de Dr. Vegapunk: `tarjeta-carlos.js`, contenido HTML e imagen. |

## Verificación antes de entregar

Marcar **solo después de probarlo en la rama `develop`**:

- [ ] `app.js` importa los cuatro módulos sin errores.
- [ ] El `index.html` presenta las cuatro etiquetas personalizadas.
- [ ] Las cuatro imágenes cargan y tienen atributo `alt`.
- [ ] Las plantillas se clonan y se muestra el Shadow DOM de cada componente.
- [ ] Funcionan los slots `foto`, `nombre`, `descripcion` y el texto de respaldo del slot sin nombre.
- [ ] `precio` está en `observedAttributes` y funciona con getter y setter.
- [ ] `setAttribute("precio", ...)` modifica el precio visible sin recargar la página.
- [ ] `:host`, `display` y las variables CSS funcionan sin perder los estilos individuales.
- [ ] La consola de F12 no muestra errores.
- [ ] Los cuatro Pull Requests de aportes están integrados en `develop`.
- [ ] `README.md` describe el trabajo real y el uso de IA.
- [ ] El Pull Request de `develop` a `main` se realiza después de validar el proyecto.

Prueba en la consola:

```js
document.querySelector("tarjeta-byron").setAttribute("precio", "25");
```

**Resultado esperado:** el texto del precio de la tarjeta de Byron cambia a `Precio: $25`, sin recargar la página. El código actual transforma el atributo con `Number()`, por lo que no agrega automáticamente dos decimales.

## Reto extra

El atributo opcional `destacado` modifica el borde con `:host([destacado])`.

## Herramientas y uso de inteligencia artificial

- **Visual Studio Code:** edición de HTML, CSS y JavaScript.
- **Live Server:** ejecución local y pruebas en el navegador.
- **Git y GitHub:** ramas individuales, commits, Pull Requests e integración.
- **ChatGPT:** asistencia en la elaboración y adaptación de ejemplos de código JavaScript, estilos CSS de las tarjetas, estructura HTML, documentación y orientación para Git/GitHub.

El equipo es responsable de **revisar, comprender, ajustar y probar** todo el código antes de la entrega, así como de poder explicar su funcionamiento.

## Observación sobre la consigna

La guía original solicita un componente reutilizable llamado `<tarjeta-producto>`, mostrado en al menos tres instancias. Esta versión de FunkoManía integra **cuatro componentes independientes con etiquetas distintas**, uno por integrante. **Es necesario confirmar con el docente que esta adaptación cumple su indicación** antes de presentar la entrega final.
