import { Coordinate, Grid } from "./models.js";
import { applyEvent, bindGridEvents } from "./events.js";
import { Strategy } from "./strategy.js";

const grid = new Grid(40, 30, 20);
const strategy = new Strategy(grid);

grid.init();
grid.render();

bindGridEvents(grid);
applyEvent(() => strategy.apply());