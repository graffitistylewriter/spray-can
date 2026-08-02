import * as THREE from "three";

const soulProgress = (progress) => {

    const value = THREE.MathUtils.clamp((progress - 0.62) / 0.26, 0, 1);

    return value * value * (3 - 2 * value);

};

export default class SoulSystem {

    constructor(sprayCan, revealDirector, lightingSystem) {

        this.sprayCan = sprayCan;
        this.revealDirector = revealDirector;
        this.lightingSystem = lightingSystem;
        this.time = 0;

        this.build();

    }

    build() {

        this.group = new THREE.Group();
        this.group.name = "Aerosoul";
        this.group.position.set(0.02, 0.26, 0.08);

        this.coreMaterial = new THREE.MeshBasicMaterial({

            color: 0x40dfff,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending

        });

        this.core = new THREE.Mesh(

            new THREE.IcosahedronGeometry(0.16, 3),
            this.coreMaterial

        );

        this.group.add(this.core);

        this.rings = [0.27, 0.38, 0.53].map((radius, index) => {

            const material = new THREE.MeshBasicMaterial({

                color: index === 1 ? 0xb5f5ff : 0x21cfff,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending

            });

            const ring = new THREE.Mesh(

                new THREE.TorusGeometry(radius, 0.004, 12, 80),
                material

            );

            ring.rotation.set(index * 0.9, index * 0.45, index * 0.7);

            this.group.add(ring);

            return ring;

        });

        const positions = [];

        for (let index = 0; index < 240; index += 1) {

            const radius = 0.2 + Math.random() * 0.88;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions.push(

                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)

            );

        }

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

        this.particleMaterial = new THREE.PointsMaterial({

            color: 0x48dfff,
            size: 0.018,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            blending: THREE.AdditiveBlending

        });

        this.particles = new THREE.Points(geometry, this.particleMaterial);

        this.group.add(this.particles);

        this.sprayCan.internalAssembly.parts.soul.add(this.group);

    }

    update(delta) {

        this.time += delta;

        const amount = soulProgress(this.revealDirector.getProgress());
        const pulse = 1 + Math.sin(this.time * 2.8) * 0.08 * amount;

        this.group.visible = amount > 0.001;
        this.group.scale.setScalar((0.35 + amount * 0.65) * pulse);
        this.coreMaterial.opacity = amount * 0.95;
        this.particleMaterial.opacity = amount * 0.82;

        this.core.rotation.y += delta * (0.6 + amount * 1.8);
        this.particles.rotation.y += delta * (0.12 + amount * 0.45);
        this.particles.rotation.z += delta * 0.08;

        this.rings.forEach((ring, index) => {

            ring.material.opacity = amount * (0.38 - index * 0.06);
            ring.rotation.x += delta * (0.14 + index * 0.06) * amount;
            ring.rotation.y -= delta * (0.18 + index * 0.08) * amount;

        });

        this.lightingSystem?.setSoulIntensity(0.12 + amount * 2.5);

    }

    destroy() {

        this.group?.removeFromParent();

    }

}
