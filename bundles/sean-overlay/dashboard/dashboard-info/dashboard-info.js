const selectedRun = nodecg.Replicant("selectedRun");
const selectedCompetitionStep = nodecg.Replicant("selectedCompetitionStep");

function updateCompetitionStep() {
	const selectCompetitionStep = document.getElementById(
		"competitionStepSelect"
	);
	selectedCompetitionStep.value = selectCompetitionStep.value;
}

function updateRun(run) {
	const runSelect = document.getElementById("runSelect");
	selectedRun.value = runSelect.value;
}

function displayCompetitionInfo() {
	nodecg.sendMessage("displayCompetitionInfo");
}

function hideCompetitionInfo() {
	nodecg.sendMessage("hideCompetitionInfo");
}
