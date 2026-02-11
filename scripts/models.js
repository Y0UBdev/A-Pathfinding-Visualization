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

    add(coord) {
        return new Coordinate(this.x + coord.x, this.y + coord.y);
    }

    equals(x, y) {
        return this.x === x && this.y === y
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

        this.NEIGHBOR = [
            // cardinal
            new Coordinate(0, -1), new Coordinate(1, 0), new Coordinate(0, 1), new Coordinate(-1, 0), 
            // diagonal
            new Coordinate(-1, -1), new Coordinate(1, -1), new Coordinate(1, 1), new Coordinate(-1, 1) 
        ]
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
                    else if (this.isIn(this.blocks, coord)) node.color = "black";

                this.visited.push(node);
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

    smallestNeighbor(node) {
        const coord = new Coordinate(node.x, node.y)
        let neighbor = this.neighbor(coord)
    }

    neighbor(coord) {
        let neighbor = this.NEIGHBOR.map(n => coord.add(n));
        return this.visited.filter(node => neighbor.some(c => c.equals(node.x, node.y)));
    }
}