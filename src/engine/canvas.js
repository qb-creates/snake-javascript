import { Time } from "./time.js";
import { GameStateManager } from "../scripts/managers/game-state-manager.js";

export class Canvas {
    static #canvas = null;
    static #context = null;
    static #ppu = 25;
    static #previousTimestamp = 0;
    static #gameObjectList = [];
    static event = new Event('canvasUpdate');
    static get canvasWidth() {
        return Canvas.#canvas.width;
    }

    static set canvasWidth(value) {
        Canvas.#canvas.width = value;
    }

    static get canvasHeight() {
        return Canvas.#canvas.height;
    }

    static set canvasHeight(value) {
        Canvas.#canvas.height = value;
    }

    static get ppu() {
        return this.#ppu;
    }

    static set ppu(value) {
        this.#ppu = value;
    }

    static get context() {
        return Canvas.#context;
    }

    constructor() {
        if (this instanceof Canvas) {
            throw new Error("A static class cannot be instantiated.");
        }
    }

    static configureCanvas(canvasWidth, canvasHeight, ppu) {
        this.#ppu = ppu;
        this.#canvas = document.createElement('canvas');
        this.#canvas.style = `border: 5px solid white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
        this.#canvas.width = canvasWidth;
        this.#canvas.height = canvasHeight;
        this.#context = this.#canvas.getContext('2d');
        this.#context.transform(1, 0, 0, -1, 0, canvasHeight); // flips the axis
        this.#context.translate(canvasWidth / 2, canvasHeight / 2);
        document.body.appendChild(this.#canvas);

        GameStateManager.gameStateEvent.subscribe(isStarted => {
            if (isStarted) {
                requestAnimationFrame(this.#updateCanvas);
            }
        });
    }



    static checkForCollisions(coordinates) {
        return this.#gameObjectList.filter((object) => {
            let result = false;
            object.cells.forEach(cell => {
                if (cell.position.x == coordinates.x && cell.position.y == coordinates.y) {
                    result = true;
                }
            });
            return result;
        })
    }

    static addGameObject(gameObject) {
        this.#gameObjectList.push(gameObject);
    }

    static removeGameObject(gameObject) {
        let index = this.#gameObjectList.indexOf(gameObject);
        this.#gameObjectList[index] = null;
        this.#gameObjectList.splice(index, 1);
        gameObject.cells.forEach(cell => {
            this.stageContainer.removeChild(cell.uiReference);
        })
    }

    static #updateCanvas = (timestamp) => {
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        if (true) {
            for (let i = -20; i < 20; i++) {
                for (let j = -20; j < 20; j++) {
                    this.#context.strokeStyle = 'gray';

                    this.#context.beginPath();
                    this.#context.roundRect(i * 25, j * 25, 75, 75, [0]);
                    this.#context.stroke();
                }
            }
        }

        this.asdf(this.#gameObjectList);
        // TODO set Time.delta dime equal to timestamp - previousTimestamp
        this.#previousTimestamp = timestamp;
        dispatchEvent(Canvas.event);
        requestAnimationFrame(this.#updateCanvas);

    }

    static asdf(gameObjects) {
        gameObjects.forEach(gameObject => {
            if (gameObject.children.length > 0) {
                this.asdf(gameObject.children);
            }
            
            gameObject.getComponent(Sprite).forEach( sprite => {
                sprite.image();
            });
        });
    }
}