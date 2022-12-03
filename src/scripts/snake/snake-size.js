
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Cell } from "../../engine/qbcreates-js-engine.js";
import { snakeBodyColor } from "./snake-exports.js";

export class SnakeSize extends MonoBehaviour {
    #isGrowing = false;
    #isGrowingTimer = 0;

    get isGrowing() {
        return this.#isGrowing;
    }

    awake() {
    }

    start() {
    }

    update() {
        if (this.#isGrowingTimer > 0) {
            this.#isGrowingTimer -= Time.deltaTime;
            if (this.#isGrowingTimer <= 0) {
                this.#isGrowing = false;
            }
        }
    }

    grow() {
        this.#isGrowing = true;
        let tailCoordinates = this.gameObject.cells[0].position;
        let cell = new Cell(tailCoordinates.x, tailCoordinates.y, snakeBodyColor);
        this.gameObject.cells.unshift(cell);
        this.#isGrowingTimer = .09;
    }
}