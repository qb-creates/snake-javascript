import { Canvas } from "./canvas.js"
import { Component } from "./component.js";
import { Transform } from "./transform.js";
import { Vector2 } from "./vector2.js";

export class SpriteRenderer extends Component {
    #sprite = () => { };
    #color = 'blue';
    #transform = null;

    get sprite() {
        return this.#sprite;
    }

    set sprite(value) {
        value(this);
        this.#sprite = value;
    }

    get color() {
        return this.#color;
    }

    set color(value) {
        this.#color = value
    }

    get transform() {
        return this.#transform;
    }

    constructor(gameObject) {
        super(gameObject);
        let transform = gameObject.getComponent(Transform);

        if (!transform) {
            throw new Error(`No transform attached to ${gameObject.objectName}`);
        }
        this.#transform = transform;
    }
}

export function square(x, y, color, scale = new Vector2(1, 1)) {
    let w = Canvas.ppu * scale.x;
    let h = Canvas.ppu * scale.y;

    x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
    y = (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);

    Canvas.context.fillStyle = color;
    Canvas.context.strokeStyle = 'transparent';
    Canvas.context.beginPath();
    Canvas.context.roundRect(x - (Canvas.ppu / 2) , y - (Canvas.ppu / 2), w , h, 5);
    Canvas.context.stroke();
    Canvas.context.fill();
}