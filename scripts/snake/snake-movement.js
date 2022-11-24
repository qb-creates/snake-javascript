import { MonoBehaviour, Canvas, Time, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";

const emptyCell = 'empty-cell';
const snakeBodyCell = 'snake-body-cell';
export default class SnakeMovement extends MonoBehaviour {
    #snake = [[7, 7], [8, 7], [9, 7]];
    #up = 0;
    #left = 1;
    #tailIndex = 0;
    #headIndex = 2;
    #playerMoveTime = .1;
    #movePlayerTimer = 0;

    set left(newLeft) {
        this.#left = newLeft
    }

    set up(newUp) {
        this.#up = newUp;
    }

    Start() {
        // Draw Player
        for (let i = 0; i < this.#snake.length; i++) {
            Canvas.updatePixel(this.#snake[i][0], this.#snake[i][1], "snake-body-cell");
        }
    }

    FixedUpdate() {
        this.#movePlayerTimer += Time.fixedDeltaTime;
        if (Input.getKeyDown(KeyCode.w)) {
            this.#up = 1;
            this.#left = 0;
        } else if (Input.getKeyDown(KeyCode.s)) {
            this.#up = -1;
            this.#left = 0;
        } else if (Input.getKeyDown(KeyCode.a)) {
            this.#up = 0;
            this.#left = -1;
        } else if (Input.getKeyDown(KeyCode.d)) {
            this.#up = 0;
            this.#left = 1;
        }

        if (this.#movePlayerTimer >= this.#playerMoveTime) {
            let tailX = this.#snake[this.#tailIndex][0];
            let tailY = this.#snake[this.#tailIndex][1];
            let headX = this.#snake[this.#headIndex][0] + this.#left;
            let headY = this.#snake[this.#headIndex][1] + this.#up;

            Canvas.updatePixel(tailX, tailY, emptyCell);
            this.#snake[this.#tailIndex][0] = headX;
            this.#snake[this.#tailIndex][1] = headY;

            Canvas.updatePixel(headX, headY, snakeBodyCell);
            this.#headIndex = this.#tailIndex;
            this.#tailIndex = this.#tailIndex + 1;

            if (this.#tailIndex == this.#snake.length) {
                this.#tailIndex = 0;
            }

            this.#movePlayerTimer = 0;
        }
    }
}