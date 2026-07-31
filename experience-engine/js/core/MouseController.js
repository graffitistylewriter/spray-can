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

        this.mouse = new THREE.Vector2();
        this.target = new THREE.Vector2();
        this.current = new THREE.Vector2();

        this.enabled = true;

        /*------------------------------------------------------
        Settings
        ------------------------------------------------------*/

        this.rotationAmount = 0.35;
        this.parallaxAmount = 0.06;
        this.damping = 0.08;

        this.bindEvents();

    }

    /*=========================================================
        Events
    =========================================================*/

    bindEvents() {

        window.addEventListener(

            "mousemove",

            this.onMouseMove

        );

        window.addEventListener(

            "click",

            this.onClick

        );

    }

    /*=========================================================
        Mouse Move
    =========================================================*/

    onMouseMove = (event) => {

        this.target.x =

            (event.clientX / window.innerWidth) * 2 - 1;

        this.target.y =

            -(event.clientY / window.innerHeight) * 2 + 1;

    }

    /*=========================================================
        CLICK
    =========================================================*/

    onClick = () => {

        if (

            this.engine.interactionController

        ) {

            this.engine.interactionController.onClick();

        }

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

        const can = this.engine.sprayCan.root;

        if (!can) return;

        //----------------------------------------
        // Rotation
        //----------------------------------------

        can.rotation.x += (

            this.current.y *

            this.rotationAmount -

            can.rotation.x

        ) * 0.08;

        can.rotation.z += (

            -this.current.x *

            this.rotationAmount -

            can.rotation.z

        ) * 0.08;

        //----------------------------------------
        // Position Parallax
        //----------------------------------------

        can.position.x += (

            this.current.x *

            this.parallaxAmount -

            can.position.x

        ) * 0.05;

        can.position.y += (

            this.current.y *

            this.parallaxAmount -

            can.position.y

        ) * 0.05;

    }

    /*=========================================================
        Destroy
    =========================================================*/

    destroy() {

        window.removeEventListener(

            "mousemove",

            this.onMouseMove

        );

        window.removeEventListener(

            "click",

            this.onClick

        );

    }