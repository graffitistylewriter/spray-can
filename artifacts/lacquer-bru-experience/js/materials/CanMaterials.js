/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

CanMaterials.js

Version 3.0

Central Material Library

Responsibilities

• Body
• Label
• Chrome
• Plastic
• Rubber
• Paint

****************************************************************/

import * as THREE from "three";

export default class CanMaterials {

    constructor() {

        /*------------------------------------------------------
        Matte Powder Coated Body
        ------------------------------------------------------*/

        this.body = new THREE.MeshPhysicalMaterial({

            color: 0x111111,

            metalness: 0.78,

            roughness: 0.34,

            clearcoat: 0.22,

            clearcoatRoughness: 0.20

        });

        /*------------------------------------------------------
        Label Sleeve
        ------------------------------------------------------*/

        this.label = new THREE.MeshPhysicalMaterial({

            color: 0x1c1c1c,

            metalness: 0.02,

            roughness: 0.56,

            clearcoat: 0.32,

            clearcoatRoughness: 0.10,

            side: THREE.DoubleSide

        });

        /*------------------------------------------------------
        Chrome
        ------------------------------------------------------*/

        this.chrome = new THREE.MeshPhysicalMaterial({

            color: 0xd7d7d7,

            metalness: 1.0,

            roughness: 0.14,

            clearcoat: 1.0,

            clearcoatRoughness: 0.02

        });

        /*------------------------------------------------------
        Plastic
        ------------------------------------------------------*/

        this.plastic = new THREE.MeshPhysicalMaterial({

            color: 0xf3f3f3,

            metalness: 0.0,

            roughness: 0.58

        });

        /*------------------------------------------------------
        Rubber
        ------------------------------------------------------*/

        this.rubber = new THREE.MeshPhysicalMaterial({

            color: 0x242424,

            metalness: 0.0,

            roughness: 0.90

        });

        /*------------------------------------------------------
        Paint
        ------------------------------------------------------*/

        this.paint = new THREE.MeshPhysicalMaterial({

            color: 0x0f0f10,

            metalness: 0.05,

            roughness: 0.08,

            transmission: 0.0

        });

    }

}