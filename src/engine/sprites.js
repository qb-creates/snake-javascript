import { Canvas } from "./canvas.js"

export class Sprite {
    #gameObject = null;
    #image = () => { };
    #color = 'blue';
    
    set gameObject(gameObject) {
        if (this.#gameObject == null) {
            this.#gameObject = gameObject;
        }
    }

    get gameObject() {
        return this.#gameObject;
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        this.#image = value;
    }

    get color() {
        return this.#color;
    }

    set color(value) {
        this.#color = value
    }
}
export function square(x, y, color, scale = 1) {
    let w = Canvas.ppu * scale;
    let h = Canvas.ppu * scale;

    x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
    y = (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);

    Canvas.context.fillStyle = color;
    Canvas.context.strokeStyle = 'transparent';
    Canvas.context.beginPath();
    Canvas.context.roundRect(x, y, w, h, 5);
    Canvas.context.stroke();
    Canvas.context.fill();
}