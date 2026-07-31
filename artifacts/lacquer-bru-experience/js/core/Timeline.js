/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Timeline.js

Version 1.0

Master Experience Timeline

Every system subscribes to this.

Nothing animates independently.

The timeline orchestrates the complete experience.

****************************************************************/

export default class Timeline {

    constructor() {

        this.state = "idle";

        this.progress = 0;

        this.listeners = {};

        this.states = [

            "idle",

            "hover",

            "inspect",

            "rotate",

            "explode",

            "pause",

            "soul",

            "blueprint",

            "navigation",

            "world",

            "collapse"

        ];

    }

    /*=========================================================
        EVENT SYSTEM
    =========================================================*/

    on(event, callback) {

        if (!this.listeners[event]) {

            this.listeners[event] = [];

        }

        this.listeners[event].push(callback);

    }

    emit(event, data = null) {

        if (!this.listeners[event]) return;

        this.listeners[event].forEach(callback => {

            callback(data);

        });

    }

    /*=========================================================
        STATE
    =========================================================*/

    setState(state) {

        if (this.state === state) return;

        const previous = this.state;

        this.state = state;

        console.log(

            `[Timeline] ${previous} → ${state}`

        );

        this.emit("stateChanged", {

            previous,

            current: state

        });

        this.emit(state);

    }

    getState() {

        return this.state;

    }

    /*=========================================================
        PROGRESS
    =========================================================*/

    setProgress(value) {

        this.progress = Math.max(

            0,

            Math.min(1, value)

        );

        this.emit("progress", this.progress);

    }

    getProgress() {

        return this.progress;

    }

    /*=========================================================
        PLAY
    =========================================================*/

    play(state) {

        this.setState(state);

    }

    /*=========================================================
        RESET
    =========================================================*/

    reset() {

        this.progress = 0;

        this.setState("idle");

    }

}