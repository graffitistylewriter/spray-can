/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Camera.js

Version 0.2

Responsibilities

• Create Perspective Camera
• Resize Handling
• Mouse Parallax
• Camera Damping
• Camera Target

Update (v0.2)

• Raised camera Y from 0.25 → 0.45 to match the keyframe
  viewing angle — slightly above centre, looking slightly
  downward at the can, giving it the premium "stage" feel
  seen in Fig.01 and Fig.02.

• Pulled camera back from z=7.5 → z=7.0 and reduced FOV
  from 32° → 28° for a tighter, more compressed look that
  matches the reference images (longer lens feel).

• Target shifted down from (0,0,0) → (0,-0.15,0) so the
  can sits in the lower half of frame like the keyframes.

NO Renderer
NO Scene
NO Objects

****************************************************************/

import * as THREE from "three";

export default class CameraManager {

    constructor() {

        this.camera = new THREE.PerspectiveCamera(

            28,

            window.innerWidth / window.innerHeight,

            0.1,

            100

        );

        /*
        Keyframe-matched camera position.

        Slightly above-centre, looking down toward the can.
        Longer-lens compressed look (FOV 28 vs 32 previously).
        */

        this.camera.position.set(

            0,

            0.45,

            7.0

        );

        /*
        Camera Target

        Shifted slightly below centre so the can reads in
        the lower-middle of the frame, matching Fig.01 and
        Fig.02 where the can sits with breathing room above.
        */

        this.target = new THREE.Vector3(

            0,

            -0.15,

            0

        );

        /*
        Mouse Influence

        These values are driven by MouseController.
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
        Luxury websites never feel like a video game.
        */

        this.strength = 0.20;

        this.damping = 0.048;

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

        this.current.x +=

            (this.mouse.x - this.current.x)

            * this.damping;

        this.current.y +=

            (this.mouse.y - this.current.y)

            * this.damping;

        /*
        Apply Mouse Offset on top of base position.
        Only X and Y are affected — Z stays fixed.
        */

        this.camera.position.x =

            this.current.x * this.strength;

        this.camera.position.y =

            0.45 +

            this.current.y * this.strength;

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
