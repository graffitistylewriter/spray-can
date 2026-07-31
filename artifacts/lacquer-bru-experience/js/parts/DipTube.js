/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

DipTube.js

Version 2.1

Uses Canonical Dimensions

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class DipTube {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.group.name = "DipTube";

        this.build();

    }

    build() {

        const geometry = new THREE.CylinderGeometry(

            CanDimensions.DIP_TUBE_RADIUS,

            CanDimensions.DIP_TUBE_RADIUS,

            CanDimensions.DIP_TUBE_HEIGHT,

            48

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.plastic

        );

        mesh.name = "DipTubeMesh";

        /*
        Tube hangs from valve
        */

        mesh.position.y =

            CanDimensions.DIP_TUBE_HEIGHT * 0.28;

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}