const uuidv4 = require("uuid/v4");

module.exports = function (nodecg) {
	const planning = nodecg.Replicant("planning");
	const newPlanningCategorie = nodecg.Replicant("newPlanningCategorie");

	planning.value = [];

	newPlanningCategorie.on("change", (newValue) => {
		if (newValue) {
			console.log(newValue);

			newValue.id = uuidv4();
			planning.value.push(newValue);
		}
	});

	function deleteCategorie(id) {
		planning.value();
	}
};
