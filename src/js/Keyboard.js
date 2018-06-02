export default class Keyboard {
    constructor() {
        this.keyStates = new Map();
        this.listeners = new Map();
    }
    handleEvent(e) {
        const key = e.code;
        if (!this.keyStates.has(key)) {
            return;
        }
        e.preventDefault();
        const keyState = e.type === 'keydown' ? 1 : 0;
        if (this.keyStates.get(key) === keyState) return;
        this.keyStates.set(key, keyState);
        if(keyState === 1 && this.listeners.has(key)) this.listeners.get(key)()

    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eName => {
            window.addEventListener(eName, e => {
                this.handleEvent(e);
            });
        });
        ["KeyA", "KeyW", "KeyD", "KeyS"].forEach(key => this.keyStates.set(key, 0));
    }
    setListener(key, listener) {
        this.keyStates.set(key, 0);
        this.listeners.set(key, listener);
    }
}