import { MonoBehaviour, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import { SnakeMovement } from "./snake-exports.js";

export class SnakeInput extends MonoBehaviour {
    #snakeMovement = null;

    awake() {
        this.#snakeMovement = this.gameObject.getComponent(SnakeMovement);
    }

    start() {
    }

    update() {
        if (Input.getKeyDown(KeyCode.w) && this.#snakeMovement.currentDirection.y != -1) {
            console.log('sdf')
            this.#snakeMovement.verticalAxis = 1;
            this.#snakeMovement.horizontalAxis = 0;
        } else if (Input.getKeyDown(KeyCode.s) && this.#snakeMovement.currentDirection.y != 1) {
            console.log('sdf')
            this.#snakeMovement.verticalAxis = -1;
            this.#snakeMovement.horizontalAxis = 0;
        } else if (Input.getKeyDown(KeyCode.a) && this.#snakeMovement.currentDirection.x != 1) {
            console.log('sdf')
            this.#snakeMovement.verticalAxis = 0;
            this.#snakeMovement.horizontalAxis = -1;
        } else if (Input.getKeyDown(KeyCode.d) && this.#snakeMovement.currentDirection.x != -1) {
            console.log('sdf')
            this.#snakeMovement.verticalAxis = 0;
            this.#snakeMovement.horizontalAxis = 1;
        }
    }
}