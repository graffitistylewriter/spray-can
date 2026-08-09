/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

MixingMarble.js

Version 2.0

Internal Mixing Marble — Agitation

Responsibilities

• Small sphere that rattles inside the can to agitate paint
• High-polish steel appearance

Update (v2.0)

FIX: Changed material from `chrome` to `marble`.

The `marble` material (added in CanMaterials v3.1) has
tighter clearcoat and slightly cooler colour than the generic
chrome, giving it the appearance of a small polished steel
ball-bearing. The generic `chrome` was shared with all other
chrome parts and couldn't be tuned independently.

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class MixingMarble {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.group.name = "MixingMarble";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const geometry = new THREE.SphereGeometry(

            CanDimensions.MARBLE_RADIUS,

            64,

            64

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.marble       /* FIX: was this.materials.chrome */

        );

        mesh.name = "MixingMarbleMesh";

        mesh.position.y =

            -CanDimensions.BODY_HEIGHT * 0.5

            + CanDimensions.MARBLE_RADIUS

            + 0.28;

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}
