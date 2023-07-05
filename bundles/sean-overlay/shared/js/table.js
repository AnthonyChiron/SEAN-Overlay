export class Table {
	constructor(name, divName) {
		this.name = name;
		if (this.name != "" && divName != "") {
			this.initTable(divName);
		}
	}

	initTable(divName) {
		this.div = document.getElementById(divName);
		this.table = document.createElement("table");
		this.table.classList.add(this.name);
		this.body = document.createElement("tbody");
		this.table.appendChild(this.body);
		this.div.appendChild(this.table);
	}

	insertHeader(headers, className) {
		this.header = this.table.appendChild(document.createElement("thead"));
		let row = this.header.insertRow();
		for (let index = 0; index < headers.length; index++) {
			this.addCellIntoRow(headers[index], row).classList.add(
				className[index]
			);
		}
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
