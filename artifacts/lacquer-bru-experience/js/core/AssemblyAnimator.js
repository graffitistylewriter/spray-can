/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

AssemblyAnimator.js

Version 2.0

Master Assembly Animator

Responsibilities

• Animate Assemblies
• Read Reveal Stages
• Apply Motion Profiles
• Coordinate Mechanical Reveal

****************************************************************/

import MotionProfile from "./MotionProfile.js";
import Stage from "./Stage.js";

export default class AssemblyAnimator {

    constructor(sprayCan, revealDirector) {

        this.sprayCan = sprayCan;

        this.revealDirector = revealDirector;

    }

    /*=========================================================
        UPDATE
    =========================================================*/

    update(delta) {

        if (!this.sprayCan) return;

        switch (this.revealDirector.getStage()) {

            case Stage.LIFT:

                this.animateLift(delta);

                break;

            case Stage.SHOULDER_REVEAL:

                this.animateShoulder(delta);

                break;

            case Stage.VALVE_REVEAL:

                this.animateValve(delta);

                break;

            case Stage.INTERNAL_REVEAL:

                this.animateInternals(delta);

                break;

        }

    }

    /*=========================================================
        HERO LIFT
    =========================================================*/

    animateLift(delta) {

        const root = this.sprayCan.root;

        root.position.y += (

            MotionProfile.LIFT.distance -

            root.position.y

        ) * delta * 2.0;

    }

    /*=========================================================
        SHOULDER
    =========================================================*/

    animateShoulder(delta) {

        const top =

            this.sprayCan.parts.topAssembly;

        top.position.y += (

            MotionProfile.SHOULDER.distance -

            top.position.y

        ) * delta * 2.5;

    }

    /*=========================================================
        VALVE
    =========================================================*/

    animateValve(delta) {

        const top =

            this.sprayCan.parts.topAssembly;

        top.position.y += (

            MotionProfile.VALVE.distance -

            top.position.y

        ) * delta * 2.5;

    }

    /*=========================================================
        INTERNAL
    =========================================================*/

    animateInternals(delta) {

        const internal =

            this.sprayCan.parts.internal;

        internal.position.y += (

            MotionProfile.INTERNAL.distance -

            internal.position.y

        ) * delta * 2.0;

    }

}