import { GetRidersByCategorie, GetRiders } from "../../shared/js/riders-api.js";
import { Table } from "../../shared/js/table.js";

const riders = nodecg.Replicant("Riders");

const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const step = nodecg.Replicant("SelectedCompetitionStep");
const totalPool = nodecg.Replicant("TotalPool");
const selectedRider = nodecg.Replicant("SelectedRider");

const riderTable = new Table("ridersTable");

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
	riderTable.deleteAllRowFromBodyTable();

	if (riders.value && selectedPool.value && selectedCategorie.value) {
		GetRidersByCategorie(selectedCategorie.value).forEach((rider) => {
			var newRow = riderTable.addRowIntoBody();

			riderTable
				.addCellIntoRow(rider.firstName, newRow)
				.classList.add("firstName");
			riderTable
				.addCellIntoRow(rider.lastName, newRow)
				.classList.add("lastName");
			riderTable.addCellIntoRow(rider.pool, newRow).classList.add("pool");

			newRow.id = rider.id;
		});
	}
}
