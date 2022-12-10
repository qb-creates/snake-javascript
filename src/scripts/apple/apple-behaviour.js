
import { MonoBehaviour, Canvas, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import { ScoreManager } from "../managers/score-manager.js";
import { SnakeGameObject, SnakeSize } from "../snake/snake-exports.js";
import AppleGameObject from "./apple-game-object.js";

const appleColor = 'radial-gradient(blue 45%, #9BBA5A 45%)';

export default class AppleBehaviour extends MonoBehaviour {

    awake() {
        while (true) {
            let x = Math.floor(Math.random() * Canvas.canvasWidth );
            let y = Math.floor(Math.random() * Canvas.canvasHeight );

            let collisionList = Canvas.checkForCollisions({ x: x, y: y });
            let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));

            if (snakeGameObject == null) {
                let cell = new Cell(x, y, appleColor);
                this.gameObject.cells.push(cell);
                return;
            }
        }
    }

    start() {
    }

    update() {
        let cellCoordinates = this.gameObject.cells[0].position;
        let collisionList = Canvas.checkForCollisions({ x: cellCoordinates.x, y: cellCoordinates.y });
        let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));

        if (snakeGameObject != null) {
            this.gameObject.destroy();

            let snakeSize = snakeGameObject.getComponent(SnakeSize.className);
            snakeSize.grow();

            let appleGameObject = new AppleGameObject();
            //Canvas.addGameObject(appleGameObject);
            ScoreManager.addPoint();
        }
    }
}