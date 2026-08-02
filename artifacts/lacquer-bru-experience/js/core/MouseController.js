/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

MouseController.js

Version 2.0

Responsibilities

• Mouse Tracking
• Smooth Damping
• Rotation Target
• Parallax Motion
• Public Mouse API

****************************************************************/

import * as THREE from "three";

export default class MouseController {

    constructor(engine) {

        this.engine = engine;

        this.target = new THREE.Vector2();
        this.current = new THREE.Vector2();

        this.isDragging = false;
        this.startPointer = new THREE.Vector2();
        this.startRotation = new THREE.Vector2();

        this.enabled = true;

        /*------------------------------------------------------
        Settings
        ------------------------------------------------------*/

        this.rotationAmount = 0.005;
        this.damping = 0.1;

        this.bindEvents();

    }

    /*=========================================================
        Events
    =========================================================*/

    bindEvents() {

        this.canvas = this.engine.container.querySelector("#engine-canvas");

        this.canvas?.addEventListener("pointerdown", this.onPointerDown);

        window.addEventListener("pointermove", this.onPointerMove);

        window.addEventListener("pointerup", this.onPointerUp);

        window.addEventListener("pointercancel", this.onPointerUp);

    }

    /*=========================================================
        Mouse Move
    =========================================================*/

    onPointerDown = (event) => {

        if (event.button !== 0 || event.pointerType === "touch") return;

        this.isDragging = true;

        this.startPointer.set(event.clientX, event.clientY);

        this.startRotation.copy(this.target);

        this.canvas?.setPointerCapture?.(event.pointerId);

        this.engine.container.classList.add("is-dragging");

    }

    /*=========================================================
        CLICK
    =========================================================*/

    onPointerMove = (event) => {

        if (!this.isDragging) return;

        const x = event.clientX - this.startPointer.x;

        const y = event.clientY - this.startPointer.y;

        this.target.x = THREE.MathUtils.clamp(

            this.startRotation.x - y * this.rotationAmount,

            -0.42,

            0.42

        );

        this.target.y = this.startRotation.y + x * this.rotationAmount;

    }

    onPointerUp = (event) => {

        if (!this.isDragging) return;

        this.isDragging = false;

        if (this.canvas?.hasPointerCapture?.(event.pointerId)) {

            this.canvas.releasePointerCapture(event.pointerId);

        }

        this.engine.container.classList.remove("is-dragging");

    }

    /*=========================================================
        Update
    =========================================================*/

    update(delta) {

        if (!this.enabled) return;

        this.current.lerp(

            this.target,

            this.damping

        );

        const can = this.engine.sprayCan.parts.interaction;

        if (!can) return;

        //----------------------------------------
        // Rotation
        //----------------------------------------

        can.rotation.x = this.current.x;

        can.rotation.y = this.current.y;

    }

    /*=========================================================
        Destroy
    =========================================================*/

    destroy() {

        this.canvas?.removeEventListener("pointerdown", this.onPointerDown);

        window.removeEventListener("pointermove", this.onPointerMove);

        window.removeEventListener("pointerup", this.onPointerUp);

        window.removeEventListener("pointercancel", this.onPointerUp);

    }

}
