import { distinct } from "../../shared/js/utli.js";
import { Select } from "../../shared/js/select.js";
import { Table } from "../../shared/js/table.js";

const selectedCategorie = nodecg.Replicant("selectedCategorie");
const selectedPool = nodecg.Replicant("selectedPool");
const selectedRider = nodecg.Replicant("selectedRider");
const competitionData = nodecg.Replicant("competitionData");

const categorieSelect = new Select("categories");
const poolSelect = new Select("pools");
const riderSelect = new Select("rider");

const riderTable = new Table("riders");

//*
//* Rafraichissement des données
//*
competitionData.on("change", (newValue) => {
	let categories = [];
	let pools = [];

	if (newValue) {
		// Get categories name
		newValue.forEach((cat) => categories.push(cat.name));
		categorieSelect.addOptionsFromArray(categories);

		// Get pool name
		newValue
			.find((cat) => cat.name == selectedCategorie.value)
			.riders.forEach((rider) => pools.push(rider.pool));
		poolSelect.addOptionsFromArray(parsePoolsFromData());

		// Get rider name
		riderSelect.addOptionsFromArray(
			parseRiderFromPool(
				categorieSelect.firstValue,
				poolSelect.firstValue
			)
		);

		// Fill table
		fillRidersTable(categorieSelect.firstValue);
		lightSelectedPool(poolSelect.firstValue);
		lightSelectedRider(riderSelect.firstValue);

		selectedCategorie.value = categorieSelect.firstValue;
		selectedPool.value = poolSelect.firstValue;
	}
});

//*
//* Rafraichissement de la catégorie sélectionnée
//*
selectedCategorie.on("change", (newValue) => {
	if (newValue) {
		console.log(newValue);
		fillRidersTable(newValue);
		poolSelect.addOptionsFromArray(parsePoolsFromData());
		riderSelect.addOptionsFromArray(
			parseRiderFromPool(newValue, poolSelect.firstValue)
		);

		lightSelectedPool(poolSelect.firstValue);
		lightSelectedRider(riderSelect.firstValue);
	}
});

//*
//* Rafraichissement de la poule sélectionnée
//*
selectedPool.on("change", (newValue) => {
	unlightSelectedPool();
	lightSelectedPool(newValue);
	riderSelect.addOptionsFromArray(
		parseRiderFromPool(selectedCategorie.value, newValue)
	);
	unlightSelectedRider();
	lightSelectedRider(riderSelect.firstValue);
});

//*
//* Rafraichissement de la poule sélectionnée
//*
selectedPool.on("change", (newValue) => {
	unlightSelectedPool();
	lightSelectedPool(newValue);
});

//*
//* Rafraichissement du rider sélectionné
//*
selectedRider.on("change", (newValue) => {
	unlightSelectedRider();
	lightSelectedRider(newValue);
});

function fillRidersTable(categorieName) {
	riderTable.deleteAllRowFromBodyTable();

	if (competitionData.value && categorieName) {
		let categorie = competitionData.value.find(
			(cat) => cat.name == categorieName
		);
		categorie.riders.forEach((rider) => {
			var newRow = riderTable.addRowIntoBody();

			riderTable.addCellIntoRow(rider.lastName, newRow);
			riderTable.addCellIntoRow(rider.firstName, newRow);
			riderTable.addCellIntoRow(rider.age, newRow);
			riderTable.addCellIntoRow(rider.pool, newRow);
			riderTable.addCellIntoRow(rider.score, newRow);
			riderTable.addCellIntoRow(rider.nat, newRow);

			newRow.id = rider.lastName + " " + rider.firstName;
			newRow.classList.add("pool-" + rider.pool);
		});
	}
}

//*
//* Gestion du surlignage de la poule sélectionnée
//*
function lightSelectedPool(selected) {
	let newSelected = document.getElementsByClassName("pool-" + selected);
	for (let i = 0; i < newSelected.length; i++) {
		newSelected[i].classList.add("selectedPool");
	}
}
function unlightSelectedPool() {
	let prevSelected = document.getElementsByClassName("selectedPool");
	while (prevSelected.length)
		prevSelected[0].classList.remove("selectedPool");
}

//*
//* Gestion du surlignage du rider sélectionné
//*
function lightSelectedRider(fullName) {
	let newSelected = document.getElementById(fullName);
	if (newSelected) newSelected.classList.add("selectedRider");
}
function unlightSelectedRider() {
	let prevSelected = document.getElementsByClassName("selectedRider");
	while (prevSelected.length)
		prevSelected[0].classList.remove("selectedRider");
}

//? UTILS
function parsePoolsFromData() {
	let pools = [];
	if (competitionData.value)
		competitionData.value
			.find((cat) => cat.name == selectedCategorie.value)
			.riders.forEach((rider) => pools.push(rider.pool));
	let test = pools.filter(distinct);
	return test;
}

function parseRiderFromPool(categorie, pool) {
	let riders = [];
	if (competitionData.value)
		competitionData.value
			.find((cat) => cat.name == categorie)
			.riders.forEach((rider) => {
				if (rider.pool == pool)
					riders.push(rider.lastName + " " + rider.firstName);
			});
	return riders;
}
