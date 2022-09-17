export class Table {
	constructor(name) {
		this.name = name;
		this.table = document.getElementById(this.name);
		this.body = this.table.getElementsByTagName("tbody")[0];
	}

	deleteAllRowFromBodyTable() {
		if (this.body) this.body.innerHTML = "";
	}

	addRowIntoBody() {
		return this.body.insertRow();
	}

	addCellIntoRow(cellText, row) {
		var newCell = row.insertCell();
		var newText = document.createTextNode(cellText);
		newCell.appendChild(newText);
		return newCell;
	}
}
