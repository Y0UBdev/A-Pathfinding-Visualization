
export class Strategy {

    constructor(grid) {
        this.achieved = false

        this.grid = grid;
    }

    apply() {
        if (this.grid.start == null || this.grid.end == null) {
            throw "Les noeuds de départ ou/et de fin n'ont pas été placé."
        }

        const loop = () => {

            if (this.achieved) return;

            this.step();
            this.grid.render();

            requestAnimationFrame(loop);
        };

        loop();
    }

    step() {
        if (this.achieved) return;

        if (this.grid.visited.length === 0) {
            this.achieved = true;
            throw "Aucun chemin n'a été trouvée.";
            return;
        }
    }

} 