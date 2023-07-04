const doc = nodecg.Replicant("document");

function updateDoc() {
	const docValue = document.getElementById("document");
	doc.value = docValue.value;
	nodecg.sendMessage("refreshCategorie");
}
