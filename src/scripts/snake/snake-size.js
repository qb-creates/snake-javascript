
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Cell } from "../../engine/qbcreates-js-engine.js";
import { snakeBodyColor } from "./snake-exports.js";

export class SnakeSize extends MonoBehaviour {
    #isGrowing = false;
    
    awake() {
    }

    start() {
    }

    update() {
    }

    get isGrowing() {
        return this.#isGrowing;
    }

    grow() {
        this.#isGrowing = true;
        let tailCoordinates = this.gameObject.cells[0].position;
        let nextTailCoordinates = this.gameObject.cells[1].position;

        let x = (tailCoordinates.x - nextTailCoordinates.x) + tailCoordinates.x;
        let y = (tailCoordinates.y - nextTailCoordinates.y) + tailCoordinates.y;

        let cell = new Cell(x, y, snakeBodyColor);
        this.gameObject.cells.unshift(cell);
        this.#isGrowing = false;
    }
}