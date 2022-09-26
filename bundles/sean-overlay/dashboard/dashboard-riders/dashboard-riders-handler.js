const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const selectedRider = nodecg.Replicant("SelectedRider");

function refreshCategorie() {
	nodecg.sendMessage("refreshCategorie");
	document.getElementById("refreshDataBtn").classList.add("danger");
	document.getElementsByTagName("tbody")[0].innerHTML = "";
}

function display() {
	nodecg.sendMessage("displayCompetitionInfo");
}

function hide() {
	nodecg.sendMessage("hideCompetitionInfo");
}

function prevPool() {
	nodecg.sendMessage("prevPoolExt");
}

function nextPool() {
	nodecg.sendMessage("nextPoolExt");
}

function prevRider() {
	nodecg.sendMessage("prevRiderExt");
}

function nextRider() {
	nodecg.sendMessage("nextRiderExt");
}

function updateSelectedCategorie() {
	const categorieSelect = document.getElementById("categories");
	selectedCategorie.value = categorieSelect.value;
}

function updateSelectedPool() {
	const poolSelect = document.getElementById("pools");
	selectedPool.value = poolSelect.value;
}

function updateSelectedRider() {
	const riderSelect = document.getElementById("rider");
	selectedRider.value = riderSelect.value;
}