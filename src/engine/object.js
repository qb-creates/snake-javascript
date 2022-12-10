import { GameObject, Vector3 } from "./qbcreates-js-engine.js";

export class Object {
    /**
     * @param {GameObject} gameObject 
     * @param {GameObject} parent 
     * @param {Vector3} position 
     * @returns 
     */
    static instantiate(gameObject, parent, position) {
        let clonedObject = gameObject.clone();

        if (typeof(parent) != 'undefined') {
            if (parent instanceof GameObject) {
                parent.children.push(gameObject);
            } else {
                throw new Error(`Error instantiating ${typeof(gameObject.objectName)}. ${parent} is not of type gameObject.`)
            }
        }

        if (typeof (position) != 'undefined') {
            gameObject.transform.position = position;
        }
        return clonedObject;
    }
}