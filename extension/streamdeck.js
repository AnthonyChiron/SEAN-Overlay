const elgato = require("elgato-stream-deck");

module.exports = async function (nodecg) {
  myStreamDeck = await elgato.openStreamDeck();

  myStreamDeck.on("down", (keyIndex) => {
    if (keyIndex == 7) {
      nodecg.sendMessage("startTimer");
    }
    if (keyIndex == 8) {
      nodecg.sendMessage("stopTimer");
    }
    if (keyIndex == 9) {
      nodecg.sendMessage("resetTimer");
    }
  });
};
