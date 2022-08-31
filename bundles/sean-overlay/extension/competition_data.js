const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../sean-production-b5556aa57331.json"); // the file saved above

const competitionDocId = "1RiXSAOSUDPoFeKvxC4Eg1V1chi8-qW6mH3putkgXp0E";
const gmailAccount = "sean-drive@sean-production.iam.gserviceaccount.com";

module.exports = function (nodecg) {
  const competitionCategorie = nodecg.Replicant("competitionCategorie");
  const test = nodecg.Replicant("test");
  const competitionCategorieSelect = nodecg.Replicant(
    "competitionCategorieSelect"
  );

  importCategories();

  nodecg.listenFor("refreshCategorie", async () => {
    importCategories();
  });

  nodecg.listenFor("refreshPool", async () => {
    importPools();
  });

  async function importCategories() {
    doc = await initConnexion();
    await doc.loadInfo();

    tmp = [];
    for (let index = 0; index < doc.sheetCount; index++) {
      const element = doc.sheetsByIndex[index];
      if (element != undefined) tmp.push(element.title);
    }
    console.log(tmp);

    competitionCategorie.value = tmp;
  }

  async function importPools() {
    doc = await initConnexion();
    await doc.loadInfo();

    console.log(competitionCategorieSelect.value);
  }

  async function initConnexion() {
    const doc = new GoogleSpreadsheet(competitionDocId);
    await doc.useServiceAccountAuth(creds);
    await doc.useServiceAccountAuth(creds, gmailAccount);
    return doc;
  }
};
