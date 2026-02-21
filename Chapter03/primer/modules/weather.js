export class WeatherLocation {
    weather;
    city;
    constructor(weather, city) {
        this.weather = weather;
        this.city = city;
    }
    get weatherMessage() {
        return `It is ${this.weather} in ${this.city}`;
    }
}
