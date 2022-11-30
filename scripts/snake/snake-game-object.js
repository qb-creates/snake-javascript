import SnakeMovement from "./snake-movement.js";
import SnakeInput from "./snake-input.js";
import SnakeCollision from "./snake-collision.js";
import { Canvas } from "../../engine/canvas.js";

export default class SnakeGameObject {
    #scriptList = new Map();
    #position = [[7, 7], [8, 7], [9, 7]];
    #color = '#424242';
    
    static get className() {
        return this.name;
    }

    set position(newPosition) {
        this.#position = newPosition;
    }
    
    get position() {
        return this.#position;
    }
    
    set color(newColor) {
        this.#color = newColor;
    }
    
    get color() {
        return this.#color;
    }

    constructor() {
        this.snakeMovement = new SnakeMovement();
        this.snakeMovement.gameObject = this;

        this.snakeCollision = new SnakeCollision();
        this.snakeCollision.gameObject = this;

        this.snakeController = new SnakeInput();
        this.snakeController.gameObject = this;

        this.#scriptList.set(SnakeMovement.className, this.snakeMovement);
        this.#scriptList.set(SnakeInput.className, this.snakeController);        
        this.#scriptList.set(SnakeCollision.className, this.snakeCollision);
    }

    addComponent(key, component) {
        component.gameObject = this;
        this.#scriptList.set(key, component);
    }

    getComponent(component) {
        return this.#scriptList.get(component);
    }

    destroy() {
        this.#scriptList.forEach(component => {
            console.log(component);
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 