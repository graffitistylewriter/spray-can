/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

CanMaterials.js

Version 3.1

Central Material Library

Responsibilities

• Body — dead matte black powder coat
• Label — slightly lighter matte for label area
• Chrome — polished steel for shoulder dome + valve parts
• Actuator — dark near-black matte (the cap)
• SoulDot — cyan emissive for the LED dot on actuator top
• DipTube — translucent glass/acrylic for the dip tube
• Marble — polished steel sphere
• Paint — dark near-black for paint reservoir
• Rubber — soft matte black

Update (v3.1)

Reworked to match the Montana Gold 400ml reference model and
the keyframe aesthetic:

• Body: darkened further (0x111111 → 0x0c0c0c), roughness
  raised (0.34 → 0.72), metalness lowered (0.78 → 0.55).
  The keyframe body is a MATTE powder coat — not shiny metal.
  The previous values were too metallic/reflective.

• Chrome: shifted from pure silver to a slightly warmer
  gunmetal (0xd7d7d7 → 0xc8ccd6) with lower roughness
  (0.14 → 0.08) and tighter clearcoat. Matches the
  shoulder dome and valve cup in the reference model.

• Added actuator: near-black matte plastic for the cap body.
  Separate from body so the cap reads as a different material.

• Added soulDot: cyan emissive for the small LED on top of
  the actuator, visible in every keyframe as a tiny blue dot.

• Added dipTube: translucent with slight blue tint, matching
  the reference dip tube which reads as clear acrylic/glass.

• Added marble: high-polish chrome sphere for the mixing
  marble that floats freely during the explosion reveal.

****************************************************************/

import * as THREE from "three";

export default class CanMaterials {

    constructor() {

        /*------------------------------------------------------
        Body — Dead Matte Powder Coat

        The keyframe body is a deep satin/matte black.
        Metalness ~0.5 so it catches rim light as a subtle
        sheen without reading as polished metal.
        ------------------------------------------------------*/

        this.body = new THREE.MeshPhysicalMaterial({

            color: 0x0c0c0c,

            metalness: 0.52,

            roughness: 0.72,

            clearcoat: 0.08,

            clearcoatRoughness: 0.60

        });

        /*------------------------------------------------------
        Label Sleeve

        Slightly lighter than body, more matte.
        The LB logo area needs good readability.
        ------------------------------------------------------*/

        this.label = new THREE.MeshPhysicalMaterial({

            color: 0x1a1a1a,

            metalness: 0.04,

            roughness: 0.80,

            clearcoat: 0.10,

            clearcoatRoughness: 0.65,

            side: THREE.DoubleSide

        });

        /*------------------------------------------------------
        Chrome — Polished Gunmetal Steel

        Used on: shoulder dome, valve cup, valve stem,
        base ring, bottom cap. The keyframe chrome catches
        the rim light sharply and reads with a cool blue-
        silver tone.
        ------------------------------------------------------*/

        this.chrome = new THREE.MeshPhysicalMaterial({

            color: 0xc2c8d6,

            metalness: 1.0,

            roughness: 0.06,

            clearcoat: 1.0,

            clearcoatRoughness: 0.01,

            envMapIntensity: 1.2

        });

        /*------------------------------------------------------
        Actuator (Cap)

        Near-black hard plastic. Slightly warmer and softer
        than the body. The cap is injection-moulded plastic,
        not powder coat — it has a different quality to it.
        ------------------------------------------------------*/

        this.actuator = new THREE.MeshPhysicalMaterial({

            color: 0x111216,

            metalness: 0.0,

            roughness: 0.65,

            clearcoat: 0.18,

            clearcoatRoughness: 0.40

        });

        /*------------------------------------------------------
        Soul Dot — Cyan Emissive LED

        The small glowing blue dot on top of the actuator
        cap. Visible as a cyan pinpoint in every keyframe.
        EmissiveIntensity is deliberately soft at rest —
        it will pulse and strengthen when the soul awakens.
        ------------------------------------------------------*/

        this.soulDot = new THREE.MeshPhysicalMaterial({

            color: 0x00d4ff,

            emissive: 0x00aaff,

            emissiveIntensity: 0.9,

            metalness: 0.0,

            roughness: 0.15

        });

        /*------------------------------------------------------
        Dip Tube — Translucent Acrylic

        The long internal tube that draws paint from the
        bottom of the can. Reads as clear/slightly blue-
        tinted acrylic in the reference images.
        ------------------------------------------------------*/

        this.dipTube = new THREE.MeshPhysicalMaterial({

            color: 0xc8e8ff,

            metalness: 0.0,

            roughness: 0.08,

            transmission: 0.55,

            transparent: true,

            opacity: 0.70,

            ior: 1.45

        });

        /*------------------------------------------------------
        Mixing Marble — High Polish Steel Sphere

        Small sphere that rattles inside the can to agitate
        paint. Highly polished chrome/steel. Floats freely
        during the explosion reveal.
        ------------------------------------------------------*/

        this.marble = new THREE.MeshPhysicalMaterial({

            color: 0xb8bec8,

            metalness: 1.0,

            roughness: 0.04,

            clearcoat: 1.0,

            clearcoatRoughness: 0.01

        });

        /*------------------------------------------------------
        Plastic — Generic white/off-white plastic

        Used for nozzle tip, minor fittings.
        ------------------------------------------------------*/

        this.plastic = new THREE.MeshPhysicalMaterial({

            color: 0xe8e8ea,

            metalness: 0.0,

            roughness: 0.52

        });

        /*------------------------------------------------------
        Rubber — Soft matte black

        Gaskets, seals, soft fittings.
        ------------------------------------------------------*/

        this.rubber = new THREE.MeshPhysicalMaterial({

            color: 0x1a1a1a,

            metalness: 0.0,

            roughness: 0.95

        });

        /*------------------------------------------------------
        Paint Reservoir — Dark translucent interior

        The paint body inside the can. Near-black with very
        slight depth/translucency.
        ------------------------------------------------------*/

        this.paint = new THREE.MeshPhysicalMaterial({

            color: 0x0a0a0f,

            metalness: 0.08,

            roughness: 0.12,

            transmission: 0.0

        });

    }

}
