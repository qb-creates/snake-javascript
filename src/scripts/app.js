// import { Canvas, Input, Vector2 } from "../engine/qbcreates-js-engine.js";
// import AppleGameObject from "./apple/apple-game-object.js";
// import { GameStateManager } from "./managers/game-state-manager.js";
// import { SnakeGameObject, SnakeMovement } from "./snake/snake-exports.js";
// import { SpriteRenderer, square } from "../engine/sprite-renderer.js";

import { GameObject, Canvas, SpriteRenderer, Vector2, Input, Object, Component, BoxCollider } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { SnakeMovement, SnakeInput, snakeHeadColor, snakeBodyColor } from "./snake/snake-exports.js";
import { square } from "../engine/sprite-renderer.js";
import { TestFollow } from "./test-follow.js";
import AppleBehaviour from "./apple/apple-behaviour.js";

Input.initialize();
Canvas.configureCanvas(500, 500, 25);
let player = Object.instantiate(snakePrefab());

let enemyObject = Object.instantiate(enemy());
let collider = enemyObject.addComponent(BoxCollider);
collider.scale = Vector2.multiply(enemyObject.transform.scale, 3);
enemyObject.getComponent(TestFollow).target = player;

Object.instantiate(applePrefab());
Object.instantiate(border());

window.onPlay = () => {
  GameStateManager.onGameStart();
}



//Prefabs
function snakePrefab() {
  let snakeGameObject = new GameObject('snakeGameObject');
  snakeGameObject.transform.position = new Vector2(0, 0);
  snakeGameObject.layer = 1;

  let snakeTail = snakeBodyPrefab();
  snakeTail.layer = 1;
  snakeTail.transform.position = new Vector2(0, 0);
  snakeTail.transform.scale = new Vector2(.6, .6);
  snakeTail.getComponent(SpriteRenderer).color = snakeBodyColor;
  snakeTail.getComponent(SpriteRenderer).sprite(snakeTail.getComponent(SpriteRenderer));
  snakeTail.getComponent(BoxCollider).scale = Vector2.multiply(snakeTail.transform.scale, .9);
  snakeGameObject.addGameObject(snakeTail);

  let snakeBody = snakeBodyPrefab();
  snakeBody.layer = 1;
  snakeBody.transform.position = new Vector2(1, 0);
  snakeBody.transform.scale = new Vector2(.8, .8);
  snakeBody.getComponent(SpriteRenderer).color = snakeBodyColor;
  snakeBody.getComponent(SpriteRenderer).sprite(snakeBody.getComponent(SpriteRenderer));
  snakeBody.getComponent(BoxCollider).scale = Vector2.multiply(snakeBody.transform.scale, .9);
  snakeGameObject.addGameObject(snakeBody);

  let snakeHead = snakeBodyPrefab();
  snakeHead.layer = 1;
  snakeHead.transform.position = new Vector2(2, 0);
  snakeHead.getComponent(SpriteRenderer).color = snakeHeadColor;
  snakeHead.getComponent(SpriteRenderer).sprite(snakeHead.getComponent(SpriteRenderer));
  snakeGameObject.addGameObject(snakeHead);

  snakeGameObject.addComponent(SnakeMovement);
  snakeGameObject.addComponent(SnakeInput);

  return snakeGameObject;
}

function snakeBodyPrefab() {
  let snakeBody = new GameObject('snakeBody');
  snakeBody.transform.position = new Vector2(1, 1);
  
  let spriteRenderer = snakeBody.addComponent(SpriteRenderer);
  spriteRenderer.color = snakeBodyColor;
  spriteRenderer.sprite = (renderer) => {
    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
  }

  snakeBody.addComponent(BoxCollider);
  return snakeBody;
}

function applePrefab() {
  let apple = new GameObject('apple');
  apple.transform.scale = new Vector2(.4, .4);
  apple.layer = 1;

  let spriteRenderer = apple.addComponent(SpriteRenderer);
  spriteRenderer.color = 'red';
  spriteRenderer.sprite = (renderer) => {
    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
  }

  apple.addComponent(AppleBehaviour);
  return apple;
}

function enemy(target) {
  let enemy = new GameObject("enemy");
  enemy.layer = 2;
  enemy.transform.position = new Vector2(5, 5);
  let spriteRenderer = enemy.addComponent(SpriteRenderer);
  spriteRenderer.sprite = (renderer) => {
    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale);
  }
  let testFollow = enemy.addComponent(TestFollow);
  testFollow.target = target;
  enemy.objectName = "enemy";

  return enemy;
}

function border() {
  let border = new GameObject('gameBorder');
  border.transform.scale = new Vector2(19.5, 19.5);
  border.transform.position = new Vector2(0, 0);
  let spriteRenderer = border.addComponent(SpriteRenderer);
  spriteRenderer.color = '#1E1E1E';
  spriteRenderer.sprite = (renderer) => {
    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
  }

  return border;
}