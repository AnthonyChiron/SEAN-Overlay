const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../sean-production-b5556aa57331.json"); // the file saved above

const competitionDocId = "1RiXSAOSUDPoFeKvxC4Eg1V1chi8-qW6mH3putkgXp0E";
const gmailAccount = "sean-drive@sean-production.iam.gserviceaccount.com";

module.exports = function (nodecg) {
	const competitionCategories = nodecg.Replicant("competitionCategories");
	const competitionData = nodecg.Replicant("competitionData");

	importData();

	nodecg.listenFor("refreshCategorie", async () => {
		importCategoriesName();
		importData();
	});

	nodecg.listenFor("refreshPool", async () => {});

	async function importCategoriesName() {
		const doc = await initConnexion();
		await doc.loadInfo();

		tmp = [];
		for (let index = 0; index < doc.sheetCount; index++) {
			const sheet = doc.sheetsByIndex[index];
			if (sheet != undefined) tmp.push(sheet.title);
		}

		competitionCategories.value = tmp;
	}

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
		let riders = [];

		// Pour chaque catégories, ajoute tous les riders
		for (let index = 0; index < doc.sheetCount; index++) {
			const sheet = doc.sheetsByIndex[index];

			if (sheet) {
				await importRidersFromCategorie(doc.sheetsByIndex[index]).then(
					(riders) =>
						categories.push({ name: sheet.title, riders: riders })
				);
			}
		}
		competitionData.value = categories;
		console.log(categories);
	}

	async function importRidersFromCategorie(sheet) {
		let riders = [];
		const rows = await sheet.getRows();

		rows.forEach((row) => {
			riders.push({
				lastName: row.Nom,
				firstName: row.Prénom,
				age: row.Age,
				pool: row.Poule,
				score: row.Score,
				nat: "fra",
			});
		});
		return riders;
	}
};
