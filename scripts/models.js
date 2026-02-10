import { renderGrid } from "../scripts/render.js";

export class Node {
    constructor(coord) {
        this.x = coord.x;
        this.y = coord.y;

        this.g = Infinity;
        this.h = 0;

        this.color = "gray";
        
        this.parent = null;
    }

    get f() {
        return this.g + this.h;
    }
}

export class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    subtract(coord) {
        return new Coordinate(Math.abs(this.x - coord.x), Math.abs(this.y - coord.y));
    }
}

export class Grid {
    constructor(width, height, cellSize = 20) {
        this.width = width;
        this.height = height;
        this.size = cellSize;

        this.start = null;
        this.end = null;
        this.blocks = [];
        
        this.visited = [];
        this.closed = [];
    }

    reset() {
        this.visited = [];
        this.closed = [];
    }

    init() {
        this.visited = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let coord = new Coordinate(x, y);
                let node = new Node(coord);

                if (this.start && x === this.start.x && y === this.start.y) node.color = "green";
                    else if (this.end && x === this.end.x && y === this.end.y) node.color = "red";
                    else if (this.isIn(this.blocks, x, y)) node.color = "black";

                this.visited.push(node);
            }
        }
    }

    render() {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        renderGrid(this, canvas, ctx);
    }

    isIn(list, x, y) {
        return list.some(n => n.x === x && n.y === y);
    }

    smallest() {
        return         
    }
}