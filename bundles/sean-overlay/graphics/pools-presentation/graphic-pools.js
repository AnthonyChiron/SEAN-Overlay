import { GetRiders } from "../../shared/js/riders-api.js";
import { Table } from "../../shared/js/table.js";

const riders = nodecg.Replicant("Riders");

const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const totalPool = nodecg.Replicant("TotalPool");
const selectedRider = nodecg.Replicant("SelectedRider");

const poolTable = new Table("poolTable");

function fillPoolTable() {
	poolTable.deleteAllRowFromBodyTable();

	if (riders.value && selectedPool.value && selectedCategorie.value) {
		GetRiders(selectedCategorie.value, selectedPool.value).forEach(
			(rider) => {
				var newRow = poolTable.addRowIntoBody();

				poolTable
					.addCellIntoRow(rider.firstName, newRow)
					.classList.add("firstName");
				poolTable
					.addCellIntoRow(rider.lastName, newRow)
					.classList.add("lastName");

				newRow.id = rider.id;
			}
		);
	}
}
