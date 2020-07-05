class SpinningDots extends HTMLElement {
    constructor () {
        super();
        const width = 50;
        const circleRadius = 4;
        const circles = 8;
        const root = this.attachShadow({mode: 'open'});

        root.innerHTML = `<div>
            ${this.buildStyle(width)}
            ${this.buildCircles(width, circles, circleRadius)}
        </div>`;
    }

    /**
     * Construitun SVG contenant les différents cercles
     * @param {number} w largeur SVG
     * @param {number} n Nombre de cercles
     * @param {number} r Rayon de chaque cercle
     * @returns {string}
     */
    buildCircles(w, n, r) {
        let dom = `<svg class="circles" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}">`;
        const radius = (w / 2 - r);

        for (let i = 0; i < n; i++) {
            const angle = i * (Math.PI * 2) / n;
            const x = radius * Math.sin(angle) + w / 2;
            const y = radius * Math.cos(angle) + w / 2;

            dom += `<circle cx="${x}" cy="${y}" r="${r}" fill="currentColor"/>`;
        }

        return dom + `</svg>`;
    }

    /**
     * Construit le style du loader
     * @param {number} w largeur de l'élément 
     * @returns {string}
     */
    buildStyle(w) {
        return `<style>
            :host {
                display: inline-block;
            }

            div {
                width: ${w}px;
                height: ${w}px;
                background: chartreuse;
            }

            .circles {
                animation: spin 16s linear infinite;
            }

            @keyframes spin {
                from {transform: rotate(0 deg)}
                to {transform: rotate(360deg)}
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
