const competitionStep = nodecg.Replicant("selectedCompetitionStep");
const competitionCategorie = nodecg.Replicant("selectedCompetitionCategorie");
const run = nodecg.Replicant("selectedRun");

competitionStep.on("change", (newValue) => {
	document.getElementById("competitionStep").innerHTML = newValue;
});

competitionCategorie.on("change", (newValue) => {
	document.getElementById("competitionCategorie").innerHTML = newValue;
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
