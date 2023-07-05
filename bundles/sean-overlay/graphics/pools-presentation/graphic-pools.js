import { GetRidersByCategorie, GetRiders } from "../../shared/js/riders-api.js";
import { Table } from "../../shared/js/table.js";
import { HtmlComponent } from "../../shared/js/htmlComponent.js";

let Html = new HtmlComponent();

const riders = nodecg.Replicant("Riders");

const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const step = nodecg.Replicant("SelectedCompetitionStep");
const totalPool = nodecg.Replicant("TotalPool");
const selectedRider = nodecg.Replicant("SelectedRider");

step.on("change", (newValue) => {
	document.getElementById("step").innerHTML = newValue;
	fillPoolTable();
});

selectedCategorie.on("change", (newValue) => {
	document.getElementById("categorie").innerHTML = newValue;
	fillPoolTable();
});

selectedPool.on("change", (newValue) => {
	fillPoolTable();
});

function fillPoolTable() {
	let currentPool = 0;
	let riderTables = [];

	// Delete before rebuild
	document.getElementById("tables").innerHTML = "";

	createTable(riderTables, currentPool);

	if (riders.value && selectedPool.value && selectedCategorie.value) {
		GetRidersByCategorie(selectedCategorie.value).forEach((rider) => {
			if (rider.pool != currentPool + 1) {
				currentPool++;
				createTable(riderTables, currentPool);
			}

			var newRow = riderTables[currentPool].addRowIntoBody();

			riderTables[currentPool]
				.addCellIntoRow(rider.firstName, newRow)
				.classList.add("firstName");
			riderTables[currentPool]
				.addCellIntoRow(rider.lastName, newRow)
				.classList.add("lastName");

			newRow.id = rider.id;
		});
	}
}

function createTable(riderTables, currentPool) {
	let tables = document.getElementById("tables");
	let div = Html.createDiv("Poule" + (currentPool + 1), "poule");
	tables.appendChild(div);
	div.appendChild(Html.createTitle("Poule " + (currentPool + 1)));
	div.appendChild(Html.createDiv("separator", "separator"));

	riderTables.push(
		new Table("TablePoule" + (currentPool + 1), "Poule" + (currentPool + 1))
	);
}
