/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

LightingSystem.js

Version 2.0

Studio Lighting System

Responsibilities

• Ambient Fill
• Key Light
• Rim Light
• Top Light

****************************************************************/

import * as THREE from "three";

export default class LightingSystem {

    constructor(scene) {

        this.scene = scene;

        this.group = new THREE.Group();
        this.group.name = "StudioLighting";

        this.build();

        this.scene.add(this.group);

    }

    /*=========================================================
        BUILD
    =========================================================*/

    build() {

        /*------------------------------------------------------
        Ambient
        ------------------------------------------------------*/

        const ambient = new THREE.AmbientLight(

            0xffffff,

            0.45

        );

        ambient.name = "Ambient";

        this.group.add(ambient);

        /*------------------------------------------------------
        Key Light
        ------------------------------------------------------*/

        const key = new THREE.DirectionalLight(

            0xffffff,

            3.0

        );

        key.position.set(

            4,

            6,

            5

        );

        key.castShadow = true;

        key.shadow.mapSize.set(

            2048,

            2048

        );

        key.name = "KeyLight";

        this.group.add(key);

        /*------------------------------------------------------
        Rim Light
        ------------------------------------------------------*/

        const rim = new THREE.DirectionalLight(

            0xffffff,

            1.4

        );

        rim.position.set(

            -5,

            3,

            -5

        );

        rim.name = "RimLight";

        this.group.add(rim);

        /*------------------------------------------------------
        Top Strip
        ------------------------------------------------------*/

        const top = new THREE.DirectionalLight(

            0xffffff,

            0.9

        );

        top.position.set(

            0,

            8,

            0

        );

        top.name = "TopLight";

        this.group.add(top);

    }

    update() {}

    destroy() {

        this.scene.remove(

            this.group

        );

    }

}