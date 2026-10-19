
 // Componentes personalizados - FunkoMania
 // BYRON - Estilo Western

 // PASO 2 - Plantilla con Shadow DOM y slots
 const plantilla = document.createElement("template");

 plantilla.innerHTML = `
   <style>
     :host {
       display: block;
       border: 2px dashed var(--color-marca, #8C4F19);
       border-radius: var(--radio-borde, 10px);
       background-color: var(--color-fondo, #FFF9ED);
       color: var(--color-texto, #45301E);
       overflow: hidden;
       box-shadow: 0 12px 26px rgba(87, 53, 20, 0.22);
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
       background-color: var(--color-panel, #F2E4CE);
       background-image: repeating-linear-gradient(
         -45deg,
         transparent 0,
         transparent 15px,
         rgba(140, 79, 25, 0.10) 15px,
         rgba(140, 79, 25, 0.10) 17px
       );
       border-right: 4px solid var(--color-marca, #8C4F19);
       padding: 20px;
     }

     .informacion {
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: center;
       padding: 28px;
     }

     ::slotted(img) {
       display: block;
       width: 100%;
       max-width: 340px;
       height: 240px;
       object-fit: contain;
     }

     ::slotted(h3) {
       font-family: Georgia, serif;
       font-size: 32px;
       font-style: italic;
       letter-spacing: 1px;
       color: var(--color-marca, #8C4F19);
       margin: 0 0 12px;
     }

     ::slotted(p) {
       color: var(--color-texto, #45301E);
       line-height: 1.5;
     }

     .etiqueta {
       align-self: flex-start;
       padding: 7px 12px;
       border: 2px dashed var(--color-marca, #8C4F19);
       border-radius: 5px;
       background-color: var(--color-panel, #F2E4CE);
       font-family: Georgia, serif;
       font-size: 13px;
       font-weight: bold;
     }

     .precio {
       margin-top: 18px;
       margin-bottom: 18px;
       font-size: 26px;
       font-weight: bold;
       border-bottom: 3px solid var(--color-marca, #8C4F19);
       padding-bottom: 6px;
       width: fit-content;
     }

     button {
       align-self: flex-start;
       border: none;
       border-radius: 5px;
       padding: 12px 24px;
       background-color: var(--color-marca, #8C4F19);
       color: var(--color-boton, white);
       font-size: 14px;
       font-weight: bold;
       letter-spacing: 1px;
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
 customElements.define("tarjeta-byron", TarjetaProducto);
