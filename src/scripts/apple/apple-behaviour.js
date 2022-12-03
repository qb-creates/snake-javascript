
import { MonoBehaviour, Canvas, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import { SnakeGameObject, SnakeSize } from "../snake/snake-exports.js";
import AppleGameObject from "./apple-game-object.js";

const appleColor = 'radial-gradient(blue 45%, #9BBA5A 45%)';

export default class AppleBehaviour extends MonoBehaviour {

    awake() {
        while (true) {
            let x = Math.floor(Math.random() * Canvas.gridSizeX);
            let y = Math.floor(Math.random() * Canvas.gridSizeY);

            let collisionList = Canvas.getGameObject([x, y]);
            let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));

            if (snakeGameObject != null) {
                this.gameObject.position = [[Math.floor(Math.random() * Canvas.gridSizeX), Math.floor(Math.random() * Canvas.gridSizeY), appleColor]];
                return;
            }
        }
    }

    start() {
    }

    update() {
        let collisionList = Canvas.getGameObject(this.gameObject.position[0]);
        let snakeGameObject = collisionList.find(object => object instanceof (SnakeGameObject));
        if (snakeGameObject != null) {
            this.gameObject.destroy();

            let snakeSize = snakeGameObject.getComponent(SnakeSize.className);
            snakeSize.grow();

            let appleGameObject = new AppleGameObject();
            Canvas.addGameObject(appleGameObject);
        }
    }
}