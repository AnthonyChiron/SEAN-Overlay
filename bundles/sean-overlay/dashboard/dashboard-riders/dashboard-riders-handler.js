const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const selectedPool = nodecg.Replicant("SelectedPool");
const selectedRider = nodecg.Replicant("SelectedRider");

nodecg.listenFor("refreshCategorie", async () => {
	document.getElementById("refreshDataBtn").classList.add("danger");
	document.getElementsByTagName("tbody")[0].innerHTML = "";
});

function refreshCategorie() {
	nodecg.sendMessage("refreshCategorie");
	document.getElementById("refreshDataBtn").classList.add("danger");
	document.getElementsByTagName("tbody")[0].innerHTML = "";
}

function display() {
	nodecg.sendMessage("displayRiders");
}

function hide() {
	nodecg.sendMessage("hideRiders");
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
