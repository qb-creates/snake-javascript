import { Canvas } from "./qbcreates-js-engine.js";

export class Cell {
    #cell = null;

    constructor(x, y, color) {
        let cell = document.createElement('div');
        let size = `width: ${Canvas.pixelScale}px; height: ${Canvas.pixelScale}px; `;
        let position = `left: ${x * Canvas.pixelScale}px; bottom: ${y * Canvas.pixelScale}px; position: absolute; `
        let image = `background-image: ${color}; border-radius:5px;`
        cell.style = [size, position, image].join('');
        Canvas.stageContainer.appendChild(cell);
        this.#cell = cell;
    }

    /**
     * 
     */
    get position() {
        return {
            x: (this.#cell.offsetLeft / Canvas.pixelScale),
            y: ((Canvas.gridSizeY * Canvas.pixelScale) - this.#cell.offsetTop - Canvas.pixelScale) / Canvas.pixelScale
        }
    }
    get uiReference() {
        return this.#cell;
    }
    /**
     * @param {{x: number, y: number}} options 
     */
    set position(options) {
   
        this.#cell.style.left = `${options.x * Canvas.pixelScale}px`;
        this.#cell.style.bottom = `${options.y * Canvas.pixelScale}px`;
    }

    set color(color) {
        this.#cell.style.backgroundImage = color;
    }
}