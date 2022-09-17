import { GetRiders } from "../../shared/js/riders-api.js";
import { Table } from "../../shared/js/table.js";

const riders = nodecg.Replicant("Riders");

const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const totalPool = nodecg.Replicant("TotalPool");
const selectedRider = nodecg.Replicant("SelectedRider");

const poolTable = new Table("poolTable");

selectedCategorie.on("change", (newValue) => {
	if (newValue) fillPoolTable();
	lightSelectedRider(selectedRider.value);
});

selectedPool.on("change", (newValue) => {
	if (newValue) {
		document.getElementById("selectedPool").innerHTML = newValue;
		fillPoolTable();
		lightSelectedRider(selectedRider.value);
	}
});

selectedRider.on("change", (newValue) => {
	if (newValue) lightSelectedRider(newValue);
});

totalPool.on("change", (newValue) => {
	if (newValue) document.getElementById("totalPool").innerHTML = newValue;
});

function fillPoolTable() {
	poolTable.deleteAllRowFromBodyTable();

	if (riders.value && selectedPool.value && selectedCategorie.value) {
		GetRiders(selectedCategorie.value, selectedPool.value).forEach(
			(rider) => {
				var newRow = poolTable.addRowIntoBody();

				poolTable
					.addCellIntoRow(rider.firstName, newRow)
					.classList.add("first");
				poolTable
					.addCellIntoRow(rider.lastName, newRow)
					.classList.add("last");

				newRow.id = rider.id;
			}
		);
	}
}
function lightSelectedRider(riderId) {
	let prevSelected = document.getElementsByClassName("selectedRider");
	while (prevSelected.length)
		prevSelected[0].classList.remove("selectedRider");

	let newSelected = document.getElementById(riderId);
	if (newSelected) newSelected.classList.add("selectedRider");
}
