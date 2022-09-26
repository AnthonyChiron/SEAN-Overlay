module.exports = function (nodecg) {
	nodecg.listenFor("prevPoolExt", () => {
		nodecg.sendMessage("prevPoolDash");
	});

	nodecg.listenFor("nextPoolExt", () => {
		nodecg.sendMessage("nextPoolDash");
	});

	nodecg.listenFor("prevRiderExt", () => {
		nodecg.sendMessage("prevRiderDash");
	});

	nodecg.listenFor("nextRiderExt", () => {
		nodecg.sendMessage("nextRiderDash");
	});
};
