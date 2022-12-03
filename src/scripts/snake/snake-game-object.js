import { SnakeCollision, SnakeInput, SnakeMovement, SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";
import { Canvas, Cell } from "../../engine/qbcreates-js-engine.js";

export class SnakeGameObject {
    #scriptList = new Map();
    #isDestroyed = false;
    #cells = []

    static get className() {
        return this.name;
    }

    get isDestroyed() {
        return this.#isDestroyed;
    }

    set cells(newCells) {
        this.#cells = newCells;
    }

    get cells() {
        return this.#cells;
    }

    constructor() {

        // Build snake body;
        for (let i = 7; i < 10; i++) {
            let options = {
                usePixelScale: true,
                x: i,
                y: 7,
                color: i == 9 ? snakeHeadColor : snakeBodyColor
            }

            let cell = new Cell(options.x, options.y, options.color);
            this.#cells.push(cell);
        }

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