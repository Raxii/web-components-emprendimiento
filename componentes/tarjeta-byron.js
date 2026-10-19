
export class TarjetaProducto extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    getTemplate() {
        const template = document.createElement("template");

        template.innerHTML = `
            <article>
                <div class="foto">
                    <slot name="foto"></slot>
                </div>

                <div class="contenido">

                    <div class="nombre">
                        <slot name="nombre"></slot>
                    </div>

                    <div class="descripcion">
                        <slot>Sin descripción</slot>
                    </div>

                    <div class="precio">
                        $<span id="precio">0.00</span>
                    </div>

                </div>
            </article>

            ${this.getStyles()}
        `;

        return template;
    }
    getStyles() {
        const style = document.createElement("style");

        style.innerHTML = `
            :host {
                display: block;
                border: 2px solid var(--color-marca, #2F6B45);
                border-radius: 14px;
                overflow: hidden;
                background: #ffffff;
                box-shadow: 0 8px 22px rgba(0, 0, 0, 0.10);
                height: 100%;
            }

            :host([destacado]) {
                border-width: 4px;
            }

            article {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .foto {
                background: #f6f7f4;
                min-height: 190px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px;
            }

            ::slotted([slot="foto"]) {
                width: 100%;
                max-width: 260px;
                height: 180px;
                object-fit: contain;
            }

            .contenido {
                padding: 18px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                flex: 1;
            }

            .nombre {
                color: var(--color-marca, #2F6B45);
                min-height: 34px;
            }

            ::slotted([slot="nombre"]) {
                margin: 0;
                font-size: 1.2rem;
            }

            .descripcion {
                color: #4c5650;
                line-height: 1.45;
                min-height: 48px;
            }

            .precio {
                margin-top: auto;
                font-size: 1.35rem;
                font-weight: 700;
                color: var(--color-marca, #2F6B45);
            }
        `;

        return style.outerHTML;
    }

    render() {
        if (this.shadowRoot.childNodes.length == 0) {
            this.shadowRoot.appendChild(
                this.getTemplate().content.cloneNode(true)
            );
        }
    }

    connectedCallback() {
        this.render();
        this.actualizarPrecio();
    }

    static get observedAttributes() {
        return ["precio"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "precio") {
            this.actualizarPrecio();
        }
    }
    actualizarPrecio() {
        const texto = this.shadowRoot.getElementById("precio");

        if (texto != null) {
            let precio = Number(this.getAttribute("precio"));

            if (isNaN(precio)) {
                precio = 0;
            }

            texto.textContent = precio.toFixed(2);
        }
    }
    get precio() {
        return Number(this.getAttribute("precio"));
    }

    set precio(valor) {
        this.setAttribute("precio", valor);
    }
}

customElements.define("tarjeta-producto", TarjetaProducto);
