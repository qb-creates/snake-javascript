import { Component, Vector2, Vector3 } from "./qbcreates-js-engine.js";

export class Transform extends Component{
    #position = new Vector3(0, 0, 0);
    #scale = new Vector2(1, 1);
    #previousPosition = new Vector3(0, 0, 0);

    get position() {
        return this.#position;
    }

    set position(value) {
        this.gameObject.children.forEach(child => {
            let distanceMoved = Vector3.subtract(value, this.#position);
            child.transform.position = Vector3.add(distanceMoved, child.transform.position); 
        });
        this.#position = value;
    }

    update() {
        this.gameObject.children.forEach(child => {
            let distanceMoved = Vector3.subtract(this.#position, this.#previousPosition);
            child.transform.position = Vector3.add(distanceMoved, child.transform.position); 
        });
    }
    get scale() {
        return this.#scale;
    }

    set scale(value) {
        this.#scale = value;
    }

    get previousPosition() {
        return this.#previousPosition;
    }

    set previousPosition(value) {
        this.#previousPosition = value;
    }

    constructor(gameObject) {
        super(gameObject);
    }
}