/****************************************************************

LACQUER BRU
EXPERIENCE ENGINE

InteractionController.js

Version 2.0

Master Interaction Controller

Responsibilities

• Scroll Input → RevealDirector progress
• Autoplay — drives full reveal on "BEGIN" click
• CTA / Click triggers
• Enable / Disable

Update (v2.0)

• Added autoplay mode. startAutoplay() triggers a timed
  drive from progress 0 → 1 over AUTOPLAY_DURATION seconds
  using an ease-in-out-cubic curve. Feels like a composed
  camera move, not a mechanical timer.

• Added update(delta) so the autoplay timer runs in the
  animation loop (AnimationLoop.js calls it each frame).

• onScroll() now interrupts autoplay if the user takes
  manual control mid-sequence — scroll always wins.

• Added UI coupling via CSS class: adds 'is-playing' to
  the engine container so the BEGIN button and hints can
  transition out via CSS without JS DOM queries here.

****************************************************************/

import Stage from "./Stage.js";

/*
Autoplay duration in seconds — 0 → 1 progress.

7 seconds gives each stage roughly 1 second of screen time.
Increase to slow it down, decrease to speed it up.
*/

const AUTOPLAY_DURATION = 7.0;

/*
Ease in-out cubic — starts slow, peaks mid-sequence,
settles gently into the discipline grid.
*/

function easeInOutCubic(t) {

    return t < 0.5

        ? 4 * t * t * t

        : 1 - Math.pow(-2 * t + 2, 3) / 2;

}

export default class InteractionController {

    constructor(engine) {

        this.engine = engine;

        this.enabled = true;

        this.hasStarted = false;

        /*------------------------------------------------------
        Autoplay state
        ------------------------------------------------------*/

        this.autoplaying = false;

        this.autoplayElapsed = 0;

        this.autoplayDuration = AUTOPLAY_DURATION;

    }

    /*=========================================================
        UPDATE — called every frame by AnimationLoop
    =========================================================*/

    update(delta) {

        if (!this.autoplaying) return;

        this.autoplayElapsed += delta;

        const raw = this.autoplayElapsed / this.autoplayDuration;

        if (raw >= 1) {

            /*
            Autoplay complete — lock at full progress and stop.
            */

            this.engine.revealDirector.setProgress(1.0);

            this.autoplaying = false;

            return;

        }

        const eased = easeInOutCubic(raw);

        this.engine.revealDirector.setProgress(eased);

    }

    /*=========================================================
        START AUTOPLAY
    =========================================================*/

    startAutoplay() {

        if (this.autoplaying) return;

        /*
        Reset from wherever scroll left the progress.
        Autoplay always starts from 0 for the full show.
        */

        this.autoplayElapsed = 0;

        this.autoplaying = true;

        this.hasStarted = true;

        /*
        Signal the UI layer to hide the BEGIN button and hints.
        */

        if (this.engine.container) {

            this.engine.container.classList.add(

                'is-playing'

            );

        }

    }

    /*=========================================================
        SCROLL — always takes priority over autoplay
    =========================================================*/

    onScroll(progress) {

        if (!this.enabled) return;

        /*
        If the user scrolls while autoplay is running,
        hand control back to scroll immediately.
        */

        if (this.autoplaying) {

            this.autoplaying = false;

        }

        this.engine.revealDirector.setProgress(

            progress

        );

    }

    /*=========================================================
        START EXPERIENCE (legacy / stage-based path)
    =========================================================*/

    startExperience() {

        if (this.hasStarted) return;

        this.hasStarted = true;

        this.engine.setStage(

            Stage.LIFT

        );

    }

    /*=========================================================
        CLICK
    =========================================================*/

    onClick() {

        this.startExperience();

    }

    /*=========================================================
        CTA
    =========================================================*/

    onCTA() {

        this.startAutoplay();

    }

    /*=========================================================
        ENABLE / DISABLE
    =========================================================*/

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

}
