/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ActuatorCap.js

Version 1.0

Hero Protective Cap — the top black piece with the blue dot

New file (v1.0)

This part was previously missing from the 3D model. In every
keyframe (Fig.01 through Fig.03) the cap is the dominant top
piece of the assembled can — a tall black cylinder with a
rounded top and the signature cyan LED dot at its crown.

Component breakdown:

• BODY: Main cylindrical cap body, slightly tapered from base
  to top. `actuator` material — dark near-black matte plastic,
  distinct from the matte-black body to read as a different
  material in the hero lighting.

• DOME: Partial sphere caps the top. Gives the cap its
  characteristic rounded profile seen in every keyframe.

• SOUL DOT: Small emissive cyan sphere at the crown of the
  dome. This is the single most distinctive detail of the
  Lacquer Bru can — visible in every keyframe as a tiny blue
  pinpoint. Uses `soulDot` material which pulses in Fig.04.

• INNER LIP: Thin torus ring at the bottom of the cap marks
  where the cap would grip the shoulder neck. Gives the cap
  a finished, machined edge in close-up renders.

Positioning (in TopAssembly space):

Cap base sits at y = BODY_HEIGHT/2 (= 1.05) — flush with
the top of the body cylinder. Cap extends upward from there.

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class ActuatorCap {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();

        this.group.name = "ActuatorCap";

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const R  = CanDimensions.CAP_RADIUS;   // 0.205
        const H  = CanDimensions.CAP_HEIGHT;   // 0.220

        /*------------------------------------------------------
        Body — main cylindrical cap
        Slightly tapered: narrower at top than at base
        ------------------------------------------------------*/

        const bodyGeo = new THREE.CylinderGeometry(

            R * 0.965,      // top radius — 0.198
            R,              // base radius — 0.205
            H,
            64,
            2,
            false

        );

        const bodyMesh = new THREE.Mesh(

            bodyGeo,

            this.materials.actuator

        );

        bodyMesh.name = "CapBody";

        bodyMesh.castShadow = true;

        bodyMesh.receiveShadow = true;

        this.group.add(bodyMesh);

        /*------------------------------------------------------
        Dome — rounded top
        Partial sphere (upper 55° arc) for subtle dome shape
        ------------------------------------------------------*/

        const domeR = R * 0.965;  // matches top of cylinder

        const domeGeo = new THREE.SphereGeometry(

            domeR,
            64,
            32,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.38      // ~68° arc — a low rounded dome

        );

        const domeMesh = new THREE.Mesh(

            domeGeo,

            this.materials.actuator

        );

        domeMesh.name = "CapDome";

        domeMesh.position.y = H * 0.5;

        domeMesh.castShadow = true;

        this.group.add(domeMesh);

        /*------------------------------------------------------
        Soul Dot — cyan emissive LED crown
        The signature blue pinpoint at the very top of the cap.
        ------------------------------------------------------*/

        const dotH = domeR * (1 - Math.cos(Math.PI * 0.38));

        const dotGeo = new THREE.SphereGeometry(0.022, 24, 24);

        const dotMesh = new THREE.Mesh(

            dotGeo,

            this.materials.soulDot

        );

        dotMesh.name = "SoulDot";

        /*
        Position at the apex of the dome.
        y = H/2 (top of cylinder) + dome height
        */

        dotMesh.position.y = H * 0.5 + dotH;

        this.group.add(dotMesh);

        /*------------------------------------------------------
        Inner lip ring — base edge detail
        ------------------------------------------------------*/

        const lipGeo = new THREE.TorusGeometry(

            R - 0.006,
            0.007,
            12,
            64

        );

        const lipMesh = new THREE.Mesh(

            lipGeo,

            this.materials.chrome

        );

        lipMesh.name = "CapLip";

        lipMesh.rotation.x = Math.PI / 2;

        lipMesh.position.y = -H * 0.5;

        this.group.add(lipMesh);

    }

}
