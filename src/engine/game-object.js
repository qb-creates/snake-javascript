import { Canvas, Component, Transform, SpriteRenderer, Vector2, BoxCollider } from "./qbcreates-js-engine.js";

export class GameObject {
    #objectName = '';
    #scriptList = [];
    #children = [];
    #isDestroyed = false;
    #transform = null;
    #layer = 0;
    #isActive = true;
    parent = null;
    get objectName() {
        return this.#objectName;
    }

    set objectName(value) {
        this.#objectName = value;
    }

    get layer() {
        return this.#layer;
    }

    set layer(value) {
        this.#layer = value;
    }

    get isActive() {
        return this.#isActive;
    }

    set isActive(value) {
        this.#isActive = value;
    }

    get isDestroyed() {
        return this.#isDestroyed;
    }

    set isDestroyed(value) {
        this.#isDestroyed = value;
    }

    get children() {
        return this.#children;
    }

    get transform() {
        return this.#transform;
    }

    constructor(objectName) {
        this.#objectName = objectName;
        this.#transform = new Transform(this)
        this.#scriptList.push(this.#transform);
    }

    addGameObject(gameObject) {
        gameObject.parent = this;
        gameObject.transform.position = Vector2.add(gameObject.transform.position, this.transform.position);
        this.#children.unshift(gameObject);
    }

    getComponentInChildren() {

    }

    getComponent(componentClass) {
        return this.#scriptList.find(component => component instanceof componentClass);
    }

    getComponents(componentClass) {
        return this.#scriptList.filter(component => component instanceof componentClass);
    }

    /**
     * This method will create a new instance of a component and attach it to this gameObject.
     * @param {Component} T - Class type of the component you want to created and add to this gameObject.
     * @returns {Component} Returns the newly created component.
     */
    addComponent(T) {
        if (T === Transform) {
            throw new Error(`Can not add another transform to ${this.#objectName}.`);
        }

        if (T === SpriteRenderer && this.#scriptList.find(component => component instanceof SpriteRenderer)) {
            throw new Error(`Can not add another SpriteRenderer to ${this.#objectName}.`);
        }

        let component = new T(this);
        this.#scriptList.push(component);

        if (component instanceof BoxCollider) {
            Canvas.addCollider(component);
        }
        return component
    }
} 