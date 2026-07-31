/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Camera.js

Version 0.1

Responsibilities

• Create Perspective Camera
• Resize Handling
• Mouse Parallax
• Camera Damping
• Camera Target

NO Renderer
NO Scene
NO Objects

****************************************************************/

import * as THREE from "three";

export default class CameraManager {

    constructor() {

        this.camera = new THREE.PerspectiveCamera(

            32,

            window.innerWidth / window.innerHeight,

            0.1,

            100

        );

        /*
        Initial Camera Position

        Matches the premium hero angle from the
        existing prototype.
        */

        this.camera.position.set(

            0,

            0.25,

            7.5

        );

        /*
        Camera Target
        */

        this.target = new THREE.Vector3(

            0,

            0,

            0

        );

        /*
        Mouse Influence

        These values will eventually be driven
        by MouseController.
        */

        this.mouse = {

            x: 0,

            y: 0

        };

        this.current = {

            x: 0,

            y: 0

        };

        /*
        Camera Strength

        Small movements only.

        Luxury websites should never feel like
        a video game.
        */

        this.strength = 0.22;

        this.damping = 0.055;

        /*
        Resize

        */

        window.addEventListener(

            "resize",

            () => this.resize()

        );

        this.resize();

        console.log("✓ Camera Created");

    }

    /*=========================================================

        UPDATE

    =========================================================*/

    update(delta) {

        /*
        Smooth Damping

        */

        this.current.x +=

            (this.mouse.x - this.current.x)

            * this.damping;

        this.current.y +=

            (this.mouse.y - this.current.y)

            * this.damping;

        /*
        Apply Offset

        */

        this.camera.position.x =

            this.current.x * this.strength;

        this.camera.position.y =

            0.25 +

            this.current.y * this.strength;

        /*
        Always Look Towards Centre

        */

        this.camera.lookAt(

            this.target

        );

    }

    /*=========================================================

        Mouse Input

    =========================================================*/

    setMouse(x, y) {

        this.mouse.x = x;

        this.mouse.y = y;

    }

    /*=========================================================

        Resize

    =========================================================*/

    resize() {

        this.camera.aspect =

            window.innerWidth /

            window.innerHeight;

        this.camera.updateProjectionMatrix();

    }

}