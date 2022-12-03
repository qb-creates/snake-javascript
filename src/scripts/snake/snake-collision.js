import { MonoBehaviour, Input, KeyCode, Canvas } from "../../engine/qbcreates-js-engine.js";

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
        let headIndex = this.gameObject.cells.length - 1;
        let headCoordinates = Canvas.getCellCoordinates(this.gameObject.cells[headIndex]);

        if (headCoordinates.x >= Canvas.gridSizeX - Canvas.pixelScale) {
            this.#canGoRight = false;
        } else {
            this.#canGoRight = true;
        }

        if (headCoordinates.x <= 0) {
            this.#canGoLeft = false;
        } else {
            this.#canGoLeft = true;
        }

        if (headCoordinates.y >= Canvas.gridSizeY - Canvas.pixelScale) {
            this.#canGoUp = false;
        } else {
            this.#canGoUp = true;
        }

        if (headCoordinates.y <= 0) {
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