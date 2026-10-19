// Componentes personalizados - FunkoMania
 // MATEO - Estilo oscuro

 // PASO 2 - Plantilla con Shadow DOM y slots
 const plantilla = document.createElement("template");

 plantilla.innerHTML = `
   <style>
     :host {
       display: block;
       border: 5px double var(--color-marca, #E35D6A);
       border-radius: var(--radio-borde, 10px);
       background-color: var(--color-fondo, #20191D);
       color: var(--color-texto, #F7EDEE);
       overflow: hidden;
       box-shadow: 0 0 26px rgba(227, 93, 106, 0.35);
     }

     :host([destacado]) {
       border-width: 7px;
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
       background-color: var(--color-panel, #33252A);
       background-image: radial-gradient(
         circle at center,
         rgba(227, 93, 106, 0.30),
         transparent 68%
       );
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
       font-family: Impact, 'Arial Narrow', sans-serif;
       text-transform: uppercase;
       font-size: 32px;
       letter-spacing: 3px;
       color: var(--color-marca, #E35D6A);
       text-shadow: 0 0 8px rgba(227, 93, 106, 0.60);
       margin: 0 0 12px;
     }

     ::slotted(p) {
       color: var(--color-texto, #F7EDEE);
       line-height: 1.5;
     }

     .etiqueta {
       align-self: flex-start;
       padding: 7px 12px;
       border: 1px solid var(--color-marca, #E35D6A);
       border-radius: 0;
       background-color: rgba(255, 255, 255, 0.10);
       color: var(--color-texto, #F7EDEE);
       font-size: 13px;
       letter-spacing: 1px;
     }

     .precio {
       margin-top: 18px;
       margin-bottom: 18px;
       font-size: 26px;
       font-weight: bold;
       color: var(--color-marca, #E35D6A);
     }

     button {
       align-self: flex-start;
       border: 2px solid var(--color-marca, #E35D6A);
       border-radius: 2px;
       padding: 12px 24px;
       background-color: transparent;
       color: var(--color-marca, #E35D6A);
       font-size: 14px;
       font-weight: bold;
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
 customElements.define("tarjeta-mateo", TarjetaProducto);