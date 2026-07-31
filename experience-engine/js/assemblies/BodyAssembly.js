/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

BodyAssembly.js

Version 3.0

Mechanical Body Assembly

Responsibilities

• Assemble Body Parts
• No Geometry
• No Mesh Creation

****************************************************************/

import * as THREE from "three";

import OuterShell from "../parts/OuterShell.js";
import LabelSleeve from "../parts/LabelSleeve.js";
import BottomRing from "../parts/BottomRing.js";
import BottomCap from "../parts/BottomCap.js";

export default class BodyAssembly {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "BodyAssembly";

        this.createHierarchy();

        this.build();

    }

    /*=========================================================
        Hierarchy
    =========================================================*/

    createHierarchy() {

        this.parts = {

            shell: new THREE.Group(),

            sleeve: new THREE.Group(),

            bottomRing: new THREE.Group(),

            bottomCap: new THREE.Group(),

            cavity: new THREE.Group()

        };

        this.parts.shell.name = "OuterShell";

        this.parts.sleeve.name = "LabelSleeve";

        this.parts.bottomRing.name = "BottomRing";

        this.parts.bottomCap.name = "BottomCap";

        this.parts.cavity.name = "InternalCavity";

        this.group.add(

            this.parts.shell

        );

        this.group.add(

            this.parts.sleeve

        );

        this.group.add(

            this.parts.bottomRing

        );

        this.group.add(

            this.parts.bottomCap

        );

        this.group.add(

            this.parts.cavity

        );

    }

    /*=========================================================
        Build Assembly
    =========================================================*/

    build() {

        /*------------------------------------------------------
        Outer Shell
        ------------------------------------------------------*/

        this.outerShell = new OuterShell(

            this.materials

        );

        this.parts.shell.add(

            this.outerShell.group

        );

        /*------------------------------------------------------
        Label Sleeve
        ------------------------------------------------------*/

        this.labelSleeve = new LabelSleeve(

            this.materials

        );

        this.parts.sleeve.add(

            this.labelSleeve.group

        );

        /*------------------------------------------------------
        Bottom Ring
        ------------------------------------------------------*/

        this.bottomRing = new BottomRing(

            this.materials

        );

        this.parts.bottomRing.add(

            this.bottomRing.group

        );

        /*------------------------------------------------------
        Bottom Cap
        ------------------------------------------------------*/

        this.bottomCap = new BottomCap(

            this.materials

        );

        this.parts.bottomCap.add(

            this.bottomCap.group

        );

    }

}