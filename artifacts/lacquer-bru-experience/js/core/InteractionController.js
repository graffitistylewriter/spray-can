/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

InteractionController.js

Version 1.0

Master Interaction Controller

Responsibilities

• Mouse Input
• Scroll Input
• Click Input
• CTA Input
• Trigger Reveal
• Control Interaction State

****************************************************************/

import Stage from "./Stage.js";

export default class InteractionController {

    constructor(engine) {

        this.engine = engine;

        this.enabled = true;

        this.hasStarted = false;

    }

    /*=========================================================
        START EXPERIENCE
    =========================================================*/

    startExperience() {

        if (this.hasStarted) return;

        this.hasStarted = true;

        this.engine.setStage(

            Stage.LIFT

        );

    }

    /*=========================================================
        SCROLL
    =========================================================*/

    onScroll(progress) {

        if (!this.enabled) return;

        this.engine.revealDirector.setProgress(

            progress

        );

    }

    /*=========================================================
        CLICK
    =========================================================*/

    onClick() {

        this.startExperience();

    }

    /*=========================================================
        CTA
    =========================================================*/

    onCTA() {

        this.startExperience();

    }

    /*=========================================================
        ENABLE
    =========================================================*/

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

}