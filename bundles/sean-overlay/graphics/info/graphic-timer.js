const timer = nodecg.Replicant("timerFront");

nodecg.listenFor("hideTimer", () => {
	document.getElementById("timer-info").classList.add("hide");
	document.getElementById("timer-info").classList.remove("show");
	document.getElementById("info").classList.add("slide");
});

nodecg.listenFor("showTimer", () => {
	document.getElementById("timer-info").classList.add("show");
	document.getElementById("timer-info").classList.remove("hide");
	document.getElementById("info").classList.remove("slide");
});

timer.on("change", (newValue) => {
	document.getElementById("timer").innerHTML = newValue;
});
