const competitionStep = nodecg.Replicant("selectedCompetitionStep");
const selectedCategorie = nodecg.Replicant("selectedCategorie");
const run = nodecg.Replicant("selectedRun");

competitionStep.on("change", (newValue) => {
	document.getElementById("competitionStep").innerHTML = newValue;
});

selectedCategorie.on("change", (newValue) => {
	document.getElementById("selectedCategorie").innerHTML = newValue;
});

run.on("change", (newValue) => {
	document.getElementById("run").innerHTML = newValue;
});

nodecg.listenFor("displayCompetitionInfo", () => {
	document.getElementById("bloc").classList.remove("stop");
});

nodecg.listenFor("hideCompetitionInfo", () => {
	document.getElementById("bloc").classList.add("stop");
});
