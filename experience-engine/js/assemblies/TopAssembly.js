/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

TopAssembly.js

Version 5.0

Hero Mechanical Top Assembly

Responsibilities

• Shoulder
• Valve Cup
• Valve Stem
• Nozzle

****************************************************************/

import * as THREE from "three";
import ShoulderDome from "../parts/ShoulderDome.js";
import ValveCup from "../parts/ValveCup.js";
import ValveStem from "../parts/ValveStem.js";
import Nozzle from "../parts/Nozzle.js";
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

            shoulder: new THREE.Group(),

            valveCup: new THREE.Group(),

            valveStem: new THREE.Group(),

            nozzle: new THREE.Group()

        };

        this.parts.shoulder.name = "Shoulder";

        this.parts.valveCup.name = "ValveCup";

        this.parts.valveStem.name = "ValveStem";

        this.parts.nozzle.name = "Nozzle";

        this.group.add(this.parts.shoulder);

        this.group.add(this.parts.valveCup);

        this.group.add(this.parts.valveStem);

        this.group.add(this.parts.nozzle);

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        this.shoulder = new ShoulderDome(

            this.materials

        );

        this.parts.shoulder.add(

            this.shoulder.group

        );

        this.valveCup = new ValveCup(

            this.materials

        );

        this.parts.valveCup.add(

            this.valveCup.group

        );

        this.valveStem = new ValveStem(

            this.materials

        );

        this.parts.valveStem.add(

            this.valveStem.group

        );

        this.nozzle = new Nozzle(

            this.materials

        );

        this.nozzle.group.position.y =

            CanDimensions.BODY_HEIGHT * 0.5 +

            CanDimensions.VALVE_CUP_HEIGHT +

            CanDimensions.STEM_HEIGHT;

        this.parts.nozzle.add(

            this.nozzle.group

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