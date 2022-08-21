const timerCount = nodecg.Replicant("timerCount", {
  defaultValue: 45,
  persistent: false,
});
const competitionCategorie = nodecg.Replicant("competitionCategorie");
const selectedRun = nodecg.Replicant("selectedRun");
const selectedCompetitionStep = nodecg.Replicant("selectedCompetitionStep");
const selectedCompetitionCategorie = nodecg.Replicant(
  "selectedCompetitionCategorie"
);

competitionCategorie.on("change", (newValue) => {
  const categorieSelect = document.getElementById("competitionCategorieSelect");
  removeAll(categorieSelect);

  newValue.forEach((element) => {
    const selectOption = document.createElement("option");
    selectOption.textContent = element;
    selectOption.value = element;
    categorieSelect.add(selectOption);
  });
});

function updateCompetitionStep() {
  const selectCompetitionStep = document.getElementById(
    "competitionStepSelect"
  );
  selectedCompetitionStep.value = selectCompetitionStep.value;
}

function updateCompetitionCategorie() {
  const competitionCategorieSelect = document.getElementById(
    "competitionCategorieSelect"
  );
  selectedCompetitionCategorie.value = competitionCategorieSelect.value;
}

function updateRun() {
  const runSelect = document.getElementById("runSelect");
  selectedRun.value = runSelect.value;
}

function updateTimerCount() {
  const selectTimer = document.getElementById("timerCountSelect");
  timerCount.value = selectTimer.value;
}

function displayCompetitionInfo() {
  nodecg.sendMessage("displayCompetitionInfo");
}

function hideCompetitionInfo() {
  nodecg.sendMessage("hideCompetitionInfo");
}

function displayPool() {
  nodecg.sendMessage("displayPool");
}

function hidePool() {
  nodecg.sendMessage("displayPool");
}

function updateSelectedPool() {
  nodecg.sendMessage("updateSelectedPool");
}

function refreshPool() {
  nodecg.sendMessage("refreshPool");
}

function timerStart() {
  nodecg.sendMessage("startTimer");
}

function timerStop() {
  nodecg.sendMessage("stopTimer");
}

function timerReset() {
  nodecg.sendMessage("resetTimer");
}

function removeAll(selectBox) {
  while (selectBox.options.length > 0) {
    selectBox.remove(0);
  }
}
