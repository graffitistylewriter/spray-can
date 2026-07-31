/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ValveCup.js

Version 4.0

Hero Valve Cup

Responsibilities

• Pressed Steel Cup
• Lathed Profile
• Mechanical Accuracy
• Animation Ready

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class ValveCup {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "ValveCup";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        /*
        ---------------------------------------------------------
        Lathed Valve Cup Profile
        ---------------------------------------------------------
        */

        const profile = [];

        profile.push(
            new THREE.Vector2(
                0.000,
                0.000
            )
        );

        profile.push(
            new THREE.Vector2(
                0.055,
                0.000
            )
        );

        profile.push(
            new THREE.Vector2(
                0.072,
                0.006
            )
        );

        profile.push(
            new THREE.Vector2(
                0.088,
                0.015
            )
        );

        profile.push(
            new THREE.Vector2(
                0.104,
                0.026
            )
        );

        profile.push(
            new THREE.Vector2(
                0.118,
                0.036
            )
        );

        profile.push(
            new THREE.Vector2(
                CanDimensions.VALVE_CUP_RADIUS,
                CanDimensions.VALVE_CUP_HEIGHT
            )
        );

        const geometry = new THREE.LatheGeometry(

            profile,

            128

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.chrome

        );

        mesh.rotation.x = Math.PI;

        mesh.position.y =

            (CanDimensions.BODY_HEIGHT * 0.5)
            +
            0.012;

        mesh.name = "ValveCupMesh";

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}