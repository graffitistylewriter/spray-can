/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

LabelSleeve.js

Version 2.1

Uses Canonical Dimensions

****************************************************************/

import * as THREE from "three";

import CanDimensions from "../config/CanDimensions.js";

export default class LabelSleeve {

    constructor(materials) {

        this.materials = materials;

        this.group = new THREE.Group();
        this.group.name = "LabelSleeve";

        this.build();

    }

    build() {

        const texture = this.createIdentityTexture();

        const geometry = new THREE.CylinderGeometry(

            CanDimensions.LABEL_RADIUS,

            CanDimensions.LABEL_RADIUS,

            CanDimensions.LABEL_HEIGHT,

            128,
            2,
            true

        );

        const mesh = new THREE.Mesh(

            geometry,

            new THREE.MeshPhysicalMaterial({

                color: 0xffffff,

                map: texture,

                metalness: 0.08,

                roughness: 0.68,

                clearcoat: 0.08,

                clearcoatRoughness: 0.7,

                side: THREE.DoubleSide

            })

        );

        mesh.name = "LabelSleeveMesh";

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.group.add(mesh);

    }

    createIdentityTexture() {

        const canvas = document.createElement("canvas");

        canvas.width = 1024;

        canvas.height = 2048;

        const context = canvas.getContext("2d");

        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);

        gradient.addColorStop(0, "#111318");

        gradient.addColorStop(0.48, "#050608");

        gradient.addColorStop(1, "#101216");

        context.fillStyle = gradient;

        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "rgba(81, 213, 255, 0.8)";

        context.lineWidth = 5;

        context.fillStyle = "#86e5ff";

        context.font = "700 31px Arial, sans-serif";

        context.textAlign = "center";

        context.letterSpacing = "10px";

        context.save();

        context.translate(canvas.width * 0.16, canvas.height * 0.5);

        context.rotate(-Math.PI / 2);

        context.fillText("GRAFFITI FORMULA / 400ML", 0, 0);

        context.restore();

        context.strokeRect(canvas.width * 0.405, canvas.height * 0.33, canvas.width * 0.19, canvas.width * 0.19);

        context.fillStyle = "#dadde2";

        context.font = "700 164px Arial, sans-serif";

        context.letterSpacing = "0px";

        context.fillText("LB", canvas.width * 0.5, canvas.height * 0.47);

        context.font = "500 40px Arial, sans-serif";

        context.letterSpacing = "12px";

        context.fillText("LACQUER BRU", canvas.width * 0.5, canvas.height * 0.58);

        context.fillStyle = "rgba(220, 224, 230, 0.72)";

        context.font = "500 18px Arial, sans-serif";

        context.letterSpacing = "5px";

        context.fillText("IF NOT UNIQUE, WHY BOTHER.", canvas.width * 0.5, canvas.height * 0.63);

        context.fillStyle = "#5cdcff";

        context.fillRect(canvas.width * 0.38, canvas.height * 0.69, canvas.width * 0.24, 3);

        const texture = new THREE.CanvasTexture(canvas);

        texture.colorSpace = THREE.SRGBColorSpace;

        texture.anisotropy = 4;

        return texture;

    }

}
