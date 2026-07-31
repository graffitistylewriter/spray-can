/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

PaintReservoir.js

Version 2.1

Uses Canonical Dimensions

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class PaintReservoir {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "PaintReservoir";

        this.build();

    }

    build() {

        const geometry = new THREE.CylinderGeometry(

            CanDimensions.PAINT_RADIUS,

            CanDimensions.PAINT_RADIUS,

            CanDimensions.PAINT_HEIGHT,

            96,

            8,

            false

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.paint

        );

        mesh.name = "PaintReservoirMesh";

        mesh.position.y = -0.10;

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}