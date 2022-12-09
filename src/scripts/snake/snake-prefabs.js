import { Vector2, SpriteRenderer, GameObject } from "../../engine/qbcreates-js-engine.js";
import { snakeBodyColor } from "./snake-exports.js";
import { square } from "../../engine/sprite-renderer.js";

/**
 * 
 * @returns 
 */
export function snakeBodyPrefab() {
    let snakeBody = new GameObject('snakeBody');
    snakeBody.transform.position = new Vector2(0, 0);
    let spriteRenderer = snakeBody.addComponent(SpriteRenderer);
    spriteRenderer.color = snakeBodyColor;
    spriteRenderer.sprite = (renderer) => {
        square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, renderer.transform.scale)
    }
    return snakeBody;
}