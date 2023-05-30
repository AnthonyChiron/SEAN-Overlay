export class Table {
	constructor(name) {
		this.name = name;
		if (this.name != "") {
			this.table = document.getElementById(this.name);
			this.body = this.table.getElementsByTagName("tbody")[0];
		}
	}

	initTable(divName, name) {
		this.name = name;
		this.div = document.getElementById(divName);
		this.table = document.createElement("table");
		this.table.classList.add(name);
		this.body = document.createElement("tbody");
		this.table.appendChild(this.body);
		this.div.appendChild(this.table);
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
