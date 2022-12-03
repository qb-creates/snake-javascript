import { SnakeCollision, SnakeInput, SnakeMovement, SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";
import { Canvas } from "../../engine/canvas.js";

export class SnakeGameObject {
    #scriptList = new Map();
    #position = [[7, 7, snakeBodyColor], [8, 7, snakeBodyColor], [9, 7, snakeHeadColor]];
    #isDestroyed = false;

    static get className() {
        return this.name;
    }

    get isDestroyed() {
        return this.#isDestroyed;
    }

    set position(newPosition) {
        this.#position = newPosition;
    }
    
    get position() {
        return this.#position;
    }

    constructor() {
        this.snakeMovement = new SnakeMovement();
        this.snakeMovement.gameObject = this;

        this.snakeCollision = new SnakeCollision();
        this.snakeCollision.gameObject = this;

        this.snakeController = new SnakeInput();
        this.snakeController.gameObject = this;

        this.snakeSize = new SnakeSize();
        this.snakeSize.gameObject = this;

        this.#scriptList.set(SnakeMovement.className, this.snakeMovement);
        this.#scriptList.set(SnakeInput.className, this.snakeController);        
        this.#scriptList.set(SnakeCollision.className, this.snakeCollision);
        this.#scriptList.set(SnakeSize.className, this.snakeSize);
    }

    addComponent(key, component) {
        component.gameObject = this;
        this.#scriptList.set(key, component);
    }

    getComponent(key) {
        return this.#scriptList.get(key);
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            console.log(component);
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 