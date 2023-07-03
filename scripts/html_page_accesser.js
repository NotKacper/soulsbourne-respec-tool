class HtmlPageAccessor {
    #id;
    constructor(id) {
        this.#id = id;
    }
    
    setInputField(newInput) {
        document.getElementById(this.#id).value = newInput.toString();
    }

    getInputField() {
        return document.getElementById(this.#id).value;
    }
}