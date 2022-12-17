import { Canvas, Component, Transform, SpriteRenderer, Vector2, BoxCollider, QObject } from "./qbcreates-js-engine.js";

export class GameObject extends QObject {
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
    set children(value) {
        this.#children = value;
    }
    get transform() {
        return this.#transform;
    }

    constructor(objectName) {
        super();
        this.#objectName = objectName;
        this.#transform = new Transform(this)
        this.#scriptList.push(this.#transform);
    }

    /**
     * Marks the gameObject and all of its references as Destroyed.
     */
    destroy() {
        this.#isDestroyed = true;
    }

    /**
     * Adds the input gameObect to this gameObjects list of children.
     * @param {GameObject} gameObject 
     */
    addGameObject(gameObject) {
        gameObject.parent = this;
        gameObject.transform.position = Vector2.add(gameObject.transform.position, this.transform.position);
        this.#children.unshift(gameObject);
    }

    getComponentInChildren() {

    }

    /**
     * Get a specific component from the gameObject. The first one listed will be returned.
     * @param {*} componentClass 
     * @returns The first one listed will be returned. Returns null if the script Type isn't found.
     */
    getComponent(componentClass) {
        if (this.#scriptList) {
            return this.#scriptList.find(component => component instanceof componentClass);
        }
        return null;
    }

    /**
     * Get a specific component from the gameObject. A list of all instances will be returned.
     * @param {*} componentClass - The class name of the component we want to get 
     * @returns A list of all instances will be returned. Returns null if the script Type isn't found.
     */
    getComponents(componentClass) {
        if (this.#scriptList) {
            return this.#scriptList.filter(component => component instanceof componentClass);
        }
        return null;
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