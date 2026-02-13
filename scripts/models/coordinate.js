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

    toString() {
        return `[${this.x};${this.y}]`;
    }

    isDiag() {
        return (this.x === 1 && this.y === 1) ? true : false;
    }
}