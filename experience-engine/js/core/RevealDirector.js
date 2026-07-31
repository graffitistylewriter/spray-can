/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

RevealDirector.js

Version 3.0

Master Reveal Director

Responsibilities

• Stage Control
• Progress Control
• Reveal State
• Stage Transitions
• Notify Systems

****************************************************************/

import Stage from "./Stage.js";

export default class RevealDirector {

    constructor() {

        this.stage = Stage.IDLE;

        this.progress = 0;

        this.target = 0;

        this.speed = 2.5;

        this.listeners = [];

    }

    /*=========================================================
        UPDATE
    =========================================================*/

    update(delta) {

        this.progress += (

            this.target -

            this.progress

        ) * delta * this.speed;

        this.updateStage();

    }

    /*=========================================================
        STAGE FROM PROGRESS
    =========================================================*/

    updateStage() {

        let stage = Stage.IDLE;

        if (this.progress >= 0.10) stage = Stage.LIFT;

        if (this.progress >= 0.25) stage = Stage.SHOULDER_REVEAL;

        if (this.progress >= 0.40) stage = Stage.VALVE_REVEAL;

        if (this.progress >= 0.60) stage = Stage.INTERNAL_REVEAL;

        if (this.progress >= 0.80) stage = Stage.SOUL_REVEAL;

        if (this.progress >= 1.00) stage = Stage.WORLD_REVEAL;

        if (stage !== this.stage) {

            this.stage = stage;

            this.notify();

        }

    }

    /*=========================================================
        STAGE
    =========================================================*/

    setStage(stage) {

        if (stage === this.stage) return;

        this.stage = stage;

        this.notify();

    }

    getStage() {

        return this.stage;

    }

    /*=========================================================
        PROGRESS
    =========================================================*/

    setProgress(progress) {

        this.target = Math.max(

            0,

            Math.min(

                1,

                progress

            )

        );

    }

    getProgress() {

        return this.progress;

    }

    /*=========================================================
        EVENTS
    =========================================================*/

    onStageChanged(callback) {

        this.listeners.push(callback);

    }

    notify() {

        this.listeners.forEach(listener => {

            listener(

                this.stage,

                this.progress

            );

        });

    }

}