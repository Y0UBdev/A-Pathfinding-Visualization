import { renderGrid } from "../renders/render.js";
import { Coordinate } from "./coordinate.js";
import { Node } from "./node.js";

export class Grid {
    constructor(width, height, cellSize = 20) {
        this.width = width;
        this.height = height;
        this.size = cellSize;

        this.start = null;
        this.end = null;
        this.blocks = [];
        
        this.nodes = [];
        this.visited = [];
        this.closed = [];
    }

    reset() {
        this.nodes = [];
        this.visited = [];
        this.closed = [];
    }

    init() {
        this.reset();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let coord = new Coordinate(x, y);
                let node = new Node(coord);

                if (this.start && x === this.start.x && y === this.start.y) {
                    node.color = "green";
                    node.g = 0;
                    this.visited.push(node);
                } else if (this.end && x === this.end.x && y === this.end.y) {
                    node.color = "red";
                } else if (this.isIn(this.blocks, coord)) {
                    node.color = "black";
                }

                this.nodes.push(node);
            }
        }
    }

    render() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        renderGrid(this, canvas, ctx);
    }

    isIn(list, coord) {
        return list.some(node => coord.equals(node.x, node.y));
    }

    neighbors(coord) {
        const NEIGHBOR = [
            // cardinal
            new Coordinate(0, -1), new Coordinate(1, 0), new Coordinate(0, 1), new Coordinate(-1, 0), 
            // diagonal
            new Coordinate(-1, -1), new Coordinate(1, -1), new Coordinate(1, 1), new Coordinate(-1, 1) 
        ]

        let neighbors = []
        for (let delta of NEIGHBOR) {
            neighbors.push(coord.add(delta))
        }

        return this.nodes.filter(node => neighbors.some(c => c.equals(node.x, node.y)));
    }

    removeVisited(node) {
        var index = this.visited.indexOf(node);
        if (index !== -1) {
            this.visited.splice(index, 1);
        }
    }
}