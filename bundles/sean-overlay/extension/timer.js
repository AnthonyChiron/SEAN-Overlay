var Timer = require("easytimer.js").Timer;

module.exports = async function (nodecg) {
	// #### RUN TIMER ####
	const timerCount = nodecg.Replicant("timerCount", {
		defaultValue: 45,
		persistent: false,
	});
	const timerFront = nodecg.Replicant("timerFront");
	var timer = new Timer();
	nodecg.listenFor("startTimer", () => {
		nodecg.sendMessage("showTimer");
		timer.start({
			countdown: true,
			startValues: { seconds: timerCount.value },
		});
	});

	nodecg.listenFor("stopTimer", () => {
		nodecg.sendMessage("hideTimer");
		timer.stop();
	});

	nodecg.listenFor("resetTimer", () => {
		nodecg.sendMessage("showTimer");
		timer.stop();
		timer.start({
			countdown: true,
			startValues: { seconds: timerCount.value },
		});
		timer.pause();
		timerFront.value = parseTimerToString(timer);
	});

	// Hide le timer 1s après la fin de celui-ci
	timer.addEventListener("targetAchieved", function (e) {
		setTimeout(() => nodecg.sendMessage("hideTimer"), 1000);
	});

	// Update le replicant pour l'affichage front
	timer.addEventListener("secondsUpdated", function (e) {
		timerFront.value = parseTimerToString(timer);
	});

	// #### WAITING TIMER ####
	const waitingTimerCount = nodecg.Replicant("waitingTimerCount", {
		defaultValue: 900,
		persistent: false,
	});
	const waitingTimerFront = nodecg.Replicant("waitingTimerFront");
	var waitingTimer = new Timer();
	nodecg.listenFor("startWaitingTimer", () => {
		nodecg.sendMessage("showWaitingTimer");
		waitingTimer.start({
			countdown: true,
			startValues: { seconds: waitingTimerCount.value },
		});
	});

	nodecg.listenFor("stopWaitingTimer", () => {
		nodecg.sendMessage("hideWaitingTimer");
		waitingTimer.stop();
	});

	nodecg.listenFor("resetWaitingTimer", () => {
		nodecg.sendMessage("showWaitingTimer");
		waitingTimer.stop();
		console.log(waitingTimerCount.value);
		waitingTimer.start({
			countdown: true,
			startValues: { seconds: waitingTimerCount.value },
		});
		waitingTimer.pause();
		waitingTimerFront.value = parseTimerToString(waitingTimer);
	});

	// Update le replicant pour l'affichage front
	waitingTimer.addEventListener("secondsUpdated", function (e) {
		waitingTimerFront.value = parseTimerToString(waitingTimer);
	});

	function parseTimerToString(timerToParse) {
		let timerString = "";

		if (timerToParse.getTimeValues().minutes < 10) timerString = "0";
		timerString += timerToParse.getTimeValues().minutes.toString();

		timerString += ":";

		if (timerToParse.getTimeValues().seconds < 10) timerString += "0";
		timerString += timerToParse.getTimeValues().seconds.toString();
		console.log(timerString);
		return timerString;
	}
};
