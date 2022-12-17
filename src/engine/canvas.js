import { Time } from "./time.js";
import { SpriteRenderer } from "./sprite-renderer.js";
import { BoxCollider } from "./box-collider.js";
import { MonoBehaviour } from "./mono-behaviour.js";
import { GameStateManager } from "../scripts/managers/game-state-manager.js";
import { QObject } from "./q-object.js";
import { Component } from "./component.js";

export class Canvas {
    static #canvas = null;
    static #context = null;
    static #ppu = 25;
    static #previousTimestamp = 0;
    static #gameObjectList = [];
    static #colliderList = [];
    static #play = false;
    static canvasUpdate = new rxjs.Subject();
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
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this.#play = true;
        });

        this.#ppu = ppu;
        this.#canvas = document.createElement('canvas');
        this.#canvas.style = `border: 0px solid white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`;
        this.#canvas.width = canvasWidth;
        this.#canvas.height = canvasHeight;
        this.#context = this.#canvas.getContext('2d');
        this.#context.transform(1, 0, 0, -1, 0, canvasHeight); // flips the axis
        this.#context.translate(canvasWidth / 2, canvasHeight / 2);
        document.body.appendChild(this.#canvas);
        requestAnimationFrame(this.#updateCanvas);
    }

    static addGameObject(gameObject) {
        this.#gameObjectList.push(gameObject);
    }

    static addCollider(collider) {
        this.#colliderList.push(collider);
    }

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
        // console.log(timestamp - this.#previousTimestamp);
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