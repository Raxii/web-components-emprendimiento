// Componentes personalizados - FunkoMania
 // CARLOS - Estilo tecnologico

 // PASO 2 - Plantilla con Shadow DOM y slots
 const plantilla = document.createElement("template");

 plantilla.innerHTML = `
   <style>
     :host {
       display: block;
       border: 3px solid var(--color-marca, #B7374D);
       border-radius: var(--radio-borde, 10px);
       background-color: var(--color-fondo, #F5F8FF);
       color: var(--color-texto, #283651);
       overflow: hidden;
       box-shadow: 0 12px 30px rgba(65, 78, 138, 0.24);
     }

     :host([destacado]) {
       border-width: 4px;
     }

     .tarjeta {
       display: flex;
       flex-direction: var(--direccion, row);
       min-height: var(--alto, 360px);
       background-image: linear-gradient(
         125deg,
         transparent 60%,
         rgba(88, 117, 220, 0.08)
       );
     }

     .foto {
       flex: 1;
       display: flex;
       align-items: center;
       justify-content: center;
       background-color: var(--color-panel, #DCEBFF);
       background-image: repeating-linear-gradient(
         0deg,
         transparent 0,
         transparent 22px,
         rgba(62, 125, 207, 0.10) 22px,
         rgba(62, 125, 207, 0.10) 24px
       );
       padding: 20px;
     }

     .informacion {
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: center;
       padding: 28px;
       border-left: 4px solid var(--color-marca, #B7374D);
     }

     ::slotted(img) {
       display: block;
       width: 100%;
       max-width: 340px;
       height: 240px;
       object-fit: contain;
     }

     ::slotted(h3) {
       font-family: 'Arial Black', Arial, sans-serif;
       text-transform: uppercase;
       font-size: 27px;
       letter-spacing: 1px;
       color: var(--color-marca, #B7374D);
       margin: 0 0 12px;
     }

     ::slotted(p) {
       color: var(--color-texto, #283651);
       line-height: 1.5;
     }

     .etiqueta {
       align-self: flex-start;
       padding: 7px 12px;
       border-radius: 0;
       border-left: 4px solid var(--color-marca, #B7374D);
       background-color: var(--color-panel, #DCEBFF);
       font-size: 13px;
       font-weight: bold;
     }

     .precio {
       margin-top: 18px;
       margin-bottom: 18px;
       font-size: 26px;
       font-weight: bold;
       border-radius: 8px;
       padding: 10px 14px;
       background-color: var(--color-panel, #DCEBFF);
       color: var(--color-marca, #B7374D);
       width: fit-content;
     }

     button {
       align-self: flex-start;
       border: none;
       border-radius: 5px;
       padding: 12px 24px;
       background-color: var(--color-marca, #B7374D);
       color: var(--color-boton, white);
       font-size: 14px;
       font-weight: bold;
       transform: skew(-7deg);
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
 customElements.define("tarjeta-carlos", TarjetaProducto);