const planning = nodecg.Replicant("planning");
const newPlanningCategorie = nodecg.Replicant("newPlanningCategorie");

planning.on("change", (newValue) => {
	console.log(newValue);
	newValue.forEach((cat) => {
		document
			.getElementById("categories")
			.appendChild(
				createCategorieElement(cat.name, "cat.hour", "cat.minutes")
			);
	});
});

function addCategorie() {
	console.log(document.getElementById("categorieName").value);
	let categorie = {
		id: "",
		name: document.getElementById("categorieName").value,
		hour: document.getElementById("categorieHour").value,
		minutes: document.getElementById("categorieMinutes").value,
	};
	newPlanningCategorie.value = document.getElementById("categorieName").value;
}

function createCategorieElement(
	categorieName,
	categorieHour,
	categorieMinutes
) {
	let div = document.createElement("div");
	div.classList.add("categorie");
	let p = document.createElement("p");
	p.value = categorieName;
	div.appendChild(p);
	// div.appendChild((document.createElement("p").innerText = categorieHour));
	// div.appendChild((document.createElement("p").innerText = categorieMinutes));
	return div;
}
