import { distinct } from "./utli.js";

export const riders = nodecg.Replicant("Riders");

export function ParseRiderFullName(rider) {
	return rider.firstName + " " + rider.lastName;
}

export function GetRidersByCategorie(categorie) {
	let riderTable = [];

	riders.value
		.filter((rider) => rider.categorie == categorie)
		.forEach((rider) => {
			riderTable.push({
				id: rider.id,
				firstName: rider.firstName,
				lastName: rider.lastName,
				pool: rider.pool,
				age: rider.age,
				nat: rider.nat,
				score: rider.score,
			});
		});
	return riderTable;
}

export function GetRiders(categorie, pool) {
	let riderTable = [];

	riders.value
		.filter((rider) => rider.categorie == categorie && rider.pool == pool)
		.forEach((rider) => {
			riderTable.push({
				id: rider.id,
				firstName: rider.firstName,
				lastName: rider.lastName,
				age: rider.age,
				nat: rider.nat,
				score: rider.score,
			});
		});
	return riderTable;
}

export function GetCategories() {
	let categories = [];

	riders.value.forEach((rider) => categories.push(rider.categorie));

	return categories.filter(distinct).sort();
}

export function GetPoolsFromCategorie() {
	let pools = [];

	riders.value
		.filter((rider) => rider.categorie == selectedCategorie.value)
		.forEach((rider) => pools.push(rider.pool));

	return pools.filter(distinct).sort();
}

export function isPoolValid(pool) {
	return riders.value.filter(
		(rider) =>
			rider.categorie == selectedCategorie.value && rider.pool == pool
	).length == 0
		? false
		: true;
}
