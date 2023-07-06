const planning = nodecg.Replicant("planning");
const newPlanningCategorie = nodecg.Replicant("newPlanningCategorie");
const deletePlanningCategorie = nodecg.Replicant("deletePlanningCategorie");
const updatePlanningCategorie = nodecg.Replicant("updatePlanningCategorie");

planning.on("change", (newValue) => {
	document.getElementById("categories").innerHTML = "";
	let categories = [...newValue];
	categories.forEach((cat) => {
		document
			.getElementById("categories")
			.appendChild(createCategorieElement(cat));
	});
});

function addCategorie() {
	let categorie = {
		id: "",
		name: document.getElementById("categorieName").value,
		hour: document.getElementById("categorieHour").value,
		minutes: document.getElementById("categorieMinutes").value,
	};
	newPlanningCategorie.value = categorie;
}

function createCategorieElement(cat) {
	let div = createDiv(cat.id, "categorie");
	let name = createInput(cat.id + "-name", "w3", cat.name, "text");
	let hour = createInput(cat.id + "-hour", "w1", cat.hour, "number");
	let minutes = createInput(cat.id + "-minutes", "w1", cat.minutes, "number");
	let updateBtn = createPrimaryBtn(cat.id, function updateCategorie() {
		let categorie = {
			id: this.id,
			name: document.getElementById(this.id + "-name").value,
			hour: document.getElementById(this.id + "-hour").value,
			minutes: document.getElementById(this.id + "-minutes").value,
		};
		updatePlanningCategorie.value = categorie;
	});
	let deleteBtn = createDangerBtn(cat.id, function deleteCategorieElement() {
		deletePlanningCategorie.value = this.id;
	});
	div.appendChild(name);
	div.appendChild(hour);
	div.appendChild(minutes);
	div.appendChild(updateBtn);
	div.appendChild(deleteBtn);

	return div;
}

function createDiv(name, className) {
	let div = document.createElement("div");
	div.id = name;
	div.classList.add(className);
	return div;
}

function createInput(id, className, value, type) {
	let input = document.createElement("input");
	input.id = id;
	input.value = value;
	input.type = type;
	input.classList.add(className);
	return input;
}

function createPrimaryBtn(id, onclick) {
	let btn = document.createElement("button");
	btn.classList.add("primary", "w1");
	btn.onclick = onclick;
	btn.id = id;
	let icon = document.createElement("i");
	icon.classList.add("bi", "bi-check");
	btn.appendChild(icon);
	return btn;
}

function createDangerBtn(id, onclick) {
	let btn = document.createElement("button");
	btn.classList.add("danger", "w1");
	btn.onclick = onclick;
	btn.id = id;
	let icon = document.createElement("i");
	icon.classList.add("bi", "bi-x");
	btn.appendChild(icon);
	return btn;
}
