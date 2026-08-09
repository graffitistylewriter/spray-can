/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

TopAssembly.js

Version 6.0

Hero Mechanical Top Assembly

Responsibilities

• Cap (ActuatorCap — new)
• Shoulder (ShoulderDome — now chrome)
• Valve Cup
• Valve Stem
• Nozzle (fat-cap rebuild)

Update (v6.0)

• Added ActuatorCap — the black protective cap with the cyan
  soul dot. Previously missing entirely; it's the topmost
  part visible in Fig.01 and Fig.02.

• Cap is added to parts hierarchy and positioned at the top
  of the can (y = BODY_HEIGHT/2 + CAP_HEIGHT/2).

• Cap is registered in the assembly parts so AssemblyAnimator
  and ExplosionSystem can drive it independently during the
  stage reveal.

• Nozzle position updated to sit just below the cap, matching
  the assembled state in Fig.01.

****************************************************************/

import * as THREE from "three";
import ShoulderDome from "../parts/ShoulderDome.js";
import ValveCup from "../parts/ValveCup.js";
import ValveStem from "../parts/ValveStem.js";
import Nozzle from "../parts/Nozzle.js";
import ActuatorCap from "../parts/ActuatorCap.js";
import CanDimensions from "../config/CanDimensions.js";
import MechanicalAnimator from "../core/MechanicalAnimator.js";
import MotionProfile from "../core/MotionProfile.js";
import Stage from "../core/Stage.js";

export default class TopAssembly {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "TopAssembly";

        this.createHierarchy();

        this.build();

    }

    /*=========================================================
        HIERARCHY
    =========================================================*/

    createHierarchy() {

        this.parts = {

            cap: new THREE.Group(),

            shoulder: new THREE.Group(),

            valveCup: new THREE.Group(),

            valveStem: new THREE.Group(),

            nozzle: new THREE.Group()

        };

        this.parts.cap.name = "Cap";

        this.parts.shoulder.name = "Shoulder";

        this.parts.valveCup.name = "ValveCup";

        this.parts.valveStem.name = "ValveStem";

        this.parts.nozzle.name = "Nozzle";

        this.group.add(this.parts.cap);

        this.group.add(this.parts.shoulder);

        this.group.add(this.parts.valveCup);

        this.group.add(this.parts.valveStem);

        this.group.add(this.parts.nozzle);

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const bodyTop =
            CanDimensions.BODY_HEIGHT * 0.5;   // 1.05

        /*------------------------------------------------------
        Shoulder Dome
        (now chrome — see ShoulderDome v5.0)
        ------------------------------------------------------*/

        this.shoulder = new ShoulderDome(

            this.materials

        );

        this.parts.shoulder.add(

            this.shoulder.group

        );

        /*------------------------------------------------------
        Valve Cup
        ------------------------------------------------------*/

        this.valveCup = new ValveCup(

            this.materials

        );

        this.parts.valveCup.add(

            this.valveCup.group

        );

        /*------------------------------------------------------
        Valve Stem
        ------------------------------------------------------*/

        this.valveStem = new ValveStem(

            this.materials

        );

        this.parts.valveStem.add(

            this.valveStem.group

        );

        /*------------------------------------------------------
        Nozzle (fat-cap rebuild)

        Positioned just below the cap, sitting at the top of
        the valve stem assembly.
        ------------------------------------------------------*/

        this.nozzle = new Nozzle(

            this.materials

        );

        this.nozzle.group.position.y =

            bodyTop +
            CanDimensions.VALVE_CUP_HEIGHT +
            CanDimensions.STEM_HEIGHT;

        // = 1.05 + 0.045 + 0.135 = 1.23

        this.parts.nozzle.add(

            this.nozzle.group

        );

        /*------------------------------------------------------
        Actuator Cap (new — was missing entirely)

        Positioned so its base rim sits at the top of the
        shoulder dome (y = bodyTop), extending upward.
        ------------------------------------------------------*/

        this.cap = new ActuatorCap(

            this.materials

        );

        /*
        Cap center y = bodyTop + CAP_HEIGHT/2
        = 1.05 + 0.110 = 1.160
        */

        this.cap.group.position.y =

            bodyTop +

            CanDimensions.CAP_HEIGHT * 0.5;

        this.parts.cap.add(

            this.cap.group

        );

    }

    /*=========================================================
        ANIMATE
    =========================================================*/

    animate(stage, delta) {

        switch (stage) {

            case Stage.LIFT:

                MechanicalAnimator.lift(

                    this.group,

                    MotionProfile.LIFT.distance,

                    2.5,

                    delta

                );

                break;

            case Stage.SHOULDER_REVEAL:

                MechanicalAnimator.lift(

                    this.parts.shoulder,

                    MotionProfile.SHOULDER.distance,

                    2.5,

                    delta

                );

                break;

            case Stage.VALVE_REVEAL:

                MechanicalAnimator.extend(

                    this.parts.valveStem,

                    MotionProfile.VALVE.distance,

                    2.8,

                    delta

                );

                MechanicalAnimator.extend(

                    this.parts.nozzle,

                    MotionProfile.VALVE.distance,

                    2.8,

                    delta

                );

                break;

        }

    }

}
