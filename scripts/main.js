import { Grid } from "./models.js";
import { bindGridEvents } from "./events.js";

const grid = new Grid(40, 30, 20);

grid.init();
grid.render();

bindGridEvents(grid);