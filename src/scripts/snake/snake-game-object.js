import { SnakeCollision, SnakeInput, SnakeMovement, SnakeSize, snakeHeadColor, snakeBodyColor } from "./snake-exports.js";
import { Canvas, Vector2 } from "../../engine/qbcreates-js-engine.js";
import { square } from "../../engine/sprite-renderer.js"
export class SnakeGameObject {
    #objectName = '';
    #scriptList = [];
    #children = [];
    #isDestroyed = false;

    get objectName() {
        return this.#objectName;
    }

    set objectName(value) {
        this.#objectName = value;
    }

    get isDestroyed() {
        return this.#is1Destroyed;
    }

    get children() {
        return this.#children;
    }

    constructor(objectName) {
        this.#objectName = objectName;
        // let body = new SnakeGameObject();
        // body.sprite = () => {
        //     body.position = new Vector2(0, 0);
        //     square(body.position.x, body.position.y, body.color);
        // }
        // this.#children.push(new SnakeGameObject());

        // body = new SnakeGameObject();
        // body.sprite = () => {
        //     body.position = new Vector2(1, 0);
        //     square(body.position.x, body.position.y, body.color);
        // }
        // this.#children.push(new SnakeGameObject());

        // body = new SnakeGameObject();
        // body.sprite = () => {
        //     body.position = new Vector2(2, 0);
        //     square(body.position.x, body.position.y, body.color);
        // }
        // this.#children.push(new SnakeGameObject());

        // this.#sprite = () => {
        //     square(this.#position.x, this.#position.y, this.#color);
        // }
        // this.#scale = new Vector2(w, h);
        // this.#position = new Vector2(x, y);

        // this.snakeMovement = new SnakeMovement();
        // this.snakeMovement.gameObject = this;

        // this.snakeCollision = new SnakeCollision();
        // this.snakeCollision.gameObject = this;

        // this.snakeController = new SnakeInput();
        // this.snakeController.gameObject = this;

        // this.snakeSize = new SnakeSize();
        // this.snakeSize.gameObject = this;

        // this.#scriptList.set(SnakeMovement.className, this.snakeMovement);
        // this.#scriptList.set(SnakeInput.className, this.snakeController);
        // this.#scriptList.set(SnakeCollision.className, this.snakeCollision);
        // this.#scriptList.set(SnakeSize.className, this.snakeSize);
    }

    addGameObject(gameObject) {
        this.#children.push(gameObject);
    }

    getComponentInChildren() {

    }

    getComponent(componentClass) {
        return this.#scriptList.filter(component => component instanceof componentClass);
    }

    addComponent(component) {
        component.gameObject = this;
        this.#scriptList.push(component);
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 