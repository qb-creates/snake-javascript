import { GameObject, Vector2, Component, Transform, Canvas, MonoBehaviour, SpriteRenderer } from "./qbcreates-js-engine.js";
import { square } from "./sprite-renderer.js";
export class Objects {
    /**
     * @param {GameObject} originalGameObject 
     * @param {GameObject} parent 
     * @param {Vector2} position 
     * @returns 
     */
    static instantiate(originalGameObject, parent, position) {
        let clonedObject = new GameObject(originalGameObject.objectName + " (clone)");
        clonedObject.layer = originalGameObject.layer;
        clonedObject.transform.position = new Vector2(originalGameObject.transform.position.x, originalGameObject.transform.position.y);
        clonedObject.transform.scale = new Vector2(originalGameObject.transform.scale.x, originalGameObject.transform.scale.y);

        originalGameObject.children.forEach(child => {
            Objects.instantiate(child, clonedObject);
        });

        originalGameObject.getComponents(Component).forEach(script => {
            if (!(script instanceof Transform)) {
                let clonedScript = clonedObject.addComponent(script.constructor);
                script.clone(clonedScript);
            }
        });

        if (typeof (parent) != 'undefined') {
            if (parent instanceof GameObject) {
                parent.addGameObject(clonedObject);
            } else {
                throw new Error(`Error instantiating ${typeof (originalGameObject.objectName)}. ${parent} is not of type gameObject.`)
            }
        }

        if (typeof (position) != 'undefined') {
            clonedObject.transform.position = position;
        }

        Canvas.addGameObject(clonedObject);
        return clonedObject;
    }


    static instantiatePrefabObject(prefabObject) {
        let gameObject = new GameObject(prefabObject.objectName);
        gameObject.layer = prefabObject.layer;
        gameObject.transform.position = prefabObject.position;
        gameObject.transform.scale = prefabObject.scale;

        prefabObject.children.forEach(childObject => {
            let child = Objects.instantiatePrefabObject(childObject);
            child.parent = gameObject;
            gameObject.children.push(child);
        });

        prefabObject.components.forEach(componentObject => {
            let component = gameObject.addComponent(componentObject.component);

            for (var key in componentObject.properties) {
                if (gameObject[key] != 'undefined') {
                    Reflect.set(component, key, componentObject.properties[key])
                }
            }
        });
        Canvas.addGameObject(gameObject);
        return gameObject;
    }
    
    // let test = {
    //     children: [],
    //     layer: 2,
    //     objectName: 'enemy',
    //     position: new Vector2(-5, 5),
    //     scale: new Vector2(1, 1),
    //     components: []
    //   }
    //   let a = {
    //     component: SpriteRenderer,
    //     color: snakeHeadColor,
    //     sprite: (renderer) => {
    //       square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale);
    //     }
    //   };

    /**
     * 
     * @param {GameObject | Component} object 
     */
    static destroy(object) {
        Canvas.removeGameObject(object);
        object.getComponents(MonoBehaviour).forEach(component => {
            component.destroy();
        });
        object.destroy();
    }
}