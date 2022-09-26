module.exports = function (nodecg) {
	require("./competition_data")(nodecg);
	require("./streamdeck")(nodecg);
	require("./timer")(nodecg);
	require("./communication")(nodecg);
};
