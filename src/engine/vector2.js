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

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }
    
    static add(vectorA, vectorB) {
        let x = vectorA.x + vectorB.x;
        let y = vectorB.y + vectorB.y;

        return new Vector2(x, y);
    }

    static subtract(vectorA, vectorB) {
        let x = vectorA.x - vectorB.x;
        let y = vectorB.y - vectorB.y;

        return new Vector2(x, y);
    }
}