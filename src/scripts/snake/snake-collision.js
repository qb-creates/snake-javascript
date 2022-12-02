import { MonoBehaviour, Input, KeyCode, Canvas } from "../../engine/qbcreates-js-engine.js";
import AppleGameObject from "../apple/apple-game-object.js";

export class SnakeCollision extends MonoBehaviour{
    #canGoLeft = true;
    #canGoRight = true;
    #canGoUp = true;
    #canGoDown = true;

    awake() {
    }

    start() {
    }

    update() {
        let headX = this.gameObject.position[this.gameObject.position.length - 1][0];
        let headY = this.gameObject.position[this.gameObject.position.length - 1][1];

        if (headX >= Canvas.gridSizeX) {
            this.#canGoRight = false;
        } else {
            this.#canGoRight = true;
        }

        if (headX <= 0) {
            this.#canGoLeft = false;
        } else {
            this.#canGoLeft = true;
        }

        if (headY >= Canvas.gridSizeY) {
            this.#canGoUp = false;
        } else {
            this.#canGoUp = true;
        }

        if (headY <= 0) {
            this.#canGoDown = false;
        } else {
            this.#canGoDown = true;
        }
    }

    checkForCollisions(horizontalAxis, verticalAxis) {
        if (!this.#canGoRight && horizontalAxis == 1) {
            return false;
        } 
        if (!this.#canGoLeft && horizontalAxis == -1) {
            return false;
        } 
        if (!this.#canGoUp && verticalAxis == 1) {
            return false;
        } 
        if (!this.#canGoDown && verticalAxis == -1) {
            return false;
        }
        return true;
    }
}