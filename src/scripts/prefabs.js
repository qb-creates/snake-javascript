import { SpriteRenderer, Vector2, BoxCollider } from "../engine/qbcreates-js-engine.js";
import { TestFollow } from "./test-follow.js";
import { square } from "../engine/sprite-renderer.js";
import { AppleBehaviour } from "./apple/apple-behaviour.js";
import { snakeBodyColor, SnakeCollision, snakeHeadColor, SnakeInput, SnakeMovement, SnakeSize } from "./snake/snake-exports.js";

export let snakeObject = {
    children: [
        {
            children: [],
            layer: 1,
            objectName: 'snakeBody',
            position: new Vector2(0, 0),
            scale: new Vector2(.6, .6),
            components: [
                {
                    component: SpriteRenderer,
                    properties: {
                        color: snakeBodyColor,
                        sprite: (renderer) => {
                            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                        }
                    }
                },
                {
                    component: BoxCollider,
                    properties: {
                        position: new Vector2(0, 0),
                        scale: new Vector2(.6, .6)
                    }
                },
                {
                    component: SnakeCollision,
                    properties: {}
                }
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: 'snakeBody',
            position: new Vector2(1, 0),
            scale: new Vector2(.8, .8),
            components: [
                {
                    component: SpriteRenderer,
                    properties: {
                        color: snakeBodyColor,
                        sprite: (renderer) => {
                            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                        }
                    }
                },
                {
                    component: BoxCollider,
                    properties: {
                        position: new Vector2(1, 0),
                        scale: new Vector2(.8, .8)
                    }
                },
                {
                    component: SnakeCollision,
                    properties: {}
                }
            ]
        },
        {
            children: [],
            layer: 1,
            objectName: 'snakeHead',
            position: new Vector2(2, 0),
            scale: new Vector2(1, 1),
            components: [
                {
                    component: SpriteRenderer,
                    properties: {
                        color: snakeHeadColor,
                        sprite: (renderer) => {
                            square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                        }
                    }
                },
                {
                    component: BoxCollider,
                    properties: {
                        position: new Vector2(2, 0),
                        scale: new Vector2(1, 1)
                    }
                },
                {
                    component: SnakeCollision,
                    properties: {}
                }
            ]
        }
    ],
    layer: 1,
    objectName: 'snakeGameObject',
    position: new Vector2(0,0 ),
    scale: new Vector2(1, 1),
    components: [
        {
            component: SnakeMovement,
            properties: {}
        },
        {
            component: SnakeInput,
            properties: {}
        },
        {
            component: SnakeSize,
            properties: {}
        }
    ]
}

export let appleObject = {
    children: [],
    layer: 1,
    objectName: 'apple',
    position: new Vector2(5, 5),
    scale: new Vector2(.4, .4),
    components: [
        {
            component: SpriteRenderer,
            properties: {
                color: 'red',
                sprite: (renderer) => {
                    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                }
            }
        },
        {
            component: BoxCollider,
            properties: {
                position: new Vector2(5, 5),
                scale: new Vector2(.4, .4)
            }
        },
        {
            component: AppleBehaviour,
            properties: {}
        }
    ]
}

export let enemyObject = {
    children: [],
    layer: 2,
    objectName: 'enemy',
    position: new Vector2(-5, 5),
    scale: new Vector2(1, 1),
    components: [
        {
            component: SpriteRenderer,
            properties: {
                color: 'red',
                sprite: (renderer) => {
                    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale);
                }
            }
        },
        {
            component: BoxCollider,
            properties: {
                position: new Vector2(-5, 5),
                scale: new Vector2(3, 3)
            }
        },
        {
            component: TestFollow,
            properties: {
                speed: 1
            }
        }
    ]
}

export let backgroundObject = {
    children: [],
    layer: 0,
    objectName: 'background',
    position: new Vector2(0, 0),
    scale: new Vector2(19.5, 19.5),
    components: [
        {
            component: SpriteRenderer,
            properties: {
                color: '#1E1E1E',
                sprite: (renderer) => {
                    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                }
            }
        }
    ]
}

export let verticalBorderObject = {
    children: [],
    layer: 0,
    objectName: 'border',
    position: new Vector2(0, 0),
    scale: new Vector2(1, 20),
    components: [
        {
            component: BoxCollider,
            properties: {
                position: new Vector2(0, 0),
                scale: new Vector2(.8, 19)
            }
        },
        {
            component: SpriteRenderer,
            properties: {
                color: 'white',
                sprite: (renderer) => {
                    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                }
            }
        }
    ]
}

export let horizontalBorderObject = {
    children: [],
    layer: 0,
    objectName: 'border',
    position: new Vector2(0, 0),
    scale: new Vector2(20, 1),
    components: [
        {
            component: BoxCollider,
            properties: {
                position: new Vector2(0, 0),
                scale: new Vector2(19, .8)
            }
        },
        {
            component: SpriteRenderer,
            properties: {
                color: 'white',
                sprite: (renderer) => {
                    square(renderer.transform.position.x, renderer.transform.position.y, renderer.color, 'transparent', renderer.transform.scale)
                }
            }
        }
    ]
}
