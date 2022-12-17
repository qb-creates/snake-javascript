import { Component, Vector2, Canvas } from "./qbcreates-js-engine.js";

export class BoxCollider extends Component {
    position = new Vector2(0, 0);
    scale = new Vector2(1, 1);
    #render = null;
    #metaData = '';
    #collisionList = new Map();
    #previousListCount = 0;

    get render() {
        return this.#render;
    }

    get metaData() {
        return this.#metaData;
    }

    get collisionList() {
        return new Map(this.#collisionList);
    }

    constructor(gameObject) {
        super(gameObject)
        this.position = new Vector2(gameObject.transform.position.x, gameObject.transform.position.y);
        this.scale = new Vector2(gameObject.transform.scale.x, gameObject.transform.scale.y)
        this.#render = () => {
            this.#onRender(this.position.x, this.position.y, this.scale)
        };
        this.#metaData = this.#createUUID();
    }

    checkForCollision(collider) {
        this.#previousListCount = this.#collisionList.size;

        // Get the top left corner coordinates of the box
        let l1 = new Vector2((this.position.x - .5) - (this.scale.x / 2), (this.position.y - .5) + (this.scale.y / 2));
        let r1 = new Vector2((this.position.x - .5) + (this.scale.x / 2), (this.position.y - .5) - (this.scale.y / 2));

        // Get the bottom right coordinates of the box
        let l2 = new Vector2((collider.position.x - .5) - (collider.scale.x / 2), (collider.position.y - .5) + (collider.scale.y / 2));
        let r2 = new Vector2((collider.position.x - .5) + (collider.scale.x / 2), (collider.position.y - .5) - (collider.scale.y / 2));

        // if rectangle has area 0, no overlap
        if ((l1.x == r1.x || l1.y == r1.y || r2.x == l2.x || l2.y == r2.y)) {
            if (this.#collisionList.has(collider.metaData)) {
                this.#collisionList.delete(collider.metaData, collider);
            }
            return;
        }

        // If one rectangle is on left side of other
        if (l1.x > r2.x || l2.x > r1.x) {
            if (this.#collisionList.has(collider.metaData)) {
                this.#collisionList.delete(collider.metaData, collider);
            }
            return;
        }

        // If one rectangle is above other
        if (r1.y > l2.y || r2.y > l1.y) {
            if (this.#collisionList.has(collider.metaData)) {
                this.#collisionList.delete(collider.metaData, collider);
            }
            return;
        }

        if (!this.#collisionList.has(collider.metaData)) {
            this.#collisionList.set(collider.metaData, collider);
        }
    }

    #onRender(x, y, scale) {
        let w = Canvas.ppu * scale.x;
        let h = Canvas.ppu * scale.y;

        x = (Canvas.ppu * x) + ((Canvas.ppu - w) / 2);
        y = (Canvas.ppu * y) + ((Canvas.ppu - h) / 2);
        Canvas.context.lineWidth = 2;
        Canvas.context.strokeStyle = 'green';
        Canvas.context.beginPath();
        Canvas.context.roundRect(x - (Canvas.ppu / 2), y - (Canvas.ppu / 2), w, h);
        Canvas.context.stroke();
        Canvas.context.lineWidth = 1;
    }

    #createUUID() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }
}

// Circle collision Test
// let n = 25;
// let w = 1;
// let h = 1;
// let x = 0;
// let y = 0;
// Canvas.context.fillRect(x - (w/2), y - (h/2), w, h);
// // collider 1
// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((2 - .5) * n, (0 - .5) * n);
// Canvas.context.lineTo((2 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((3 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((3 - .5) * n, (0 - .5)* n);
// Canvas.context.lineTo((2 - .5)  * n,( 0 -.5)* n);
// Canvas.context.stroke();

// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((0 - .5) * n, (0 - .5) * n);
// Canvas.context.lineTo((0 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((1 - .5) * n, (1 - .5)* n);
// Canvas.context.lineTo((1 - .5) * n, (0 - .5)* n);
// Canvas.context.lineTo((0 - .5)  * n,( 0 -.5)* n);
// Canvas.context.stroke();


// let n = 25;
// let w = 1;
// let h = 1;
// let x = 0;
// let y = 0;
// Canvas.context.fillRect(x - (w/2), y - (h/2), w, h);
// // collider 1
// Canvas.context.beginPath();
// Canvas.context.strokeStyle = 'green';
// Canvas.context.moveTo((1.914 - .5) * n, (1.2065- .5) * n);
// Canvas.context.lineTo((1.207 - .5) * n, (1.913 - .5)* n);
// Canvas.context.lineTo((1.915 - .5) * n, (2.620 - .5)* n);
// Canvas.context.lineTo((2.621 - .5) * n, (1.913 - .5)* n);
// Canvas.context.lineTo((1.914 - .5)  * n,( 1.2065 -.5)* n);
// Canvas.context.stroke();