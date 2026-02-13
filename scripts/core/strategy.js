import { Coordinate } from "../models/coordinate.js";
import { actual_cost, heuristic_diag } from "./formulas.js";


export class Strategy {

    D = 10; D2 = 14;

    constructor(grid) {
        this.achieved = false

        this.balise = document.getElementById("info");

        this.grid = grid;
    }

    apply() {
        this.achieved = false;
        this.grid.reset();
        this.grid.init();

        if (this.grid.start == null || this.grid.end == null) {
            this.balise.innerHTML = "Les noeuds de départ ou/et de fin n'ont pas été placé.";
        }

        const loop = () => {

            this.__step();
            this.grid.render();

            requestAnimationFrame(loop);
        };

        loop();
    }

    __step() {
        if (this.grid.visited.length === 0) {
            this.achieved = true;
            this.balise.innerHTML = "Aucun chemin n'a été trouvée";
            return;
        }

        let node = this.__smallest(this.grid.visited);

        if (node.x === this.grid.end.x && node.y === this.grid.end.y) {

            this.achieved = true;
            this.__reconstructPath(node);

            this.balise.innerHTML = "Chemin trouvé !";
            return;
        }

        this.__neighbors(node);
        
        if (node.color !== "green" && node.color !== "red") {
            node.color = "#a0d8ff";
        }
        this.grid.removeVisited(node);
        this.grid.closed.push(node);    
    }

    __smallest(nodes) {
        return nodes.reduce((min, node) => {
            if (node.f < min.f) return node;
            if (node.f === min.f && node.h < min.h) return node;
            return min;
        });
    }

    __neighbors(node) {
        let neighbors = this.grid.neighbors(node.coord);
        
        for (let neighbor of neighbors) {
            if (this.grid.closed.includes(neighbor)) continue;
            
            this.__cost(neighbor, node);

            if (!this.grid.visited.includes(neighbor) && neighbor.color !== "black") {
                if (neighbor.color !== "green" && neighbor.color !== "red") neighbor.color = "#3399ff";
                this.grid.visited.push(neighbor);
            }
        } 
    }

    __cost(node, parent) {
        const tentativeG = actual_cost(parent, node, this.D, this.D2);
        if (tentativeG < node.g) {
            node.g = tentativeG;
            node.parent = parent;
        }
        node.h = heuristic_diag(new Coordinate(node.x, node.y), this.grid.end, this.D, this.D2);
    }

    __reconstructPath(endNode) {
        let current = endNode;

        while (current.parent !== null) {
            if (current.color !== "green" && current.color !== "red") {
                current.color = "yellow";
            }
            console.log(current);
            
            current = current.parent;
        }
    }

}