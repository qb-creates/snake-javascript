import { Canvas, Component, Transform, SpriteRenderer, Vector3, Vector2 } from "./qbcreates-js-engine.js";

export class GameObject {
    #objectName = '';
    #scriptList = [];
    #children = [];
    #isDestroyed = false;
    #transform = null;

    get objectName() {
        return this.#objectName;
    }

    set objectName(value) {
        this.#objectName = value;
    }

    get isDestroyed() {
        return this.#isDestroyed;
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
        gameObject.transform.position = Vector3.add(gameObject.transform.position, this.transform.position);
        this.#children.push(gameObject);
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
        return component
    }

    destroy() {
        this.#isDestroyed = true;
        this.#scriptList.forEach(component => {
            component = null;
        });
        Canvas.removeGameObject(this);
    }
} 