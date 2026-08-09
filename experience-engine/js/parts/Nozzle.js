/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Nozzle.js

Version 6.0

Fat-Cap Spray Nozzle

Responsibilities

• Two-tier fat-cap geometry (wide base + narrower top)
• Spray orifice dot on side face
• Stem socket

Rebuild (v6.0)

Rebuilt from scratch to match the "Ultra Fat" nozzle
reference photos and the nozzle visible in all keyframe
renders (Fig.03 – Fig.05).

Previous geometry (CylinderGeometry r=0.095, h=0.085) was
too small and round — it looked like a smooth ball rather
than a functional flat-topped nozzle cap.

New geometry — two-tier fat cap:

• BASE: Wide flat cylinder — the part your finger presses.
  Matches the wide base tier of the reference nozzle photos.

• TOP: Slightly narrower cylinder — the upper spray head.
  Sits flush on top of the base, giving the two-tier look.

• TOP FACE: CircleGeometry disc caps the top surface flat,
  giving the characteristic flat-top look of a fat cap.

• SPRAY ORIFICE: Small emissive sphere on the front face
  of the top tier — the tiny spray dot seen in Fig.03/04.
  Uses soulDot material so it catches the cyan light.

• SOCKET: Narrow cylinder beneath the base — the valve
  stem socket that connects to the stem assembly.

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

        const R_BASE  = CanDimensions.NOZZLE_RADIUS_BASE;  // 0.115
        const R_TOP   = CanDimensions.NOZZLE_RADIUS_TOP;   // 0.090
        const H_BASE  = CanDimensions.NOZZLE_HEIGHT_BASE;  // 0.072
        const H_TOP   = CanDimensions.NOZZLE_HEIGHT_TOP;   // 0.058

        const baseTop   = H_BASE * 0.5;
        const topCenter = baseTop + H_TOP * 0.5;
        const topTop    = baseTop + H_TOP;

        /*------------------------------------------------------
        Base — wide flat finger-press cylinder
        ------------------------------------------------------*/

        const baseGeo = new THREE.CylinderGeometry(

            R_BASE, R_BASE, H_BASE, 64, 1, false

        );

        const baseMesh = new THREE.Mesh(

            baseGeo,

            this.materials.actuator

        );

        baseMesh.name = "NozzleBase";

        baseMesh.castShadow = true;

        baseMesh.receiveShadow = true;

        this.group.add(baseMesh);

        /*------------------------------------------------------
        Top tier — narrower spray head
        ------------------------------------------------------*/

        const topGeo = new THREE.CylinderGeometry(

            R_TOP, R_TOP, H_TOP, 64, 1, false

        );

        const topMesh = new THREE.Mesh(

            topGeo,

            this.materials.actuator

        );

        topMesh.name = "NozzleTop";

        topMesh.position.y = topCenter;

        topMesh.castShadow = true;

        topMesh.receiveShadow = true;

        this.group.add(topMesh);

        /*------------------------------------------------------
        Top face — flat cap disc (closes the open top)
        ------------------------------------------------------*/

        const faceGeo = new THREE.CircleGeometry(R_TOP, 64);

        const faceMesh = new THREE.Mesh(

            faceGeo,

            this.materials.actuator

        );

        faceMesh.name = "NozzleFace";

        faceMesh.rotation.x = -Math.PI / 2;

        faceMesh.position.y = topTop;

        this.group.add(faceMesh);

        /*------------------------------------------------------
        Spray orifice dot — small emissive sphere on side face.
        Positioned on the front of the top tier.
        The cyan glow distinguishes it even at small scale.
        ------------------------------------------------------*/

        const dotGeo = new THREE.SphereGeometry(0.013, 16, 16);

        const dotMesh = new THREE.Mesh(

            dotGeo,

            this.materials.soulDot

        );

        dotMesh.name = "SprayDot";

        dotMesh.position.set(

            0,

            topCenter + 0.004,

            R_TOP + 0.004

        );

        this.group.add(dotMesh);

        /*------------------------------------------------------
        Stem socket — narrow connector to valve stem below
        ------------------------------------------------------*/

        const socketGeo = new THREE.CylinderGeometry(

            0.026, 0.026, 0.048, 32

        );

        const socketMesh = new THREE.Mesh(

            socketGeo,

            this.materials.rubber

        );

        socketMesh.name = "NozzleSocket";

        socketMesh.position.y = -H_BASE * 0.5 - 0.024;

        socketMesh.castShadow = true;

        this.group.add(socketMesh);

    }

}
