import { MonoBehaviour, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import SnakeMovement from "./snake-movement.js";

export default class SnakeInput extends MonoBehaviour{
    #snakeMovement = null;
    #previousKey = null;

    awake() {
        this.#snakeMovement = this.gameObject.scriptList.get(SnakeMovement.className);
    }

    start() {
    }

    update() {
        if (Input.getKeyDown(KeyCode.w) && this.#previousKey != KeyCode.w) {
            this.#snakeMovement.up = 1;
            this.#snakeMovement.left = 0;
            this.#previousKey = KeyCode.w;
        } else if (Input.getKeyDown(KeyCode.s) && this.#previousKey != KeyCode.s) {
            this.#snakeMovement.up = -1;
            this.#snakeMovement.left = 0;
            this.#previousKey = KeyCode.s;
        } else if (Input.getKeyDown(KeyCode.a) && this.#previousKey != KeyCode.a) {
            this.#snakeMovement.up = 0;
            this.#snakeMovement.left = -1;
            this.#previousKey = KeyCode.a;
        } else if (Input.getKeyDown(KeyCode.d) && this.#previousKey != KeyCode.d) {
            this.#snakeMovement.up = 0;
            this.#snakeMovement.left = 1;
            this.#previousKey = KeyCode.d;
        }
    }
}