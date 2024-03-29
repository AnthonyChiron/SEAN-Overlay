const timerCount = nodecg.Replicant("waitingTimerCount", {
	defaultValue: 900,
	persistent: false,
});
const labelTimerReplicant = nodecg.Replicant("labelTimer");

function updateLabelTimer() {
	const label = document.getElementById("labelTimer");
	labelTimerReplicant.value = label.value;
}

function updateTimerCount() {
	const inputTimer = document.getElementById("timerCountSelect");
	timerCount.value = inputTimer.value;
	nodecg.sendMessage("resetWaitingTimer");
}

function updateTimerCountFromTxt() {
	const inputTimer = document.getElementById("timerCountTxt");
	timerCount.value = inputTimer.value * 60;
	nodecg.sendMessage("resetWaitingTimer");
}

function timerStart() {
	nodecg.sendMessage("startWaitingTimer");
}

function timerStop() {
	nodecg.sendMessage("stopWaitingTimer");
}

function timerReset() {
	nodecg.sendMessage("resetWaitingTimer");
}
