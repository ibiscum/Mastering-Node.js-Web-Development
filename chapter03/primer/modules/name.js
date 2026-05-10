export class Name {
    first;
    second;
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    get nameMessage() {
        return `Hello ${this.first} ${this.second}`;
    }
}
