class HtmlPageAccessor {
	#id;
	constructor(id) {
		this.#id = id;
	}

	setInputField(newInput) {
		document.getElementById(this.#id).value = newInput.toString();
	}

	getInputFieldInt() {
		return parseInt(document.getElementById(this.#id).value);
	}

	getInputFieldStr() {
		return document.getElementById(this.#id).value;
	}
}

class HtmlPageAccessorCheckBox extends HtmlPageAccessor {
	#id;
	constructor(id) {
		super(id);
		this.#id = id;
	}

	setInputField(newInput) {
		document.getElementById("myCheck").checked = newInput;
	}

	getInputField() {
		return document.getElementById(this.#id).checked;
	}
}
