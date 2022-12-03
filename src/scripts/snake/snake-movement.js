import { Canvas, MonoBehaviour, Time, Cell } from "../../engine/qbcreates-js-engine.js";
import { SnakeCollision, SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";

export class SnakeMovement extends MonoBehaviour {
    #snakeCollision
    #snakeSize
    #verticalAxis = 0;
    #horizontalAxis = 1;
    #playerMoveTime = .11;
    #movePlayerTimer = 0;

    set horizontalAxis(newHorizontalAxis) {
        this.#horizontalAxis = newHorizontalAxis;
    }

    set verticalAxis(newVerticalAxis) {
        this.#verticalAxis = newVerticalAxis;
    }

    awake() {
        this.#snakeCollision = this.gameObject.getComponent(SnakeCollision.className);
        this.#snakeSize = this.gameObject.getComponent(SnakeSize.className);
    }

    start() {

    }

    update() {
        this.#movePlayerTimer += Time.fixedDeltaTime;

        if (this.#movePlayerTimer >= this.#playerMoveTime) {
            let canMove = this.#snakeCollision.checkForCollisions(this.#horizontalAxis, this.#verticalAxis);

            if (canMove && !this.#snakeSize.isGrowing) {

                let headIndex = this.gameObject.cells.length - 1
                let coordinates = this.gameObject.cells[headIndex].position;
                let headX = coordinates.x + this.#horizontalAxis;
                let headY = coordinates.y + this.#verticalAxis;
                
                this.gameObject.cells[0].position = { x: headX, y: headY };
                this.gameObject.cells[0].color = snakeHeadColor;
                this.gameObject.cells[headIndex].color = snakeBodyColor;
                this.gameObject.cells.push(this.gameObject.cells.shift());
                this.#movePlayerTimer = 0;
            }
        }
    }
}