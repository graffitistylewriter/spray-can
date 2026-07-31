/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

OuterShell.js

Version 3.0

Mechanical Outer Shell

Responsibilities

• Main Aluminium Body
• Premium Silhouette
• Correct Proportions
• Production Geometry

****************************************************************/

import * as THREE from "three";

export default class OuterShell {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "OuterShell";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const geometry = new THREE.CylinderGeometry(

            0.495,
            0.495,
            2.10,
            128,
            8,
            false

        );

        geometry.translate(

            0,
            0,
            0

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.body

        );

        mesh.name = "OuterShellMesh";

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}