import SnakeMovement from "./snake-movement.js";
import SnakeInput from "./snake-input.js";

export default class SnakeGameObject {
    #scriptList = new Map();
    #position = [[7, 7], [8, 7], [9, 7]];
    constructor() {
        this.snakeMovement = new SnakeMovement();
        this.snakeMovement.gameObject = this;
    
        this.snakeController = new SnakeInput();
        this.snakeController.gameObject = this;
        this.#scriptList.set(SnakeMovement.className, this.snakeMovement);
        this.#scriptList.set(SnakeInput.className, this.snakeController);        
    }
        
    get scriptList() {
        return this.#scriptList;
    }

    set position(newPosition) {
        this.#position = newPosition;
    }

    get position() {
        return this.#position;
    }
} 