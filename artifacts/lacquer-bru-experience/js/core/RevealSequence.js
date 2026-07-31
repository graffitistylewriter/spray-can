/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

RevealSequence.js

Version 1.0

Reveal Choreography

Responsibilities

• Stage Progress
• Assembly Timing
• Sequence Mapping

****************************************************************/

import Stage from "./Stage.js";

export default class RevealSequence {

    constructor() {

        this.sequence = [

            {
                stage: Stage.IDLE,
                start: 0.00,
                end: 0.05
            },

            {
                stage: Stage.HOVER,
                start: 0.05,
                end: 0.15
            },

            {
                stage: Stage.SHOULDER_REVEAL,
                start: 0.15,
                end: 0.30
            },

            {
                stage: Stage.VALVE_REVEAL,
                start: 0.30,
                end: 0.45
            },

            {
                stage: Stage.INTERNAL_REVEAL,
                start: 0.45,
                end: 0.65
            },

            {
                stage: Stage.PAINT_REVEAL,
                start: 0.65,
                end: 0.82
            },

            {
                stage: Stage.SOUL_REVEAL,
                start: 0.82,
                end: 0.94
            },

            {
                stage: Stage.WORLD_REVEAL,
                start: 0.94,
                end: 1.00
            }

        ];

    }

    getStage(progress) {

        for (const item of this.sequence) {

            if (

                progress >= item.start &&

                progress <= item.end

            ) {

                return item.stage;

            }

        }

        return Stage.IDLE;

    }

}