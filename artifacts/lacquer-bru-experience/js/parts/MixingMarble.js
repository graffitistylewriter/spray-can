/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

MixingMarble.js

Version 2.0

Mechanical Mixing Marble

Responsibilities

• Steel Mixing Ball
• Paint Agitator
• Internal Detail

****************************************************************/

import * as THREE from "three";

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

            0.085,

            64,

            64

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.chrome

        );

        mesh.name = "MixingMarbleMesh";

        mesh.position.set(

            0.0,

            -0.72,

            0.0

        );

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}