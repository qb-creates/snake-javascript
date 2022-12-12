
import { MonoBehaviour, Canvas, Input, KeyCode, Vector2, BoxCollider, SpriteRenderer, Object } from "../../engine/qbcreates-js-engine.js";
import { ScoreManager } from "../managers/score-manager.js";
import { SnakeSize } from "../snake/snake-exports.js";

export default class AppleBehaviour extends MonoBehaviour {

    awake() {
        // while (true) {
        //     let x = Math.floor(Math.random() * Canvas.canvasWidth );
        //     let y = Math.floor(Math.random() * Canvas.canvasHeight );

        //     let collisionList = Canvas.checkForCollisions({ x: x, y: y });
        //     let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));

        //     if (snakeGameObject == null) {
        //         let cell = new Cell(x, y, appleColor);
        //         this.gameObject.cells.push(cell);
        //         return;
        //     }
        // }
        let w = (Canvas.canvasWidth / (Canvas.ppu * 2) - 1);
        let h = (Canvas.canvasHeight / (Canvas.ppu * 2) - 1);
        let x = Math.floor(Math.random() * (w * (Math.round(Math.random()) > 0 ? 1 : -1)));
        let y = Math.floor(Math.random() * (h * (Math.round(Math.random()) > 0 ? 1 : -1)));

        this.transform.position = new Vector2(x, y);
    }

    start() {
    }

    update() {
    }

    onTriggerEnter(colliders) {
        colliders.forEach(collider => {
            if (collider.gameObject.objectName.includes('snake')) {
                ScoreManager.addPoint();
                collider.gameObject.parent.getComponent(SnakeSize).grow();
                Object.instantiate(this.gameObject);
                this.gameObject.destroy();
                return;
            }
        })
    }
}