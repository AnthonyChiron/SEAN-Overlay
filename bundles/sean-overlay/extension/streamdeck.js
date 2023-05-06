const elgato = require("elgato-stream-deck");

const elgatoKey = {
	Timer_Start: 0,
	Timer_Stop: 2,
	Timer_Reset: 1,
	Run_1: 10,
	Run_2: 11,
	Run_LastTrick: 12,
	Prev_Rider: 8,
	Next_Rider: 9,
	Prev_Pool: 3,
	Next_Pool: 4,
	Replay: 6,
	CompetitionInfo_Display: 13,
	CompetitionInfo_Hide: 14,
};

module.exports = async function (nodecg) {
	const selectedRun = nodecg.Replicant("SelectedRun");

	myStreamDeck = await elgato.openStreamDeck();

	myStreamDeck.on("down", (keyIndex) => {
		console.log(keyIndex);
		if (keyIndex == elgatoKey.Timer_Start) {
			nodecg.sendMessage("startTimer");
		}
		if (keyIndex == elgatoKey.Timer_Stop) {
			nodecg.sendMessage("stopTimer");
		}
		if (keyIndex == elgatoKey.Timer_Reset) {
			nodecg.sendMessage("resetTimer");
		}
		if (keyIndex == elgatoKey.Run_1) {
			selectedRun.value = "RUN 1/2";
		}
		if (keyIndex == elgatoKey.Run_2) {
			selectedRun.value = "RUN 2/2";
		}
		if (keyIndex == elgatoKey.Run_LastTrick) {
			selectedRun.value = "LAST TRICK";
		}
		if (keyIndex == elgatoKey.Prev_Rider) {
			nodecg.sendMessage("prevRiderDash");
		}
		if (keyIndex == elgatoKey.Next_Rider || keyIndex == elgatoKey.Replay) {
			nodecg.sendMessage("nextRiderDash");
		}
		if (keyIndex == elgatoKey.Prev_Pool) {
			nodecg.sendMessage("prevPoolDash");
		}
		if (keyIndex == elgatoKey.Next_Pool) {
			nodecg.sendMessage("nextPoolDash");
		}
		if (keyIndex == elgatoKey.CompetitionInfo_Display) {
			nodecg.sendMessage("displayCompetitionInfo");
		}
		if (keyIndex == elgatoKey.CompetitionInfo_Hide) {
			nodecg.sendMessage("hideCompetitionInfo");
		}
	});
};
