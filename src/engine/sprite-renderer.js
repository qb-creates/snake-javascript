import { Canvas } from "./canvas.js"
import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";

export class SpriteRenderer extends Component {
    sprite = () => { };
    color = 'blue';

    constructor(gameObject) {
        super(gameObject);
    }

    clone(renderer) {
        renderer.sprite = this.sprite;
        renderer.color = this.color;
    }
}

export function square(x, y, color, borderColor, scale = new Vector2(1, 1)) {
    let w = Canvas.ppu * scale.x;
    let h = Canvas.ppu * scale.y;

    x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
    y = (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);

    Canvas.context.fillStyle = color;
    Canvas.context.strokeStyle = borderColor;
    Canvas.context.beginPath();
    Canvas.context.roundRect(x - (Canvas.ppu / 2) , y - (Canvas.ppu / 2), w , h, 5);
    Canvas.context.stroke();
    Canvas.context.fill();
}