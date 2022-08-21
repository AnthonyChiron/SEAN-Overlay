const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../sean-production-b5556aa57331.json"); // the file saved above

module.exports = function (nodecg) {
  const competitionCategorie = nodecg.Replicant("competitionCategorie");

  importCategories();

  nodecg.listenFor("refreshPool", async () => {
    importCategories();
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

  async function initConnexion() {
    const doc = new GoogleSpreadsheet(
      "1RiXSAOSUDPoFeKvxC4Eg1V1chi8-qW6mH3putkgXp0E"
    );
    await doc.useServiceAccountAuth(creds);
    await doc.useServiceAccountAuth(
      creds,
      "sean-drive@sean-production.iam.gserviceaccount.com"
    );
    return doc;
  }
};
