const elgato = require("elgato-stream-deck");

const elgatoKey = {
  Timer_Start: 0,
  Timer_Stop: 2,
  Timer_Reset: 1,
  Run_1: 5,
  Run_2: 6,
  Run_LastTrick: 7,
  CompetitionInfo_Display: 13,
  CompetitionInfo_Hide: 14,
};

module.exports = async function (nodecg) {
  const selectedRun = nodecg.Replicant("selectedRun");

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
    if (keyIndex == elgatoKey.CompetitionInfo_Display) {
      nodecg.sendMessage("displayCompetitionInfo");
    }
    if (keyIndex == elgatoKey.CompetitionInfo_Hide) {
      nodecg.sendMessage("hideCompetitionInfo");
    }
  });
};
