/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

DipTube.js

Version 2.0

Internal Dip Tube — Fluid Transfer

Responsibilities

• Long internal tube that draws paint from the can bottom
• Translucent acrylic material (was wrongly using plastic)

Update (v2.0)

FIX: Changed material from `plastic` (white opaque) to
`dipTube` (translucent blue-tinted acrylic). The dip tube
in the reference images and keyframes reads as a clear
translucent acrylic tube, not white plastic. This makes it
visible and gives it the glass-like quality seen in Fig.03
where the tube is a highlighted component.

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

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        const geometry = new THREE.CylinderGeometry(

            CanDimensions.DIP_TUBE_RADIUS,

            CanDimensions.DIP_TUBE_RADIUS,

            CanDimensions.DIP_TUBE_HEIGHT,

            48

        );

        const mesh = new THREE.Mesh(

            geometry,

            this.materials.dipTube      /* FIX: was this.materials.plastic */

        );

        mesh.name = "DipTubeMesh";

        mesh.position.y =

            CanDimensions.DIP_TUBE_HEIGHT * 0.5

            - CanDimensions.BODY_HEIGHT * 0.5

            + 0.09;

        mesh.castShadow = true;

        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

}
