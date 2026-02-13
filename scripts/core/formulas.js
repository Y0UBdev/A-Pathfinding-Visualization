
export function heuristic_diag(coord, goal, cost_ortho = 10, cost_diag = 14) {
    const delta = coord.subtract(goal);

    const ho = heuristic_ortho(delta, cost_ortho);

    return ho + (cost_diag - 2 * cost_ortho) * Math.min(delta.x, delta.y);
}

export function heuristic_ortho(delta, cost) {
    return cost * (delta.x + delta.y)
}

export function actual_cost(parent, node, cost_ortho = 10, cost_diag = 14) {
    const delta = node.coord.subtract(parent.coord);
    const cost = delta.isDiag() ? cost_diag : cost_ortho;
    
    return parent.g + cost;
}

