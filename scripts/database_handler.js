class DataBaseHandler {
    constructor(){
        // THIS IS GOING TO HORRIFY YOU PRETEND THIS ISN'T HERE
		this.#table = {};
    }

    query(row, column) {
        this.#table[row][column]
    }
}