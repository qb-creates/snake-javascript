import { Canvas, MonoBehaviour, Time } from "../../engine/qbcreates-js-engine.js";
import { SnakeCollision } from "./snake-exports.js";

export class SnakeMovement extends MonoBehaviour {
    #snakeCollision
    #verticalAxis = 0;
    #horizontalAxis = 1;
    #playerMoveTime = .1;
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
                let headIndex = this.gameObject.position.length - 1

                let headX = this.gameObject.position[headIndex][0] + this.#horizontalAxis;
                let headY = this.gameObject.position[headIndex][1] + this.#verticalAxis;

                this.gameObject.position[0][0] = headX;
                this.gameObject.position[0][1] = headY;
                this.gameObject.position.push(this.gameObject.position.shift());
                this.#movePlayerTimer = 0;
            }
        }
    }
}