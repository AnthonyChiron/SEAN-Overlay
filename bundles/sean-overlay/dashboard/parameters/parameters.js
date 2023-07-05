const doc = nodecg.Replicant("document");
const contestName = nodecg.Replicant("contestName");

function updateDoc() {
	const docValue = document.getElementById("document");
	doc.value = docValue.value;
	nodecg.sendMessage("refreshCategorie");
}

function updateContestName() {
	const contestNameValue = document.getElementById("contestName");
	contestName.value = contestNameValue.value;
}
