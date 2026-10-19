// Componentes personalizados - FunkoMania
// ESTEFANIA - Estilo oceano

// PASO 2 - Plantilla con Shadow DOM y slots
const plantilla = document.createElement("template");

plantilla.innerHTML = `
   <style>
     :host {
       display: block;
       border: 2px solid var(--color-marca, #D86A1E);
       border-radius: var(--radio-borde, 20px);
       background-color: var(--color-fondo, #FFFDF6);
       color: var(--color-texto, #30465C);
       overflow: hidden;
       box-shadow: 0 14px 28px rgba(54, 133, 176, 0.20);
     }

     :host([destacado]) {
       border-width: 4px;
     }

     .tarjeta {
       display: flex;
       flex-direction: var(--direccion, row);
       min-height: var(--alto, 360px);
     }

     .foto {
       flex: 1;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color: var(--color-panel, #DFF4FF);
       background-image: linear-gradient(
         180deg,
         rgba(111, 209, 247, 0.43),
         rgba(255, 255, 255, 0.20)
       );
       padding: 20px;
     }

     .informacion {
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: center;
       padding: 28px;
       background-image: linear-gradient(
         180deg,
         rgba(255, 255, 255, 0.60),
         rgba(251, 222, 175, 0.13)
       );
     }

     ::slotted(img) {
       display: block;
       width: 100%;
       max-width: 340px;
       height: 240px;
       object-fit: contain;
     }

     ::slotted(h3) {
       font-family: 'Trebuchet MS', sans-serif;
       font-size: 34px;
       font-weight: 900;
       letter-spacing: 1px;
       color: var(--color-marca, #D86A1E);
       margin: 0 0 12px;
     }

     ::slotted(p) {
       color: var(--color-texto, #30465C);
       line-height: 1.5;
     }

     .etiqueta {
       align-self: flex-start;
       padding: 7px 12px;
       border: 1px solid var(--color-marca, #D86A1E);
       border-radius: 999px;
       background-color: #FFF4D7;
       font-size: 13px;
       font-weight: bold;
     }

     .precio {
       margin-top: 18px;
       margin-bottom: 18px;
       font-size: 26px;
       font-weight: bold;
       color: var(--color-marca, #D86A1E);
     }

     button {
       align-self: flex-start;
       border: none;
       border-radius: 999px;
       padding: 12px 24px;
       background-color: var(--color-marca, #D86A1E);
       color: var(--color-boton, white);
       font-size: 14px;
       font-weight: bold;
       box-shadow: 0 5px 12px rgba(216, 106, 30, 0.22);
     }

     @media (max-width: 760px) {
       .tarjeta {
         flex-direction: column;
       }

       .foto {
         padding: 15px;
       }

       .informacion {
         padding: 22px;
       }

       ::slotted(img) {
         height: 200px;
       }
     }
   </style>

   <section class="tarjeta">
     <div class="foto">
       <slot name="foto"></slot>
     </div>

     <div class="informacion">
       <slot name="nombre"></slot>
       <slot name="descripcion"></slot>

       <div class="etiqueta">
         <slot>Figura coleccionable</slot>
       </div>

       <div class="precio">
         Precio: $<span id="precio">0</span>
       </div>

       <button type="button" disabled>COMPRAR</button>
     </div>
   </section>
 `;

export class TarjetaProducto extends HTMLElement {

    // PASO 3 - Atributos observados
    static get observedAttributes() {
        return ["precio"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    // Mostrar la tarjeta
    render() {
        this.shadowRoot.replaceChildren(
            plantilla.content.cloneNode(true)
        );

        this.shadowRoot.querySelector("#precio").textContent = this.precio;
    }

    // PASO 3 - Actualizar el precio
    attributeChangedCallback(nombre, anterior, valor) {
        if (nombre === "precio") {
            const elementoPrecio = this.shadowRoot.querySelector("#precio");

            if (elementoPrecio) {
                elementoPrecio.textContent = this.precio;
            }
        }
    }

    // PASO 3 - Propiedad precio
    get precio() {
        return Number(this.getAttribute("precio"));
    }

    set precio(valor) {
        this.setAttribute("precio", valor);
    }
}

// PASO 1 - Registrar el componente
customElements.define("tarjeta-estefi", TarjetaProducto);