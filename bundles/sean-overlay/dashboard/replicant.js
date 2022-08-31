export const timerCount = nodecg.Replicant("timerCount", {
  defaultValue: 45,
  persistent: false,
});
export const competitionCategorie = nodecg.Replicant("competitionCategorie");
export const selectedRun = nodecg.Replicant("selectedRun");
export const selectedCompetitionStep = nodecg.Replicant(
  "selectedCompetitionStep"
);
export const selectedCompetitionCategorie = nodecg.Replicant(
  "selectedCompetitionCategorie"
);
