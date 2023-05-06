const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../sean-production-b5556aa57331.json"); // the file saved above
const uuidv4 = require("uuid/v4");

const testSEAN = "1RiXSAOSUDPoFeKvxC4Eg1V1chi8-qW6mH3putkgXp0E";

const qualif_NRF = "1wg5_cvlG_Ql3CkGzFvuRKUtXxgRmTieii8asHhhl5vU";
const qualif_Trottirama = "1gmryYgxxHze-LMJ9-ywsF4_6paKMR2V2WUh9FBr6ZXc";
const final_Trottirama = "1gmryYgxxHze-LMJ9-ywsF4_6paKMR2V2WUh9FBr6ZXc";

const competitionDocId = qualif_Trottirama;
const gmailAccount = "sean-drive@sean-production.iam.gserviceaccount.com";

module.exports = function (nodecg) {
	const riders = nodecg.Replicant("Riders");

	importData();

	nodecg.listenFor("refreshCategorie", async () => {
		importData();
	});

	nodecg.listenFor("getRiders", (categorie, pool) => {});

	async function initConnexion() {
		const doc = new GoogleSpreadsheet(competitionDocId);
		await doc.useServiceAccountAuth(creds);
		await doc.useServiceAccountAuth(creds, gmailAccount);
		return doc;
	}

	async function importData() {
		const doc = await initConnexion();
		await doc.loadInfo();

		let categories = [];
		let ridersTmp = [];

		// Pour chaque catégories, ajoute tous les riders
		for (let index = 0; index < doc.sheetCount; index++) {
			const sheet = doc.sheetsByIndex[index];
			categories.push(sheet.title);
			await importRidersFromCategorie(sheet).then(
				(riders) => (ridersTmp = ridersTmp.concat(riders))
			);
		}

		riders.value = ridersTmp;

		nodecg.sendMessage("ridersDataRefreshed");
	}

	async function importRidersFromCategorie(sheet) {
		let riders = [];
		const rows = await sheet.getRows();

		rows.forEach((row) => {
			riders.push({
				id: uuidv4(),
				lastName: row.Nom,
				firstName: row.Prénom,
				age: row.Age,
				pool: row.Poule,
				categorie: sheet.title,
				score: row.Score,
				nat: "FRA",
			});
		});
		return riders;
	}
};
