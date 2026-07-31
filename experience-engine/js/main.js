/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

main.js

Version 4.0

Canonical Application Bootstrap

Responsibilities

• Create Experience Engine
• Attach To DOM
• Expose Debug API

****************************************************************/

import ExperienceEngine from "./engine/ExperienceEngine.js";

window.addEventListener(

    "DOMContentLoaded",

    () => {

        console.clear();

        console.log("=======================================");
        console.log(" Lacquer Bru Experience Engine");
        console.log(" Bootstrap v4.0");
        console.log("=======================================");

        const container =

            document.getElementById(

                "experience-engine"

            );

        if (!container) {

            console.error(

                "Experience Engine container not found."

            );

            return;

        }

        const engine =

            new ExperienceEngine({

                container

            });

        window.engine = engine;

        console.log(

            "✓ Experience Engine Running"

        );

    }

);