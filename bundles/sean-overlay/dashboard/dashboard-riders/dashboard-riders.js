const selectedCategorie = nodecg.Replicant("selectedCategorie");
const selectedPool = nodecg.Replicant("selectedPool");
const competitionData = nodecg.Replicant("competitionData");

competitionData.on("change", (newValue) => {
	let categories = [];
	let pools = [];

	if (newValue) {
		// Get categories name
		newValue.forEach((cat) => categories.push(cat.name));
		resetAllSelectOption("competitionCategorieSelect", categories);

		// Get pool name
		newValue
			.find((cat) => cat.name == selectedCategorie.value)
			.riders.forEach((rider) => pools.push(rider.pool));
		resetAllSelectOption("competitionPoolSelect", pools.filter(distinct));

		addRidersInTable(selectedCategorie.value);
	}
});

selectedCategorie.on("change", (newValue) => {
	if (newValue) {
		addRidersInTable(newValue);
		resetAllSelectOption("competitionPoolSelect", parsePoolsFromData());
	}
});

selectedPool.on("change", (newValue) => {
	if (newValue) addRidersInTable(newValue);
});

function refreshCategorie() {
	nodecg.sendMessage("refreshCategorie");
}

function updateSelectedCategorie() {
	const competitionCategorieSelect = document.getElementById(
		"competitionCategorieSelect"
	);
	selectedCategorie.value = competitionCategorieSelect.value;
}

function updateSelectedPool() {
	const competitionPoolSelect = document.getElementById(
		"competitionPoolSelect"
	);
	selectedPool.value = competitionPoolSelect.value;
}

function removeAllSelectOption(selectBox) {
	while (selectBox.options.length > 0) {
		selectBox.remove(0);
	}
}

function resetAllSelectOption(selectName, options) {
	const select = document.getElementById(selectName);
	removeAllSelectOption(select);

	options.forEach((element) => {
		const selectOption = document.createElement("option");
		selectOption.textContent = element;
		selectOption.value = element;
		select.add(selectOption);
	});
}

function addRidersInTable(categorieName) {
	let categorie;
	deleteAllRowFromTable("riders");

	var ridersTable = document
		.getElementById("riders")
		.getElementsByTagName("tbody")[0];

	if (competitionData.value && categorieName) {
		categorie = competitionData.value.find(
			(cat) => cat.name == categorieName
		);
		categorie.riders.forEach((rider) => {
			var newRow = ridersTable.insertRow();

			addRowTable(rider.lastName, newRow);
			addRowTable(rider.firstName, newRow);
			addRowTable(rider.age, newRow);
			addRowTable(rider.pool, newRow);
			addRowTable(rider.score, newRow);
			addRowTable(rider.nat, newRow);
		});
	}
}

function addRowTable(textCell, row) {
	var newCell = row.insertCell();
	var newText = document.createTextNode(textCell);
	newCell.appendChild(newText);
}

function deleteAllRowFromTable(tableName) {
	var ridersTable = document
		.getElementById(tableName)
		.getElementsByTagName("tbody")[0];

	ridersTable.innerHTML = "";
}

function parsePoolsFromData() {
	let pools = [];
	newValue
		.find((cat) => cat.name == selectedCategorie.value)
		.riders.forEach((rider) => pools.push(rider.pool));
	return pools.filter(distinct);
}

function distinct(value, index, self) {
	return self.indexOf(value) === index;
}
