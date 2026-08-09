/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

AnimationLoop.js

Version 3.2

Master Update Loop

Responsibilities

• Clock
• Timeline
• Reveal Director
• Systems
• Objects
• Mouse Input
• Render

****************************************************************/

import * as THREE from "three";

export default class AnimationLoop {

    constructor(engine) {

        this.engine = engine;

        this.clock = new THREE.Clock();

        this.running = false;

        this.elapsed = 0;

    }

    /*=========================================================
        START
    =========================================================*/

    start() {

        if (this.running) return;

        this.running = true;

        this.clock.start();

        this.animate();

    }

    /*=========================================================
        STOP
    =========================================================*/

    stop() {

        this.running = false;

    }

    /*=========================================================
        LOOP
    =========================================================*/

    animate = () => {

        if (!this.running) return;

        requestAnimationFrame(

            this.animate

        );

        const delta = this.clock.getDelta();

        this.elapsed += delta;

        const safeDelta = Math.min(delta, 0.05);

        this.update(

            safeDelta

        );

        this.render();

    }

    /*=========================================================
        UPDATE
    =========================================================*/

    update(delta) {

        //----------------------------------------
        // Timeline
        //----------------------------------------

        if (

            this.engine.timeline &&

            typeof this.engine.timeline.update === "function"

        ) {

            this.engine.timeline.update(

                delta,

                this.elapsed

            );

        }

        //----------------------------------------
        // Interaction Controller (autoplay driver)
        //----------------------------------------

        if (

            this.engine.interactionController &&

            typeof this.engine.interactionController.update === "function"

        ) {

            this.engine.interactionController.update(

                delta

            );

        }

        //----------------------------------------
        // Reveal Director
        //----------------------------------------

        if (

            this.engine.revealDirector &&

            typeof this.engine.revealDirector.update === "function"

        ) {

            this.engine.revealDirector.update(

                delta,

                this.elapsed

            );

        }

        //----------------------------------------
        // Systems
        //----------------------------------------

        if (

            this.engine.systemManager

        ) {

            this.engine.systemManager.update(

                delta,

                this.elapsed

            );

        }

        //----------------------------------------
        // Objects
        //----------------------------------------

        if (

            this.engine.objectManager

        ) {

            this.engine.objectManager.update(

                delta,

                this.elapsed

            );

        }

        //----------------------------------------
        // Assembly Animator
        //----------------------------------------

        if (

            this.engine.assemblyAnimator

        ) {

            this.engine.assemblyAnimator.update(

                delta

            );

        }

    } 

        /*=========================================================
            RENDER
        =========================================================*/

        render() {

        if (

            !this.engine.scene ||

            !this.engine.camera ||

            !this.engine.renderer

        ) {

            return;

        }

        this.engine.renderer.render(

            this.engine.scene,

            this.engine.camera

        );

    }

    /*=========================================================
        PUBLIC API
    =========================================================*/

    isRunning() {

        return this.running;

    }

    getElapsedTime() {

        return this.elapsed;

    }

    reset() {

        this.elapsed = 0;

        this.clock.stop();

        this.clock.start();

    }

}