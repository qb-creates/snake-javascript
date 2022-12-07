import { Component } from "./component.js";
import { Vector2 } from "./vector2.js";

export class Transform extends Component{
    #position = new Vector2(0, 0);
    #scale = new Vector2(1, 1);
    #positionChangeEvent = new rxjs.Subject();

    get position() {
        return this.#position;
    }

    set position(value) {
        this.#position = value;
        this.#positionChangeEvent.next(value);
    }

    get scale() {
        return this.#scale;
    }

    set scale(value) {
        this.#scale = value;
    }

    get positionChangeEvent() {
        return this.#positionChangeEvent;
    }

    constructor(gameObject) {
        super(gameObject);
    }
}