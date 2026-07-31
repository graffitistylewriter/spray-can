/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

SystemManager.js

Version 2.0

Responsibilities

• Register Systems
• Update Systems
• Destroy Systems

****************************************************************/

export default class SystemManager {

    constructor() {

        this.systems = [];

    }

    /*=========================================================
        REGISTER
    =========================================================*/

    register(system) {

        if (!system) return;

        this.systems.push(system);

    }

    /*=========================================================
        UPDATE
    =========================================================*/

    update(delta, elapsed) {

        for (const system of this.systems) {

            if (

                system &&

                typeof system.update === "function"

            ) {

                system.update(

                    delta,

                    elapsed

                );

            }

        }

    }

    /*=========================================================
        DESTROY
    =========================================================*/

    destroy() {

        for (const system of this.systems) {

            if (

                system &&

                typeof system.destroy === "function"

            ) {

                system.destroy();

            }

        }

        this.systems.length = 0;

    }

}