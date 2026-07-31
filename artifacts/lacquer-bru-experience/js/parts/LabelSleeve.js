/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

LabelSleeve.js

Version 2.1

Uses Canonical Dimensions

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class LabelSleeve {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "LabelSleeve";

        this.build();

    }

    build() {

        const geometry = new THREE.CylinderGeometry(

            CanDimensions.LABEL_RADIUS,

            CanDimensions.LABEL_RADIUS,

            CanDimensions.LABEL_HEIGHT,

            128,
            2,
            true

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.label

        );

        mesh.name = "LabelSleeveMesh";

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}