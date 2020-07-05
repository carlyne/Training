class SpinningDots extends HTMLElement {
    constructor () {
        super();
        const width = 50;
        // const circleRadius = 2;
        const root = this.attachShadow({mode: 'open'});

        root.innerHTML = `<div>
            ${this.buildStyle(width)}
        </div>`;
    }

    /**
     * Construit le style du loader
     * @param {number} w largeur de l'élément 
     * @returns {string}
     */
    buildStyle(w) {
        return `<style>
            div {
                width: ${w}px;
                height: ${w}px;
                background: chartreuse;
            }
        </style>`
    }
}

// ne pas bloquer script si navigateur supporte pas custom element
try {
    customElements.define('spinning-dots', SpinningDots) 
} catch (error) {
    if(e instanceof DOMException) {
        console.error('DOMException : ' + e.message)
    } else {
        throw e;
    }
}
