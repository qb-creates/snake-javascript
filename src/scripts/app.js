import { Canvas, Vector2, Input, QObject } from "../engine/qbcreates-js-engine.js";
import { GameStateManager } from "./managers/game-state-manager.js";
import { TestFollow } from "./test-follow.js";
import { enemyObject, backgroundObject, horizontalBorderObject, verticalBorderObject, appleObject, snakeObject } from "./prefabs.js";

Input.initialize();
Canvas.configureCanvas(500, 500, 25);
QObject.instantiatePrefabObject(backgroundObject);
QObject.instantiatePrefabObject(appleObject);
let border = QObject.instantiatePrefabObject(verticalBorderObject);
border.transform.position = new Vector2(-10, 0);

border = QObject.instantiatePrefabObject(verticalBorderObject);
border.transform.position = new Vector2(10, 0);

border = QObject.instantiatePrefabObject(horizontalBorderObject);
border.transform.position = new Vector2(0, 10);

border = QObject.instantiatePrefabObject(horizontalBorderObject);
border.transform.position = new Vector2(0, -10);

let player = QObject.instantiatePrefabObject(snakeObject);

let enemy = QObject.instantiatePrefabObject(enemyObject);
enemy.getComponent(TestFollow).target = player;

let enemy2 = QObject.instantiatePrefabObject(enemyObject);
enemy2.transform.position = new Vector2(5, -5);
enemy2.getComponent(TestFollow).target = player;



window.onPlay = () => {
  GameStateManager.onGameStart();
}