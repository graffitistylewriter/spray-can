import WorldConfig from "../config/WorldConfig.js";

export default class WorldNavigationSystem {

    constructor(engine, revealDirector, worlds = WorldConfig) {

        this.engine = engine;
        this.revealDirector = revealDirector;
        this.worlds = worlds;
        this.build();

    }

    build() {

        const ui = this.engine.container.querySelector("#engine-ui");

        if (!ui) return;

        this.element = document.createElement("nav");

        this.element.id = "world-navigation";
        this.element.setAttribute("aria-label", "Explore Lacquer Bru");

        this.worlds.forEach((world, index) => {

            const node = document.createElement("a");
            const angle = world.angle * (Math.PI / 180);
            const x = 50 + Math.cos(angle) * 39;
            const y = 50 + Math.sin(angle) * 34;

            node.className = "world-node";
            node.href = world.href;
            node.style.setProperty("--world-x", `${x}%`);
            node.style.setProperty("--world-y", `${y}%`);
            node.style.setProperty("--world-delay", `${index * 70}ms`);
            node.innerHTML = `
                <span class="world-index">${String(index + 1).padStart(2, "0")}</span>
                <span class="world-orbit"><span class="world-icon"></span></span>
                <span class="world-title">${world.title}</span>
                <span class="world-description">${world.description}</span>
            `;

            node.addEventListener("click", () => this.engine.enterWorld(world.id));

            this.element.appendChild(node);

        });

        ui.appendChild(this.element);

    }

    update() {

        if (!this.element) return;

        const progress = this.revealDirector.getProgress();
        const amount = Math.min(Math.max((progress - 0.78) / 0.18, 0), 1);

        this.element.style.setProperty("--world-reveal", amount.toFixed(3));
        this.element.classList.toggle("is-active", amount > 0.02);
        this.engine.container.classList.toggle("is-world-revealed", amount > 0.96);

    }

    destroy() {

        this.element?.remove();

    }

}
