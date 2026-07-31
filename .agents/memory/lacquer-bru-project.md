---
name: Lacquer Bru Experience Engine
description: Project context, architecture decisions, and sharp edges for the Lacquer Bru scroll-driven 3D spray can experience.
---

## Project
- Brand: **Lacquer Bru** (lacquer like the paint, "bru" = Afrikaans for friend/great times)
- Artifact: `artifacts/lacquer-bru-experience` at previewPath `/`
- GitHub source: https://github.com/graffitistylewriter/spray-can
- Goal: Scroll-triggered spray can explosion revealing internal components — intended as a Shopify theme section

## Key architecture rules

**Renderer canvas**: `RendererManager(canvas, scene, camera)` receives the actual `#engine-canvas` DOM element. Do NOT call `container.appendChild(renderer.domElement)` — canvas is already in the HTML.

**Scroll → animation pipeline**:
`window.scroll` → progress [0,1] → `RevealDirector` → stage enum → `AssemblyAnimator` (reads stage, lerps topAssembly + internal positions) + `ExplosionSystem` (reads progress, lerps body Y offset).

**Property ownership (never let two systems write the same property)**:
- `HoverSystem` → `root.position.x/y`, `root.rotation.x/z`
- `MouseController` → `root.rotation.x/z`, `root.position.x/y` (parallax on top of hover)
- `ExplosionSystem` → `parts.body.position.y` only
- `AssemblyAnimator` → `parts.topAssembly.position.y`, `parts.internal.position.y`

**is-ready class**: `engine.css` keeps `#engine-canvas` at `opacity:0`. `ExperienceEngine.build()` adds `is-ready` to container after full init.

**Scroll spacer**: `#scroll-spacer` is 500vh. Adjust its height to change scroll speed feel.

**RevealDirector stages** (progress thresholds):
- 0.10 → LIFT
- 0.25 → SHOULDER_REVEAL
- 0.40 → VALVE_REVEAL
- 0.60 → INTERNAL_REVEAL
- 0.80 → SOUL_REVEAL
- 1.00 → WORLD_REVEAL

**CanDimensions.js** is the single source of truth for all geometry sizes. Always add new measurements there.

## Bugs fixed (do not reintroduce)
1. Renderer received width/height numbers instead of canvas element
2. `is-ready` class never added → canvas permanently opacity:0
3. `SprayCan` created broken `AssemblyAnimator` without `revealDirector` → crash on every frame
4. No scroll event listener → scrolling did nothing; `html/body` had `overflow:hidden`
5. Unclosed `.engine-hover` CSS rule in engine.css

**Why:** These were wiring mismatches between the v3.0 refactor (which split animation into systems) and older code that hadn't been updated to match.

## User preferences
- Has clear artistic vision — follow their keyframe references exactly for part positions
- 16 years creative industry experience; Lacquer Bru is a full-service studio (graffiti → branding → Shopify)
- Reveal stages must match the user's keyframe images — do not change positions without checking them
