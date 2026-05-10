import { Name, WeatherLocation } from "./modules/index.js";

const name = new Name("Adam", "Freeman");
const loc = new WeatherLocation("raining", "London");

console.log(name.nameMessage);
console.log(loc.weatherMessage);
