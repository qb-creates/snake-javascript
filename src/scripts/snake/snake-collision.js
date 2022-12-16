import { MonoBehaviour, Input, KeyCode, Canvas } from "../../engine/qbcreates-js-engine.js";
import { GameStateManager } from "../managers/game-state-manager.js";

export class SnakeCollision extends MonoBehaviour {
    #canGoLeft = true;
    #canGoRight = true;
    #canGoUp = true;
    #canGoDown = true;

    awake() {
    }

    start() {
    }
    
    update() {
    }


    onTriggerEnter(colliders) {
        colliders.forEach(collider => {
            console.log(collider.gameObject.objectName);
            if (collider.gameObject.objectName.includes('snake')) {
                if (this.gameObject.parent.children[this.gameObject.parent.children.length - 1] == this.gameObject) {
                    GameStateManager.onGameOver();
                }
                return;
            } else if (collider.gameObject.objectName.includes('border')) {
                GameStateManager.onGameOver();
            }
        })
    }
}