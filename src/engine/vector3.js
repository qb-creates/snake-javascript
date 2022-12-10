
export class Vector3 {
    #x = 0;
    #y = 0;
    #z = 0;

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    get z() {
        return this.#z;
    }

    get magnitude() {
        return Math.sqrt((this.#x ** 2) + (this.#y ** 2) + (this.#z ** 2));
    }

    constructor(x, y, z) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    /**
     * 
     * @returns Return the vector normalized where its magnitude is equal to 1 unit.
     */
    normalize() {
        let xN = this.#x / this.magnitude;
        let yN = this.#y / this.magnitude;
        let zN = this.#z / this.magnitude;

        return new Vector3(xN, yN, zN);
    }

    static add(vectorA, vectorB) {
        let x = vectorA.x + vectorB.x;
        let y = vectorA.y + vectorB.y;
        let z = vectorA.z + vectorB.z;

        return new Vector3(x, y, z);
    }

    static subtract(vectorA, vectorB) {
        let x = vectorA.x - vectorB.x;
        let y = vectorA.y - vectorB.y;
        let z = vectorA.z - vectorB.z;

        return new Vector3(x, y, z);
    }

    static multiply(vectorA, num) {
        return new Vector3(vectorA.x * num, vectorA.y * num, vectorA.z * num);
    }
}