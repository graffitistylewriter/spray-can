/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

EnvironmentSystem.js

Version 2.0

Studio Environment

Responsibilities

• Renderer Quality
• Physically Correct Lighting
• Tone Mapping
• Shadows

****************************************************************/

import * as THREE from "three";

export default class EnvironmentSystem {

    constructor(scene, renderer) {

        this.scene = scene;

        this.renderer = renderer;

        this.build();

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

        this.renderer.toneMappingExposure = 1.15;

        this.renderer.shadowMap.enabled = true;

        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.setClearColor(

            0x111111,

            1

        );

        this.scene.fog = new THREE.Fog(

            0x111111,

            12,

            26

        );

    }

    update() {}

    destroy() {}

}