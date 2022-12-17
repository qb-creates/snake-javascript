import { Vector2, Component, BoxCollider } from "./qbcreates-js-engine.js";

export class Transform extends Component {
    #position = new Vector2(0, 0);
    #scale = new Vector2(1, 1);

    get position() {
        return this.#position;
    }

    set position(value) {
        // Calculates the change in position and applies the difference to all attached colliders and children.
        let distanceMoved = Vector2.subtract(value, this.#position);

        this.gameObject.getComponents(BoxCollider).forEach(collider => {
            collider.position = Vector2.add(distanceMoved, collider.position);
        });

        this.gameObject.children.forEach(child => {
            child.transform.position = Vector2.add(distanceMoved, child.transform.position);
        });
        this.#position = value;
    }

    get scale() {
        return this.#scale;
    }

    set scale(value) {
        // Calculates the change in scale and applies the difference to all attached colliders and children.
        let scaleDifference = Vector2.subtract(value, this.#scale);

        this.gameObject.getComponents(BoxCollider).forEach(collider => {
            collider.scale = Vector2.add(scaleDifference, collider.scale);
        });

        this.gameObject.children.forEach(child => {
            child.transform.scale = Vector2.add(scaleDifference, child.transform.scale);
        });
        this.#scale = value;
    }

    constructor(gameObject) {
        super(gameObject);
    }
}