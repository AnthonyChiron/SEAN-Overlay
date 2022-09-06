const selectedCategorie = nodecg.Replicant("selectedCategorie");
const selectedPool = nodecg.Replicant("selectedPool");
const selectedRider = nodecg.Replicant("selectedRider");

function refreshCategorie() {
	nodecg.sendMessage("refreshCategorie");
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
	console.log(selectedRider.value);
	selectedRider.value = riderSelect.value;
}
