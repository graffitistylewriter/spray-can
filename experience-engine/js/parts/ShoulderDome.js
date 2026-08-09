/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

ShoulderDome.js

Version 5.0

Hero Shoulder Dome — the signature chrome dome

Responsibilities

• Pressed chrome steel shoulder
• Lathed geometry matching keyframe silhouette
• Connects body cylinder to valve/cap assembly

Update (v5.0)

The two critical fixes that bring the shoulder dome in line
with the keyframe references:

FIX 1 — Material changed from `body` → `chrome`.
The shoulder dome in every keyframe is clearly a polished
chrome/steel piece, not the same matte black as the body.
The previous `body` material made it invisible against the
can body.

FIX 2 — Profile height raised from 0.180 → 0.420 and the
curve reworked with more points to create the pronounced
S-curve dome visible in Fig.01 through Fig.05. The old 0.18
height produced a nearly-flat taper that read as part of
the body instead of a distinct chrome dome.

Profile geometry (LatheGeometry with rx: Math.PI flip):
Points are defined narrow-to-wide (top-to-bottom before
flip). After rx=PI the narrow end points upward. Positioned
at y = BODY_HEIGHT / 2 so the wide base aligns with the
top of the body cylinder.

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

        /*
        Lathe profile — defines the shoulder silhouette.

        Points: (radius, height) from narrow end (top) to
        wide end (bottom). The rx: Math.PI flip inverts them
        so the narrow end points up in world space.

        Curve is a flowing S — tight near the valve opening,
        sweeping wide through the mid-section, flattening as
        it meets the body cylinder diameter.
        */

        const profile = [

            new THREE.Vector2(0.145, 0.000),

            new THREE.Vector2(0.155, 0.028),

            new THREE.Vector2(0.178, 0.075),

            new THREE.Vector2(0.225, 0.148),

            new THREE.Vector2(0.298, 0.238),

            new THREE.Vector2(0.378, 0.322),

            new THREE.Vector2(0.448, 0.385),

            new THREE.Vector2(0.495, 0.420)

        ];

        const geometry = new THREE.LatheGeometry(

            profile,

            128

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.chrome   /* FIX: was this.materials.body */

        );

        mesh.rotation.x = Math.PI;

        mesh.position.y = CanDimensions.BODY_HEIGHT * 0.5;

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        mesh.name = "ShoulderDomeMesh";

        this.group.add(mesh);

    }

}
