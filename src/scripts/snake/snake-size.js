
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
        let x = (this.gameObject.position[0][0] - this.gameObject.position[1][0]) + this.gameObject.position[0][0];
        let y = (this.gameObject.position[0][1] - this.gameObject.position[1][1]) + this.gameObject.position[0][1];
        this.gameObject.position.unshift([x, y, snakeBodyColor]);
    }
}