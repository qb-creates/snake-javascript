import { MonoBehaviour, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import { SnakeMovement } from "./snake-exports.js";

export class SnakeInput extends MonoBehaviour {
    #snakeMovement = null;
    #previousKey = KeyCode.d;
    #clearToMove = [0, 0];

    set clearToMove(newClearToMove) {
        this.#clearToMove = newClearToMove();
    }

    awake() {
        this.#snakeMovement = this.gameObject.getComponent(SnakeMovement.className);
    }

    start() {
    }

    update() {
        if (Input.getKeyDown(KeyCode.q)) {
            this.gameObject.destroy();
        }
        if (true) {
            this.#clearToMove = this.gameObject.position[this.gameObject.position.length - 1];
            if (Input.getKeyDown(KeyCode.w) && this.#previousKey != KeyCode.s) {
                this.#snakeMovement.verticalAxis = 1;
                this.#snakeMovement.horizontalAxis = 0;
                this.#previousKey = KeyCode.w;
            } else if (Input.getKeyDown(KeyCode.s) && this.#previousKey != KeyCode.w) {
                this.#snakeMovement.verticalAxis = -1;
                this.#snakeMovement.horizontalAxis = 0;
                this.#previousKey = KeyCode.s;
            } else if (Input.getKeyDown(KeyCode.a) && this.#previousKey != KeyCode.d) {
                this.#snakeMovement.verticalAxis = 0;
                this.#snakeMovement.horizontalAxis = -1;
                this.#previousKey = KeyCode.a;
            } else if (Input.getKeyDown(KeyCode.d) && this.#previousKey != KeyCode.a) {
                this.#snakeMovement.verticalAxis = 0;
                this.#snakeMovement.horizontalAxis = 1;
                this.#previousKey = KeyCode.d;
            }

        }
    }
}