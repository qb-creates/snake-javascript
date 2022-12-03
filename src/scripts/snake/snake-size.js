
import { MonoBehaviour, Canvas, Time, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import { snakeBodyColor } from "./snake-exports.js";

export class SnakeSize extends MonoBehaviour {

    awake() {
    }

    start() {
    }

    update() {
    }

    grow() {
        let tailCoordinates = Canvas.getCellCoordinates(this.gameObject.cells[0]);
        let nextTailCoordinates = Canvas.getCellCoordinates(this.gameObject.cells[1]);

        let x = (tailCoordinates.x - nextTailCoordinates.x) + tailCoordinates.x;
        let y = (tailCoordinates.y - nextTailCoordinates.y) + tailCoordinates.y;
       
        let options = {
            x: x,
            y: y,
            color: snakeBodyColor,
        }
        let cell = Canvas.createCell(options);
        this.gameObject.cells.unshift(cell);
    }
}