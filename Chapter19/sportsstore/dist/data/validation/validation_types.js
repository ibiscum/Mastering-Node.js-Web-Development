export class ValidationStatus {
    value;
    invalid = false;
    constructor(value) {
        this.value = value;
    }
    get isInvalid() {
        return this.invalid;
    }
    setInvalid(newValue) {
        this.invalid = newValue || this.invalid;
    }
    messages = [];
}
