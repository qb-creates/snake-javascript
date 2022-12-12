
import { MonoBehaviour, Canvas, Input, KeyCode, Vector2, BoxCollider, SpriteRenderer } from "../../engine/qbcreates-js-engine.js";
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
        this.gameObject.getComponent(SpriteRenderer).color = 'transparent';
        let x = Math.floor(Math.random() * (Canvas.canvasWidth / (Canvas.ppu * 2)));
        let y = Math.floor(Math.random() * (Canvas.canvasHeight / (Canvas.ppu * 2)));
        this.transform.position = new Vector2(x, y);
    }

    start() {
    }

    update() {
        // let cellCoordinates = this.gameObject.cells[0].position;
        // let collisionList = Canvas.checkForCollisions({ x: cellCoordinates.x, y: cellCoordinates.y });
        // let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));

        // if (snakeGameObject != null) {
        //     this.gameObject.destroy();

        //     let snakeSize = snakeGameObject.getComponent(SnakeSize.className);
        //     snakeSize.grow();

        //     let appleGameObject = new AppleGameObject();
        //     //Canvas.addGameObject(appleGameObject);
        //     ScoreManager.addPoint();
        // }
    }
}