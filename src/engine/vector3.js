export class Vector3 {
    #x = 0;
    #y = 0;
    #z = 0;

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

    get z() {
        return this.#z;
    }

    set z(value) {
        this.#z = value;
    }

    constructor(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    static add(vectorA, vectorB) {
        let x = vectorA.x + vectorB.x;
        let y = vectorB.y + vectorB.y;

        return new Vector3(x, y);
    }

    static subtract(vectorA, vectorB) {
        let x = vectorA.x - vectorB.x;
        let y = vectorB.y - vectorB.y;

        return new Vector3(x, y);
    }
}