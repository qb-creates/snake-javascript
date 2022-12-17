import { SpriteRenderer } from "./sprite-renderer.js";
import { BoxCollider } from "./box-collider.js";
import { MonoBehaviour } from "./mono-behaviour.js";
import { QObject } from "./q-object.js";
import { Vector2 } from "./vector2.js";

export class Canvas {
    static canvasUpdate = new rxjs.Subject();
    static #canvas = null;
    static #context = null;
    static #ppu = 25;
    static #previousTimestamp = 0;
    static #gameObjectList = [];
    static #colliderList = [];
    static #mousePosition = new Vector2(0, 0);

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
        this.#canvas.height = value;
    }

    static get ppu() {
        return this.#ppu;
    }

    static set ppu(value) {
        this.#ppu = value;
    }

    static get context() {
        return this.#context;
    }

    static get mousePosition() {
        return this.#mousePosition;
    }

    constructor() {
        if (this instanceof Canvas) {
            throw new Error("A static class cannot be instantiated.");
        }
    }

    /**
     * Will set the size of the canvas and how many pixels are in one unit on the grid.
     * @param {number} canvasWidth - Width of the canvas in pixels. 
     * @param {number} canvasHeight - Height of the canvas in pixels.
     * @param {number} ppu - Pixels Per Unit.
     */
    static configureCanvas(canvasWidth, canvasHeight, ppu) {
        this.#ppu = ppu;
        this.#canvas = document.createElement('canvas');
        this.#canvas.style = `border: 0px solid white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
        this.#canvas.width = canvasWidth;
        this.#canvas.height = canvasHeight;
        this.#context = this.#canvas.getContext('2d');

        // Flips the Y axis. Makes it so that positive y values move north on the grid and negative values move south.
        this.#context.transform(1, 0, 0, -1, 0, canvasHeight);

        // Makes it so that (0, 0) is the center of our canvas
        this.#context.translate(canvasWidth / 2, canvasHeight / 2);

        // Will be used to track our mouse position on the canvas.
        this.#canvas.addEventListener("mousemove", function (evt) {
            let rect = Canvas.#canvas.getBoundingClientRect();

            // Find mouse X and Y coordinates on the canvas by subtracting the mouse's global 
            // X and Y coordinates from the left and top location of the canvas.
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);

            // Center the x coordinate in the screen by subtracting half of the canvas width from the x coordinate.
            x = (x - (Canvas.canvasWidth / 2)) / Canvas.ppu;

            // Center the y coordinate in the screen by subtracting half of the canvas height from the y coordinate.
            // Flip the y value direction by multiplying by -1.
            y = -1 * (y - (Canvas.canvasHeight / 2)) / Canvas.ppu;

            Canvas.#mousePosition = new Vector2(x, y);
        }, false);

        document.body.appendChild(this.#canvas);
        requestAnimationFrame(this.#updateCanvas);
    }

    /**
     * Adds a gameobject to the list of objects that need to be rendered.
     * @param {GameObject} gameObject - The object the needs to be rendered.
     */
    static addGameObject(gameObject) {
        this.#gameObjectList.push(gameObject);
    }

    /**
     * Will add the collider to the list of colliders that that are periodically compared against for collision detection.
     * @param {BoxCollider} collider - The collider that needs to be added to the collider list. 
     */
    static addCollider(collider) {
        this.#colliderList.push(collider);
    }

    /**
     * Removes a gameObject from the list of objects that need to be rendered
     * @param {GameObject} gameObject - The object that needs to be removed.
     */
    static removeGameObject(gameObject) {
        gameObject.getComponents(BoxCollider).forEach(collider => {
            let colliderIndex = this.#colliderList.indexOf(collider);

            if (colliderIndex >= 0) {
                this.#colliderList.splice(colliderIndex, 1);
            }
        });

        let gameObjectIndex = this.#gameObjectList.indexOf(gameObject);

        if (gameObjectIndex >= 0) {
            let gameObject = this.#gameObjectList.splice(gameObjectIndex, 1);

            gameObject[0].children.forEach(child => {
                QObject.destroy(child);
            });

            gameObject = null;
        }
    }

    static #updateCanvas = (timestamp) => {
        this.#context.clearRect(-this.#canvas.width / 2, -this.#canvas.height / 2, this.#canvas.width, this.#canvas.height);
        this.#renderSprites(this.#gameObjectList);
        this.#collisionCheck();
        this.#drawGrid();
        // TODO set Time.delta dime equal to timestamp - previousTimestamp
        // conasole.log(timestamp - this.#previousTimestamp);
        this.#previousTimestamp = timestamp;
        this.canvasUpdate.next();
        requestAnimationFrame(this.#updateCanvas);
    }

    static #drawGrid() {
        if (document.getElementById("grid").checked) {
            let cellCount = this.canvasHeight / (this.ppu * 2);

            for (let i = -cellCount; i < cellCount; i++) {
                for (let j = -cellCount; j < cellCount; j++) {
                    this.#context.strokeStyle = '#80808011';
                    this.#context.beginPath();
                    this.#context.roundRect(i * this.ppu, j * this.ppu, this.ppu, this.ppu, [0]);
                    this.#context.stroke();
                }
            }
        }
    }

    static #renderSprites(gameObjects) {

        // Sort the items by layer value.
        gameObjects.sort((gameObjectA, gameObjectB) => {
            return gameObjectA.layer - gameObjectB.layer;
        });

        // Render Sprites
        gameObjects.forEach((gameObject) => {
            let renderer = gameObject.getComponent(SpriteRenderer);

            if (renderer) {
                renderer.sprite(renderer);
            }
        });
    }

    static #collisionCheck() {
        this.#colliderList.forEach((collider) => {
            let count = collider.collisionList.size;

            for (let i = 0; i < this.#colliderList.length; i++) {
                if (collider != this.#colliderList[i]) {
                    collider.checkForCollision(this.#colliderList[i]);
                }
            }

            if (count < collider.collisionList.size) {
                collider.gameObject.getComponents(MonoBehaviour).forEach(mono => {
                    mono.onTriggerEnter(collider.collisionList);
                });
            } else if (count > collider.collisionList.size) {
                collider.gameObject.getComponents(MonoBehaviour).forEach(mono => {
                    mono.onTriggerExit(collider.collisionList);
                });
            }

            // Render Colliders
            if (document.getElementById("colliders").checked) {
                collider.render();
            }
        });
    }
}