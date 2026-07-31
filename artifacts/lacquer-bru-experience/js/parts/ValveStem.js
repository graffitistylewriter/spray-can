/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ValveStem.js

Version 2.1

Uses Canonical Dimensions

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class ValveStem {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.group.name = "ValveStem";

        this.build();

    }

    build() {

        const geometry = new THREE.CylinderGeometry(

            CanDimensions.STEM_RADIUS,

            CanDimensions.STEM_RADIUS,

            CanDimensions.STEM_HEIGHT,

            48

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.chrome

        );

        mesh.position.y =

            CanDimensions.STEM_HEIGHT * 0.5;

        mesh.name = "ValveStemMesh";

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}