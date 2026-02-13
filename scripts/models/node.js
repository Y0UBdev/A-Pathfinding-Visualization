export class Node {
    constructor(coord) {
        this.coord = coord
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

    equals(node) {
        return this.coord.equals(node.coord);
    }
}