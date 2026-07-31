/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ExplosionSystem.js

Version 3.0

Mechanical Reveal Controller

Responsibilities

• Assembly Separation
• Reveal Progress
• Animation Driver

****************************************************************/

import * as THREE from "three";

export default class ExplosionSystem {

    constructor(timeline, sprayCan) {

        this.timeline = timeline;
        this.sprayCan = sprayCan;

        this.progress = 0;

        this.speed = 2.5;

        this.target = 0;

    }

    /*=========================================================
        PUBLIC API
    =========================================================*/

    explode() {

        this.target = 1;

    }

    collapse() {

        this.target = 0;

    }

    /*=========================================================
        UPDATE
    =========================================================*/

    update(delta) {

        this.progress = THREE.MathUtils.lerp(

            this.progress,

            this.target,

            delta * this.speed

        );

        this.animate();

    }

    /*=========================================================
        ANIMATE
    =========================================================*/

    animate() {

        const p = this.progress;

        /*
        Body
        */

        this.sprayCan.parts.body.position.y =

            -0.12 * p;

        /*
        Top Assembly
        */

        this.sprayCan.parts.topAssembly.position.y =

            0.28 * p;

        /*
        Internals
        */

        this.sprayCan.parts.internal.position.y =

            0.08 * p;

    }

    destroy() {}

}