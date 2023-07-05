import { GetRidersByCategorie, GetRiders } from "../../shared/js/riders-api.js";
import { Table } from "../../shared/js/table.js";
import { HtmlComponent } from "../../shared/js/htmlComponent.js";

let Html = new HtmlComponent();

const riders = nodecg.Replicant("Riders");

const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const step = nodecg.Replicant("SelectedCompetitionStep");

step.on("change", (newValue) => {
	document.getElementById("step").innerHTML = newValue;
	fillRankingTable();
});

selectedCategorie.on("change", (newValue) => {
	document.getElementById("categorie").innerHTML = newValue;
	fillRankingTable();
});

function fillRankingTable() {
	let ranking = document.getElementById("ranking");

	// Delete before rebuild
	ranking.innerHTML = "";

	let table = new Table("rankingTable", "ranking");

	table.insertHeader(
		["#", "", "", "Points"],
		["rank", "firstName", "lastName", "score"]
	);

	if (riders.value && selectedCategorie.value) {
		GetRidersByCategorie(selectedCategorie.value)
			.sort(function (a, b) {
				return b.score - a.score;
			})
			.forEach((rider, index) => {
				var newRow = table.addRowIntoBody();

				table.addCellIntoRow(index + 1, newRow).classList.add("rank");
				table
					.addCellIntoRow(rider.firstName, newRow)
					.classList.add("firstName");
				table
					.addCellIntoRow(rider.lastName, newRow)
					.classList.add("lastName");
				table
					.addCellIntoRow(rider.score, newRow)
					.classList.add("score");

				newRow.id = rider.id;
			});
	}
}
