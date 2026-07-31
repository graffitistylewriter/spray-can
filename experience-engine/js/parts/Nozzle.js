/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Nozzle.js

Version 5.0

Hero Spray Nozzle

Responsibilities

• Finger Button
• Stem Socket
• Spray Orifice
• Hero Geometry

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class Nozzle {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "Nozzle";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        /*
        ---------------------------------------------------------
        Main Button
        ---------------------------------------------------------
        */

        const bodyGeometry = new THREE.CylinderGeometry(

            0.095,
            0.105,
            CanDimensions.NOZZLE_HEIGHT,
            64

        );

        const body = new THREE.Mesh(

            bodyGeometry,

            this.materials.plastic

        );

        body.name = "NozzleBody";

        body.castShadow = true;
        body.receiveShadow = true;

        this.group.add(body);

        /*
        ---------------------------------------------------------
        Finger Cap
        ---------------------------------------------------------
        */

        const capGeometry = new THREE.SphereGeometry(

            0.105,

            64,

            32,

            0,

            Math.PI * 2,

            0,

            Math.PI * 0.45

        );

        const cap = new THREE.Mesh(

            capGeometry,

            this.materials.plastic

        );

        cap.position.y =

            CanDimensions.NOZZLE_HEIGHT * 0.5;

        cap.castShadow = true;
        cap.receiveShadow = true;

        this.group.add(cap);

        /*
        ---------------------------------------------------------
        Stem Socket
        ---------------------------------------------------------
        */

        const socketGeometry = new THREE.CylinderGeometry(

            0.026,

            0.026,

            0.050,

            32

        );

        const socket = new THREE.Mesh(

            socketGeometry,

            this.materials.rubber

        );

        socket.position.y =

            -CanDimensions.NOZZLE_HEIGHT * 0.5;

        socket.castShadow = true;
        socket.receiveShadow = true;

        this.group.add(socket);

        /*
        ---------------------------------------------------------
        Spray Orifice
        ---------------------------------------------------------
        */

        const holeGeometry = new THREE.CylinderGeometry(

            0.010,

            0.010,

            0.012,

            24

        );

        const hole = new THREE.Mesh(

            holeGeometry,

            this.materials.chrome

        );

        hole.rotation.x = Math.PI / 2;

        hole.position.set(

            0,

            0.018,

            0.097

        );

        hole.castShadow = true;
        hole.receiveShadow = true;

        this.group.add(hole);

    }

}