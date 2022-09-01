const competitionCategorie = nodecg.Replicant("competitionCategorie");
const selectedCompetitionCategorie = nodecg.Replicant(
	"selectedCompetitionCategorie"
);

function refreshCategorie() {
	nodecg.sendMessage("refreshCategorie");
}

competitionCategorie.on("change", (newValue) => {
	const categorieSelect = document.getElementById(
		"competitionCategorieSelect"
	);
	removeAllSelectOption(categorieSelect);

	newValue.forEach((element) => {
		const selectOption = document.createElement("option");
		selectOption.textContent = element;
		selectOption.value = element;
		categorieSelect.add(selectOption);
	});
});

function updateCompetitionCategorie() {
	const competitionCategorieSelect = document.getElementById(
		"competitionCategorieSelect"
	);
	selectedCompetitionCategorie.value = competitionCategorieSelect.value;
}

function removeAllSelectOption(selectBox) {
	while (selectBox.options.length > 0) {
		selectBox.remove(0);
	}
}
