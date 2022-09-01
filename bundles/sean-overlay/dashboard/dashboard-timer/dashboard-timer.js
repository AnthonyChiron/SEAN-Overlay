const timerCount = nodecg.Replicant("timerCount", {
	defaultValue: 45,
	persistent: false,
});

function updateTimerCount() {
	const selectTimer = document.getElementById("timerCountSelect");
	timerCount.value = selectTimer.value;
	nodecg.sendMessage("resetTimer");
}

function timerStart() {
	nodecg.sendMessage("startTimer");
}

function timerStop() {
	nodecg.sendMessage("stopTimer");
}

function timerReset() {
	nodecg.sendMessage("resetTimer");
}
