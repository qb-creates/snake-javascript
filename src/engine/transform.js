import { BoxCollider, Component, Vector2 } from "./qbcreates-js-engine.js";

export class Transform extends Component{
    #position = new Vector2(0, 0);
    #scale = new Vector2(1, 1);

    get position() {
        return this.#position;
    }

    set position(value) {
        this.gameObject.getComponents(BoxCollider).forEach(collider => {
            let distanceMoved = Vector2.subtract(value, this.#position);
            collider.position = Vector2.add(distanceMoved, collider.position);
        });

        this.gameObject.children.forEach(child => {
            let distanceMoved = Vector2.subtract(value, this.#position);
            child.transform.position = Vector2.add(distanceMoved, child.transform.position); 
        });
        this.#position = value;
    }

    get scale() {
        return this.#scale;
    }

    set scale(value) {
        this.gameObject.getComponents(BoxCollider).forEach(collider => {
            let distanceMoved = Vector2.subtract(value, this.#scale);
            collider.scale = Vector2.add(distanceMoved, collider.scale);
        });

        this.gameObject.children.forEach(child => {
            let distanceMoved = Vector2.subtract(value, this.#scale);
            child.transform.scale = Vector2.add(distanceMoved, child.transform.scale); 
        });
        this.#scale = value;
    }

    constructor(gameObject) {
        super(gameObject);
    }
}