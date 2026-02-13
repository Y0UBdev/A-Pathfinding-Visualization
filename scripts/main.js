import { Grid } from "./models/grid.js";
import { stopEvent, applyEvent, bindGridEvents } from "./events/events.js";
import { Strategy } from "./core/strategy.js";

const grid = new Grid(40, 30, 20);
const strategy = new Strategy(grid);

grid.init();
grid.render();

bindGridEvents(grid);
applyEvent(() => strategy.apply());
stopEvent(strategy);