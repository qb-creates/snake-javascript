import { GameObject, Canvas, SpriteRenderer, Vector2, Input, Object, Component, BoxCollider } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { SnakeMovement, SnakeInput, snakeHeadColor, snakeBodyColor, SnakeSize, SnakeCollision } from "./snake/snake-exports.js";
import { square } from "../engine/sprite-renderer.js";
import { TestFollow } from "./test-follow.js";
import { enemyObject, backgroundObject, horizontalBorderObject, verticalBorderObject, appleObject, snakeObject } from "./prefabs.js";

Input.initialize();
Canvas.configureCanvas(500, 500, 25);
let player = Object.instantiatePrefabObject(snakeObject);
console.log(player)
let enemy = Object.instantiatePrefabObject(enemyObject);
enemy.getComponent(TestFollow).target = player;


let enemy2 = Object.instantiatePrefabObject(enemyObject);
enemy2.transform.position = new Vector2(5, -5);
enemy2.getComponent(TestFollow).target = player;

// setTimeout(()=>{

//   Object.destroy(player);
//   // player.children = [null];
//   setTimeout(() => {
//     player = snakePrefab();
//     enemyObject.getComponent(TestFollow).target = player;
//   },4000);
// },20000)
Object.instantiatePrefabObject(appleObject);
Object.instantiatePrefabObject(backgroundObject);
let border = Object.instantiatePrefabObject(verticalBorderObject);
console.log(border);
border.transform.position = new Vector2(-10, 0);

border = Object.instantiatePrefabObject(verticalBorderObject);
border.transform.position = new Vector2(10, 0);

border = Object.instantiatePrefabObject(horizontalBorderObject);
border.transform.position = new Vector2(0, 10);

border = Object.instantiatePrefabObject(horizontalBorderObject);
border.transform.position = new Vector2(0, -10);

window.onPlay = () => {
  GameStateManager.onGameStart();
}