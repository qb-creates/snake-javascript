import Canvas from "../canvas.js";
import MonoBehaviour from "../MonoBehaviour.js";

const emptyCell = 'empty-cell';
const snakeBodyCell = 'snake-body-cell';
export default class SnakeMovement extends MonoBehaviour {
    
    constructor() {
        super();
        this.snake = [[7, 7], [8, 7], [9, 7]];
        this.tailIndex = 0;
        this.headIndex = 2;
        this.up = 0;
        this.left = 1;


        // Draw Player
        for (let i = 0; i < this.snake.length; i++) {
            Canvas.getInfo(this.snake[i][0], this.snake[i][1], "snake-body-cell");            
        }
        
    }
    Update() {
        let tailX = this.snake[this.tailIndex][0];
        let tailY = this.snake[this.tailIndex][1];
        let headX = this.snake[this.headIndex][0] + this.left;
        let headY = this.snake[this.headIndex][1] + this.up;
        
        Canvas.getInfo(tailX, tailY, emptyCell);
        this.snake[this.tailIndex][0] = headX;
        this.snake[this.tailIndex][1] = headY;

        Canvas.getInfo(headX, headY, snakeBodyCell);
        this.headIndex = this.tailIndex;
        this.tailIndex = this.tailIndex + 1;
        if (this.tailIndex == this.snake.length) {
            this.tailIndex = 0;
        }
    }
}