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

        const bodyProfile = [

            new THREE.Vector2(0.000, -0.050),

            new THREE.Vector2(0.034, -0.050),

            new THREE.Vector2(0.052, -0.042),

            new THREE.Vector2(0.076, -0.026),

            new THREE.Vector2(0.076, -0.002),

            new THREE.Vector2(0.058, 0.010),

            new THREE.Vector2(0.052, 0.060),

            new THREE.Vector2(0.046, 0.072),

            new THREE.Vector2(0.000, 0.072)

        ];

        const bodyGeometry = new THREE.LatheGeometry(bodyProfile, 64);

        const body = new THREE.Mesh(

            bodyGeometry,

            this.materials.plastic

        );

        body.name = "NozzleBody";

        body.castShadow = true;
        body.receiveShadow = true;

        this.group.add(body);

        const fingerPadGeometry = new THREE.CylinderGeometry(

            0.052,

            0.052,

            0.012,

            48

        );

        const fingerPad = new THREE.Mesh(

            fingerPadGeometry,

            this.materials.rubber

        );

        fingerPad.position.y = 0.072;

        fingerPad.scale.z = 0.75;

        fingerPad.castShadow = true;
        fingerPad.receiveShadow = true;

        this.group.add(fingerPad);

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

        socket.position.y = -0.060;

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

        hole.position.set(0, 0.020, 0.078);

        hole.castShadow = true;
        hole.receiveShadow = true;

        this.group.add(hole);

        const directionDot = new THREE.Mesh(

            new THREE.CircleGeometry(0.018, 32),

            this.materials.soulDot

        );

        directionDot.position.set(0, 0.020, 0.085);

        this.group.add(directionDot);

    }

}
