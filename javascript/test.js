import * as Astronomy from "./astronomy-engine.js";
import { DateTime } from "./luxon.js";

const t_date = DateTime.fromObject(
  { year: 1992, month: 4, day: 12 },
  { zone: "utc" }
).toJSDate();
const t = new Astronomy.AstroTime(t_date);
console.log(Astronomy.Libration(t));
