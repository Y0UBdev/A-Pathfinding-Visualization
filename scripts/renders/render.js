
export function renderGrid(grid, canvas, ctx) {
    canvas.width = grid.width * grid.size;
    canvas.height = grid.height * grid.size;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let node of grid.nodes) {
        let x = node.x;
        let y = node.y;
        let color = node.color;

        ctx.fillStyle = color;
        ctx.fillRect(
            x * grid.size,
            y * grid.size,
            grid.size,
            grid.size
        );

        ctx.strokeStyle = "#cccccc";
        ctx.strokeRect(
            x * grid.size,
            y * grid.size,
            grid.size,
            grid.size
        );
    }
}