export class Vector2 {
    #x = 0;
    #y = 0;

    get x() {
        return this.#x;
    }

    set x(value) {
        this.#x = value;
    }

    get y() {
        return this.#y;
    }

    set y(value) {
        this.#y = value;
    }

    get magnitude() {
        return Math.sqrt((this.#x ** 2) + (this.#y ** 2));
    }

    static get up() {
        return new Vector2(0, 1);
    }

    static get down() {
        return new Vector2(0, -1);
    }

    static get left() {
        return new Vector2(-1, 0);
    }

    static get right() {
        return new Vector2(1, 0);
    }
    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * 
     * @returns Return the vector normalized where its magnitude is equal to 1 unit.
     */
    normalize() {
        if (this.magnitude == 0) {
            return new Vector2(0, 0);
        }
        let xN = this.#x / this.magnitude;
        let yN = this.#y / this.magnitude;

        return new Vector2(xN, yN);
    }

    static add(vectorA, vectorB) {
        let x = vectorA.x + vectorB.x;
        let y = vectorA.y + vectorB.y;

        return new Vector2(x, y);
    }

    static subtract(vectorA, vectorB) {
        let x = vectorA.x - vectorB.x;
        let y = vectorA.y - vectorB.y;

        return new Vector2(x, y);
    }

    static multiply(vectorA, num) {
        return new Vector2(vectorA.x * num, vectorA.y * num);
    }
}