var Timer = require("easytimer.js").Timer;

module.exports = async function (nodecg) {
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
		timerFront.value = parseTimerToString();
	});

	// Hide le timer 1s après la fin de celui-ci
	timer.addEventListener("targetAchieved", function (e) {
		setTimeout(() => nodecg.sendMessage("hideTimer"), 1000);
	});

	// Update le replicant pour l'affichage front
	timer.addEventListener("secondsUpdated", function (e) {
		timerFront.value = parseTimerToString();
	});

	function parseTimerToString() {
		let timerString = "";

		if (timer.getTimeValues().minutes < 10) timerString = "0";
		timerString += timer.getTimeValues().minutes.toString();

		timerString += ":";

		if (timer.getTimeValues().seconds < 10) timerString += "0";
		timerString += timer.getTimeValues().seconds.toString();

		return timerString;
	}
};
