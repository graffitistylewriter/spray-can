/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

BottomRing.js

Version 2.0

Mechanical Bottom Ring

Responsibilities

• Rolled Base Ring
• Structural Support
• Premium Silhouette

****************************************************************/

import * as THREE from "three";

export default class BottomRing {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "BottomRing";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const geometry = new THREE.TorusGeometry(

            0.463,
            0.024,
            32,
            128

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.chrome

        );

        mesh.name = "BottomRingMesh";

        mesh.rotation.x = Math.PI / 2;

        mesh.position.y = -1.05;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}