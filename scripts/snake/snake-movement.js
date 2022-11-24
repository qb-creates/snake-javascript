import Canvas from "../canvas.js";
import MonoBehaviour from "../MonoBehaviour.js";

const emptyCell = 'empty-cell';
const snakeBodyCell = 'snake-body-cell';
export default class SnakeMovement extends MonoBehaviour {
    #snake = [[7, 7], [8, 7], [9, 7]];
    #up = 0;
    #left = 1;
    #tailIndex = 0;
    #headIndex = 2;



    set left(newLeft) {
        this.#left = newLeft
    }

    set up(newUp) {
        this.#up = newUp;
    }

    Start() {
         console.log("start test");
         // Draw Player
         for (let i = 0; i < this.#snake.length; i++) {
            Canvas.getInfo(this.#snake[i][0], this.#snake[i][1], "snake-body-cell");
        }
    }

    Update() {
        console.log("")
        let tailX = this.#snake[this.#tailIndex][0];
        let tailY = this.#snake[this.#tailIndex][1];
        let headX = this.#snake[this.#headIndex][0] + this.#left;
        let headY = this.#snake[this.#headIndex][1] + this.#up;

        Canvas.getInfo(tailX, tailY, emptyCell);
        this.#snake[this.#tailIndex][0] = headX;
        this.#snake[this.#tailIndex][1] = headY;

        Canvas.getInfo(headX, headY, snakeBodyCell);
        this.#headIndex = this.#tailIndex;
        this.#tailIndex = this.#tailIndex + 1;
        if (this.#tailIndex == this.#snake.length) {
            this.#tailIndex = 0;
        }
    }
}