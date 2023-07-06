const { xml } = require("cheerio");
const uuidv4 = require("uuid/v4");

module.exports = function (nodecg) {
	const planningReplicant = nodecg.Replicant("planning");
	const deletePlanningCategorie = nodecg.Replicant("deletePlanningCategorie");
	const updatePlanningCategorie = nodecg.Replicant("updatePlanningCategorie");
	const newPlanningCategorie = nodecg.Replicant("newPlanningCategorie", {
		defaultValue: [],
		persistent: true,
	});

	// AJOUT DE CATEGORIE
	newPlanningCategorie.on("change", (newValue) => {
		if (
			newValue &&
			newValue.name != "" &&
			newValue.hour != "" &&
			newValue.minutes != ""
		) {
			let categorie = {
				id: uuidv4(),
				name: newValue.name,
				hour: newValue.hour,
				minutes: newValue.minutes,
			};
			planningReplicant.value.push(categorie);
			newPlanningCategorie.value = "";
		}
	});

	// SUPPRESSION DE CATEGORIE
	deletePlanningCategorie.on("change", (newValue) => {
		let planning = planningReplicant.value;
		planning.forEach((categorie, index) => {
			if (categorie.id == newValue) {
				planning.splice(index, 1);
			}
		});
		planningReplicant.value = planning;
	});

	// UPDATE CATEGORIE
	updatePlanningCategorie.on("change", (newValue) => {
		let planning = [];
		planningReplicant.value.forEach((categorie) => {
			let cat = {
				id: categorie.id,
				name: categorie.name,
				hour: categorie.hour,
				minutes: categorie.minutes,
			};
			planning.push(cat);
			if (cat.id == newValue.id) {
				cat.name = newValue.name;
				cat.hour = newValue.hour;
				cat.minutes = newValue.minutes;
			}
		});
		planningReplicant.value = planning.sort((a, b) => a.hour - b.hour);
	});
};
