
import { MonoBehaviour, Canvas, Time, Input, KeyCode, Vector2, SpriteRenderer } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { square } from "../engine/sprite-renderer.js";
export class TestFollow extends MonoBehaviour {
    target = null;
    speed = 1;
    #play = false;

    awake() {
        GameStateManager.gameStateEvent.subscribe(isStarted => {
            this.#play = true;
        });

        this.animation.push((renderer) => {
            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', new Vector2(renderer.transform.scale.x/1, renderer.transform.scale.y/1.25))
        });
        this.animation.push((renderer) => {
            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', new Vector2(renderer.transform.scale.x/1.25, renderer.transform.scale.y/1.25))
        });
        this.animation.push((renderer) => {
            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', new Vector2(renderer.transform.scale.x/1.5, renderer.transform.scale.y/1.5) )
        });
        this.animation.push((renderer) => {
            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', new Vector2(renderer.transform.scale.x/1.75, renderer.transform.scale.y/1.5) )
        });
        this.animation.push((renderer) => {
            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', new Vector2(renderer.transform.scale.x/2, renderer.transform.scale.y/2) )
        });
    }

    start() {
    }
    animation = [];
    animationcount = 0;
    update() {


        if (this.animationcount == 0) {
            this.gameObject.transform.scale = new Vector2(.8, .8);
        }
        if (this.animationcount == 5) {
            this.gameObject.transform.scale = new Vector2(.6, .6);
        }
        if (this.animationcount == 10) {
            this.gameObject.transform.scale = new Vector2(.4, .4);
        }
        if (this.animationcount == 15) {
            this.gameObject.transform.scale = new Vector2(.3, .3);
        }
        if (this.animationcount == 20) {
            this.gameObject.transform.scale = new Vector2(.3, .3);
        }
        if (this.animationcount == 30) {
            this.gameObject.transform.scale = new Vector2(.4, .4);
        }
        if (this.animationcount == 40) {
            this.gameObject.transform.scale = new Vector2(.6, .6);
        }
        if (this.animationcount == 50) {
            this.gameObject.transform.scale = new Vector2(.8, .8);
            this.animationcount = 0;
        }
        
        // console.log(`${this.gameObject.objectName}     ${this.target}`);
        if (this.target) {
            let step = this.speed * Time.deltaTime;
            let myTarg = this.target.children[this.target.children.length - 1];
            let placeholder = Vector2.subtract(myTarg.transform.position, this.transform.position).normalize();
            let xDistance = Math.abs(this.transform.position.x - myTarg.transform.position.x);
            let yDistance = Math.abs(this.transform.position.y - myTarg.transform.position.y);

            if (xDistance <= 0.02 && yDistance <= 0.02) {
                this.transform.position = new Vector2(myTarg.transform.position.x, this.transform.position.y);
            } else {
                this.transform.position = Vector2.add(this.transform.position, Vector2.multiply(placeholder, step));
            }
        }
        this.animationcount++;
    }

    onTriggerEnter(colliders) {

    }

    onTriggerExit(colliders) {
        // console.log('exit', colliders)
    }
}