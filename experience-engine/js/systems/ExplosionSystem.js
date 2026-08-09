/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ExplosionSystem.js

Version 3.1

Mechanical Reveal Controller

Responsibilities

• Body separation (downward)
• Scroll-driven progress via RevealDirector
• Animation Driver

Bug Fix (v3.1)

• FIX: Accepted revealDirector as 3rd constructor argument.
  Previously the 3rd argument was ignored and this.target was
  always 0, so the explosion never fired. Now update() reads
  revealDirector.getProgress() [0,1] each frame and lerps
  this.progress toward it.

• FIX: animate() now only moves parts.body (downward). The
  topAssembly and internal upward movements were removed
  because AssemblyAnimator also writes topAssembly.position.y
  and internal.position.y each frame via lerp — both systems
  writing the same property caused them to fight and cancel
  each other out. Responsibilities are now split cleanly:
    ExplosionSystem  → parts.body     (push down)
    AssemblyAnimator → topAssembly    (lift up, staged)
    AssemblyAnimator → parts.internal (reveal, staged)

****************************************************************/

import * as THREE from "three";

export default class ExplosionSystem {

    constructor(timeline, sprayCan, revealDirector) {

        this.timeline = timeline;
        this.sprayCan = sprayCan;

        /*------------------------------------------------------
        FIX: Store revealDirector so update() can read
        scroll progress from it each frame.
        ------------------------------------------------------*/

        this.revealDirector = revealDirector;

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

        /*------------------------------------------------------
        FIX: Drive target from scroll progress.
        revealDirector.getProgress() returns a value [0,1]
        that is updated each frame from window.scrollY.
        ------------------------------------------------------*/

        if (this.revealDirector) {

            this.target = this.revealDirector.getProgress();

        }

        this.progress = THREE.MathUtils.lerp(

            this.progress,

            this.target,

            delta * this.speed

        );

        this.animate();

    }

    /*=========================================================
        ANIMATE

        Only the body is moved here (pushed downward).
        topAssembly and internal upward movement is handled
        exclusively by AssemblyAnimator to avoid conflicts.
    =========================================================*/

    animate() {

        const p = this.progress;

        if (!this.sprayCan) return;

        /*
        Body — push down as the can opens
        */

        this.sprayCan.parts.body.position.y =

            -0.12 * p;

    }

    destroy() {}

}
