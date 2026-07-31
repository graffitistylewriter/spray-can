/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

InternalAssembly.js

Version 3.0

Mechanical Internal Assembly

Responsibilities

• Assemble Paint Reservoir
• Assemble Dip Tube
• Assemble Mixing Marble
• Create Vapour Anchor
• Create Soul Anchor

No Geometry
No Mesh Creation

****************************************************************/

import * as THREE from "three";

import PaintReservoir from "../parts/PaintReservoir.js";
import DipTube from "../parts/DipTube.js";
import MixingMarble from "../parts/MixingMarble.js";

export default class InternalAssembly {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "InternalAssembly";

        this.createHierarchy();

        this.build();

    }

    /*=========================================================
        Hierarchy
    =========================================================*/

    createHierarchy() {

        this.parts = {

            paint: new THREE.Group(),

            dipTube: new THREE.Group(),

            marble: new THREE.Group(),

            vapour: new THREE.Group(),

            soul: new THREE.Object3D()

        };

        this.parts.paint.name = "PaintReservoir";

        this.parts.dipTube.name = "DipTube";

        this.parts.marble.name = "MixingMarble";

        this.parts.vapour.name = "VapourAnchor";

        this.parts.soul.name = "SoulAnchor";

        this.group.add(this.parts.paint);

        this.group.add(this.parts.dipTube);

        this.group.add(this.parts.marble);

        this.group.add(this.parts.vapour);

        this.group.add(this.parts.soul);

    }

    /*=========================================================
        Build Assembly
    =========================================================*/

    build() {

        this.paintReservoir = new PaintReservoir(

            this.materials

        );

        this.parts.paint.add(

            this.paintReservoir.group

        );

        this.dipTube = new DipTube(

            this.materials

        );

        this.parts.dipTube.add(

            this.dipTube.group

        );

        this.mixingMarble = new MixingMarble(

            this.materials

        );

        this.parts.marble.add(

            this.mixingMarble.group

        );

    }

}