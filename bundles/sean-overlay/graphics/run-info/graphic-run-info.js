const competitionStep = nodecg.Replicant("SelectedCompetitionStep");
const categorie = nodecg.Replicant("SelectedCategorie");
const run = nodecg.Replicant("SelectedRun");

competitionStep.on("change", (newValue) => {
	document.getElementById("competitionStep").innerHTML = newValue;
});

categorie.on("change", (newValue) => {
	let cat = newValue.replace("Roller ", "");
	cat = cat.replace("Trott ", "");
	document.getElementById("categorie").innerHTML = cat;
});

run.on("change", (newValue) => {
	document.getElementById("run").innerHTML = newValue;
});

nodecg.listenFor("displayCompetitionInfo", () => {
	document.getElementById("bloc").classList.remove("slideLeft");
	document.getElementById("bloc").classList.add("slideRight");
});

nodecg.listenFor("hideCompetitionInfo", () => {
	document.getElementById("bloc").classList.remove("slideRight");
	document.getElementById("bloc").classList.add("slideLeft");
});
