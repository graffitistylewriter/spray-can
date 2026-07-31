/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ShoulderDome.js

Version 4.0

Hero Shoulder Dome

Responsibilities

• Pressed Steel Shoulder
• Lathed Geometry
• Production Silhouette
• Hero Asset

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class ShoulderDome {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.group.name = "ShoulderDome";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const profile = [];

        profile.push(new THREE.Vector2(

            CanDimensions.VALVE_CUP_RADIUS,

            0.000

        ));

        profile.push(new THREE.Vector2(

            0.165,

            0.015

        ));

        profile.push(new THREE.Vector2(

            0.235,

            0.040

        ));

        profile.push(new THREE.Vector2(

            0.315,

            0.085

        ));

        profile.push(new THREE.Vector2(

            0.405,

            0.135

        ));

        profile.push(new THREE.Vector2(

            CanDimensions.BODY_RADIUS,

            CanDimensions.SHOULDER_HEIGHT

        ));

        const geometry = new THREE.LatheGeometry(

            profile,

            128

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.body

        );

        mesh.rotation.x = Math.PI;

        mesh.position.y =

            CanDimensions.BODY_HEIGHT * 0.5;

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        mesh.name = "ShoulderDomeMesh";

        this.group.add(mesh);

    }

}