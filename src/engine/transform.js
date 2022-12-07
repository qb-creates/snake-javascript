import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";

export class Transform extends Component{
    #position = new Vector2(0, 0);
    #scale = new Vector2(1, 1);
    #previousPosition = new Vector2(0, 0);

    get position() {
        return this.#position;
    }

    set position(value) {
        this.#position = value;

        this.gameObject.children.forEach(child => {
            let distanceMoved = Vector2.subtract(value, this.#previousPosition);
            child.transform.position = Vector2.add(distanceMoved, child.transform.position); 
        });
    }

    get scale() {
        return this.#scale;
    }

    set scale(value) {
        this.#scale = value;
    }

    constructor(gameObject) {
        super(gameObject);
    }
}