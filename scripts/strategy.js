
export class Strategy {

    constructor(grid) {
        this.start = grid.start;
        this.end = grid.end;
        this.blocks = grid.blocks;

        this.visited = grid.visited;
        this.closed = grid.closed;

        this.grid = grid;
    }

    apply() {
        while (this.visited.length > 0) {
            
        }
    }

} 