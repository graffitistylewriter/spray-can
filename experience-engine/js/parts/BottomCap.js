/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

BottomCap.js

Version 2.0

Mechanical Bottom Cap

Responsibilities

• Aluminium Base
• Rolled Base Plate
• Structural Closure

****************************************************************/

import * as THREE from "three";

export default class BottomCap {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "BottomCap";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const geometry = new THREE.CircleGeometry(

            0.468,

            128

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.chrome

        );

        mesh.name = "BottomCapMesh";

        mesh.rotation.x = -Math.PI / 2;

        mesh.position.y = -1.05;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}