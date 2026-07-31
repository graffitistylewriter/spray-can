/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

StateMachine.js

Version 0.1

Responsibilities

• Manage Engine State
• Notify Systems
• CSS State Classes
• Future Event System

****************************************************************/

export default class StateMachine {

    constructor(container) {

        this.container = container;

        /*
        ------------------------------------------------------

        Available States

        ------------------------------------------------------
        */

        this.states = {

            BOOT: "boot",

            LOADING: "loading",

            IDLE: "idle",

            HOVER: "hover",

            EXPLODE: "explode",

            SOUL: "soul",

            BLUEPRINT: "blueprint",

            NAVIGATION: "navigation",

            WORLD: "world"

        };

        /*
        ------------------------------------------------------

        Current State

        ------------------------------------------------------
        */

        this.current = this.states.BOOT;

        /*
        ------------------------------------------------------

        Subscribers

        ------------------------------------------------------
        */

        this.listeners = [];

        this.applyState();

        console.log("✓ State Machine Created");

    }

    /*=========================================================

        Get Current State

    =========================================================*/

    get() {

        return this.current;

    }

    /*=========================================================

        Change State

    =========================================================*/

    set(state) {

        if (state === this.current) return;

        console.log(

            "STATE:",

            this.current,

            "→",

            state

        );

        this.current = state;

        this.applyState();

        this.notify();

    }

    /*=========================================================

        CSS Classes

    =========================================================*/

    applyState() {

        const classList = [

            "is-boot",

            "is-loading",

            "is-idle",

            "is-hover",

            "is-explode",

            "is-soul",

            "is-blueprint",

            "is-navigation",

            "is-world"

        ];

        this.container.classList.remove(

            ...classList

        );

        this.container.classList.add(

            "is-" + this.current

        );

    }

    /*=========================================================

        Subscribe

    =========================================================*/

    subscribe(callback) {

        this.listeners.push(callback);

    }

    /*=========================================================

        Notify

    =========================================================*/

    notify() {

        this.listeners.forEach(

            listener =>

                listener(this.current)

        );

    }

}