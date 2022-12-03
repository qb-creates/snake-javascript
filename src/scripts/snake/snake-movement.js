import { Canvas, MonoBehaviour, Time } from "../../engine/qbcreates-js-engine.js";
import { SnakeCollision, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";

export class SnakeMovement extends MonoBehaviour {
    #snakeCollision
    #verticalAxis = 0;
    #horizontalAxis = 1;
    #playerMoveTime = .11;
    #movePlayerTimer = 0;

    set horizontalAxis(newHorizontalAxis) {
        this.#horizontalAxis = newHorizontalAxis
    }

    set verticalAxis(newVerticalAxis) {
        this.#verticalAxis = newVerticalAxis;
    }

    awake() {
        this.#snakeCollision = this.gameObject.getComponent(SnakeCollision.className);
    }

    start() {

    }

    update() {
        this.#movePlayerTimer += Time.fixedDeltaTime;

        if (this.#movePlayerTimer >= this.#playerMoveTime) {
            let canMove = this.#snakeCollision.checkForCollisions(this.#horizontalAxis, this.#verticalAxis);

            if (canMove) {
                let headIndex = this.gameObject.cells.length - 1
                let coordinates = Canvas.getCellCoordinates(this.gameObject.cells[headIndex]); 
                let headX = coordinates.x + (this.#horizontalAxis * Canvas.pixelScale);
                let headY = coordinates.y + (this.#verticalAxis * Canvas.pixelScale);
           
                this.gameObject.cells[0].style.left = `${headX}px`;
                this.gameObject.cells[0].style.bottom = `${headY}px`;
                this.gameObject.cells[0].style.backgroundImage = snakeHeadColor;
                this.gameObject.cells[headIndex].style.backgroundImage = snakeBodyColor;
                this.gameObject.cells.push(this.gameObject.cells.shift());
                this.#movePlayerTimer = 0;
            }
        }
    }
}