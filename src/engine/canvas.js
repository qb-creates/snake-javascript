import { Time } from "./time.js";
import { SpriteRenderer } from "./sprite-renderer.js";
import { BoxCollider } from "./box-collider.js";
import { MonoBehaviour } from "./mono-behaviour.js";

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

    static removeGameObject(gameObject) {
        let index = this.#gameObjectList.indexOf(gameObject);

        if (index >= 0) {
            this.#gameObjectList[index].children.forEach(child => {
                child.destroy();
            });

            this.#gameObjectList[index] = null;
            this.#gameObjectList.splice(index, 1);
        }
    }

    static #updateCanvas = (timestamp) => {
        this.#context.clearRect(-this.#canvas.width / 2, -this.#canvas.height / 2, this.#canvas.width, this.#canvas.height);

        if (false) {
            for (let i = -20; i < 20; i++) {
                for (let j = -20; j < 20; j++) {
                    this.#context.strokeStyle = '#80808011';

                    this.#context.beginPath();
                    this.#context.roundRect(i * 25, j * 25, 75, 75, [0]);
                    this.#context.stroke();
                }
            }
        }

        this.#renderSprites(this.#gameObjectList);
        // TODO set Time.delta dime equal to timestamp - previousTimestamp
        // console.log(timestamp - this.#previousTimestamp);
        this.#previousTimestamp = timestamp;
        dispatchEvent(Canvas.event);
        requestAnimationFrame(this.#updateCanvas);

    }

    static #renderSprites(gameObjects) {
        gameObjects.sort((gameObjectA, gameObjectB) => {
            return gameObjectA.layer - gameObjectB.layer;
        });

        gameObjects.forEach((gameObject, index) => {
            let renderer = gameObject.getComponent(SpriteRenderer);

            if (renderer) {
                renderer.sprite(renderer);
            }
            
            gameObject.getComponents(BoxCollider).forEach((collider) => {
                collider.render();
                gameObjects.forEach(gameObject2 => {
                    gameObject2.getComponents(BoxCollider).forEach(collider2 =>{
                        if(collider.test != collider2.test) {
                            if (collider.checkForCollision(collider2)) {
                                collider.gameObject.getComponents(MonoBehaviour).forEach(mono => {
                                    mono.onTriggerEnter(collider2);
                                })
                                collider2.gameObject.getComponents(MonoBehaviour).forEach(mono => {
                                    mono.onTriggerEnter(collider2);
                                })

                                gameObjects.forEach(asdf => {
  
                                    
                                    if (asdf.children.find(c => c == collider.gameObject) != 'undefined' || asdf.children.find(c => c == collider2.gameObject) != 'undefined') {
                                        
                                        asdf.getComponents(MonoBehaviour).forEach(mono => {
                                            
                                            mono.onTriggerEnter(collider2);
                                        })
                                    }
                                })
                            } else {
                            }
                        }
                    })
                });
                //collider.checkForCollisions()
            });
        });
    }
}