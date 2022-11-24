export default class MonoBehaviour {
    constructor() {
        setInterval(() => {
            this.Update();
        }, 1000);
    }

    Update() {
        console.log("This is a test");
    }
}