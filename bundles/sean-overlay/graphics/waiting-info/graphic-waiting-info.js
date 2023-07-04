const timer = nodecg.Replicant("waitingTimerFront");
const labelTimer = nodecg.Replicant("labelTimer");
const selectedCategorie = nodecg.Replicant("SelectedCategorie");

labelTimer.on("change", (newValue) => {
	document.getElementById("labelTimer").innerHTML = newValue;
});

timer.on("change", (newValue) => {
	document.getElementById("timer").innerHTML = newValue;
});

selectedCategorie.on("change", (newValue) => {
	document.getElementById("categorie").innerHTML = newValue;
});
