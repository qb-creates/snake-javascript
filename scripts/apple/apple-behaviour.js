
import { MonoBehaviour, Canvas, Input, KeyCode } from "../../engine/qbcreates-js-engine.js";
import SnakeGameObject from "../snake/snake-game-object.js";
import AppleGameObject from "./apple-game-object.js";

export default class AppleBehaviour extends MonoBehaviour{
    destroyed = false;
    awake() {
    }

    start() {
    }

    update() {
        if (!this.destroyed) {
        }
        let collisionList = Canvas.getGameObject(this.gameObject.position[0]);
        let appleGameObject = collisionList.find(asdf => asdf instanceof(SnakeGameObject));
        
        if (appleGameObject != null) {
            this.destroyed = true;
            console.log("sdfdf");
            this.gameObject.destroy();
            let appleGameObject = new AppleGameObject();
            Canvas.addGameObject(appleGameObject);
        }
    }
}