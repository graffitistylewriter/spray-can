/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

Scene.js

Version 0.1

Responsibilities

• Create ThreeJS Scene
• Background
• Fog
• Global Lighting
• Environment Setup

NO Camera
NO Renderer
NO Objects
NO Animation

****************************************************************/

import * as THREE from "three";

export default class SceneManager {

    constructor() {

        this.scene = new THREE.Scene();

        this.createBackground();

        this.createFog();

        this.createLighting();

        console.log("✓ Scene Created");

    }


    /*=========================================================
        BACKGROUND
    =========================================================*/

    createBackground() {

        this.scene.background =
            new THREE.Color(0x090909);

    }


    /*=========================================================
        FOG
    =========================================================*/

    createFog() {

        this.scene.fog =
            new THREE.Fog(

                0x090909,

                12,

                45

            );

    }


    /*=========================================================
        LIGHTING
    =========================================================*/

    createLighting() {

        /*
        Ambient
        ------------------------------------------------------*/

        this.ambientLight =
            new THREE.AmbientLight(

                0xffffff,

                0.65

            );

        this.scene.add(

            this.ambientLight

        );


        /*
        Key Light
        ------------------------------------------------------*/

        this.keyLight =
            new THREE.DirectionalLight(

                0xffffff,

                2.4

            );

        this.keyLight.position.set(

            6,
            10,
            10

        );

        this.scene.add(

            this.keyLight

        );


        /*
        Fill Light
        ------------------------------------------------------*/

        this.fillLight =
            new THREE.DirectionalLight(

                0x7dd8e8,

                0.55

            );

        this.fillLight.position.set(

                -8,
                 2,
                 5

        );

        this.scene.add(

            this.fillLight

        );


        /*
        Rim Light
        ------------------------------------------------------*/

        this.rimLight =
            new THREE.DirectionalLight(

                0xffffff,

                1.4

            );

        this.rimLight.position.set(

                0,
                6,
               -8

        );

        this.scene.add(

            this.rimLight

        );

    }


    /*=========================================================
        UPDATE

        Reserved for future scene animation

    =========================================================*/

    update(delta) {

        // Reserved

    }

}