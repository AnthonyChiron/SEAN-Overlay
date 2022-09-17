import {
	GetRiders,
	GetCategories,
	GetPoolsFromCategorie,
	ParseRiderFullName,
} from "../../shared/js/riders-api.js";
import { Select } from "../../shared/js/select.js";
import { Table } from "../../shared/js/table.js";

const riders = nodecg.Replicant("Riders");

const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const totalPool = nodecg.Replicant("TotalPool");
const selectedRider = nodecg.Replicant("SelectedRider");

const categorieSelect = new Select("categories");
const poolSelect = new Select("pools");
const riderSelect = new Select("rider");

const riderTable = new Table("riders");

//*
//* Rafraichissement des données
//*
riders.on("change", (newValue) => {
	if (newValue) {
		document.getElementById("refreshDataBtn").classList.remove("danger");

		fillSelectCategorie();
		fillSelectPool();
		fillSelectRider();

		fillRidersTable(categorieSelect.firstValue);

		lightSelectedPool(poolSelect.firstValue);
		lightSelectedRider(riderSelect.firstValue);
	}
});

//*
//* SELECTED ITEMS ON CHANGE
//*
selectedCategorie.on("change", (newValue) => {
	if (newValue && riders.value) {
		fillRidersTable(newValue);
		fillSelectPool();
		fillSelectRider();

		lightSelectedPool(selectedPool.value);
	}
});

selectedPool.on("change", (newValue) => {
	if (newValue && riders.value) {
		lightSelectedPool(selectedPool.value);

		fillSelectRider();
		lightSelectedRider(riderSelect.firstValue);
	}
});

selectedRider.on("change", (newValue) => {
	lightSelectedRider(newValue);
});

function fillSelectCategorie() {
	categorieSelect.addOptionsFromArray(GetCategories());
	selectedCategorie.value = categorieSelect.firstValue;
}

function fillSelectPool() {
	poolSelect.addOptionsFromArray(
		GetPoolsFromCategorie(selectedCategorie.value)
	);
	selectedPool.value = poolSelect.firstValue;
	totalPool.value = poolSelect.lastValue;
}

function fillSelectRider() {
	let riderSelectText = [];
	let riderSelectValue = [];

	GetRiders(selectedCategorie.value, selectedPool.value).forEach((rider) => {
		riderSelectValue.push(rider.id);
		riderSelectText.push(ParseRiderFullName(rider));
	});
	riderSelect.addOptionsFromArrayWithValues(
		riderSelectText,
		riderSelectValue
	);
	selectedRider.value = riderSelect.firstValue;
}

function fillRidersTable(categorieName) {
	riderTable.deleteAllRowFromBodyTable();

	if (riders.value && categorieName) {
		riders.value
			.filter((rider) => rider.categorie == categorieName)
			.sort((a, b) => a.pool - b.pool)
			.forEach((rider) => {
				var newRow = riderTable.addRowIntoBody();

				riderTable.addCellIntoRow(rider.lastName, newRow);
				riderTable.addCellIntoRow(rider.firstName, newRow);
				riderTable.addCellIntoRow(rider.age, newRow);
				riderTable.addCellIntoRow(rider.pool, newRow);
				riderTable.addCellIntoRow(rider.score, newRow);
				riderTable.addCellIntoRow(rider.nat, newRow);

				newRow.id = rider.id;
				newRow.classList.add("pool-" + rider.pool);
			});
	}
}

//?
//? UTILS
//?
function lightSelectedPool(selected) {
	let prevSelected = document.getElementsByClassName("selectedPool");
	while (prevSelected.length)
		prevSelected[0].classList.remove("selectedPool");

	let newSelected = document.getElementsByClassName("pool-" + selected);
	for (let i = 0; i < newSelected.length; i++) {
		newSelected[i].classList.add("selectedPool");
	}
}

function lightSelectedRider(riderId) {
	let prevSelected = document.getElementsByClassName("selectedRider");
	while (prevSelected.length)
		prevSelected[0].classList.remove("selectedRider");

	let newSelected = document.getElementById(riderId);
	if (newSelected) newSelected.classList.add("selectedRider");
}
