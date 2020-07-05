class SpinningDots extends HTMLElement {
    constructor () {
        super();
        const width = 50;
        const circleRadius = 4;
        const circles = parseInt(this.getAttribute('dots'), 10) || 8;
        const stroke = (circleRadius * 2);
        const root = this.attachShadow({mode: 'open'});

        root.innerHTML = `<div>
            ${this.buildStyle(width, stroke, circles)}
            ${this.buildTrainee((width / 2 - circleRadius), stroke)}
            ${this.buildCircles(width, circles, circleRadius)}
        </div>`;
    }

    /**
     * Construit la trainee du loader
     * @param {number} r rayon du cercle
     * @param {number} stroke epaisseur du trait
     * @returns {string}
     */
    buildTrainee(r, stroke) {
        const w = r * 2 + stroke;
        let dom = `<svg class="trainee" width="${w}" height="${w}" viewBox="0 0 ${w} ${w}" fill="none">`;

        dom += `<circle 
            cx="${w / 2}" 
            cy="${w / 2}" r="${r}" 
            stroke="currentColor"
            stroke-width="${stroke}"
            stroke-linecap="round"  
        />`;

        return dom + `</svg>`;
    }

    /**
     * Construitun SVG contenant les différents cercles
     * @param {number} w largeur SVG
     * @param {number} n Nombre de cercles
     * @param {number} r Rayon de chaque cercle
     * @returns {string}
     */
    buildCircles(w, n, r) {
        let dom = `<svg 
            class="circles" 
            width="${w}" 
            height="${w}" 
            viewBox="0 0 ${w} ${w}"
            >`;

        const radius = (w / 2 - r);

        for (let i = 0; i < n; i++) {
            const angle = i * (Math.PI * 2) / n;
            const x = radius * Math.sin(angle) + w / 2;
            const y = radius * Math.cos(angle) + w / 2;

            dom += `<circle 
                cx="${x}" 
                cy="${y}" 
                r="${r}" 
                fill="currentColor"
            />`;
        }

        return dom + `</svg>`;
    }

    /**
     * Construit le style du loader
     * @param {number} w largeur de l'élément
     * @param {number} stroke largeur du trait
     * @param {number} n nombre de sections
     * @returns {string}
     */
    buildStyle(w, stroke, n) {
        const perimeter = Math.PI * (w - stroke);

        return `<style>
            :host {
                display: inline-block;
            }

            div {
                width: ${w}px;
                height: ${w}px;
                position: relative;
            }

            svg {
                position: absolute;
                top: 0;
                left: 0;
            }

            .circles {
                animation: spin 16s linear infinite;
            }

            @keyframes spin {
                from {transform: rotate(0 deg)}
                to {transform: rotate(360deg)}
            }

            .trainee {
                stroke-dasharray: ${perimeter};
                stroke-dashoffset: ${perimeter + (perimeter / n)};
                animation: spin-trainee 1.6s cubic-bezier(.5, .15, .5, .85) infinite;
            }

            .trainee circle {
                animation: trainee-variation 1.6s cubic-bezier(.5, .15, .5, .85) infinite
            }

            @keyframes spin-trainee {
                from {transform: rotate(0 deg)}
                to {transform: rotate(720deg)}
            }

            @keyframes trainee-variation {
                from% {stroke-dashoffset: ${perimeter + (perimeter / n)}}
                50% {stroke-dashoffset: ${perimeter + (2.5 * (perimeter / n))}}
                100% {stroke-dashoffset: ${perimeter + (perimeter / n)}}
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
