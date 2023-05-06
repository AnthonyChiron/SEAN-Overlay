const timer = nodecg.Replicant("timerFront");

nodecg.listenFor("hideTimer", () => {
	// document.getElementById("timer-info").classList.add("hide");
	// document.getElementById("timer-info").classList.remove("show");
	// document.getElementById("info").classList.add("slideIn");
	// document.getElementById("info").classList.remove("slideOut");
});

nodecg.listenFor("showTimer", () => {
	// document.getElementById("timer-info").classList.add("show");
	// document.getElementById("timer-info").classList.remove("hide");
	// document.getElementById("info").classList.remove("slideIn");
	// document.getElementById("info").classList.add("slideOut");
});

timer.on("change", (newValue) => {
	document.getElementById("timer").innerHTML = newValue;
});
