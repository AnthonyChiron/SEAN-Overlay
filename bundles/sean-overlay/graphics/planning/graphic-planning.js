import { GetRidersByCategorie, GetRiders } from "../../shared/js/riders-api.js";
import { Table } from "../../shared/js/table.js";
import { HtmlComponent } from "../../shared/js/htmlComponent.js";

let Html = new HtmlComponent();

const planning = nodecg.Replicant("planning");

planning.on("change", (newValue) => {
	let planningElement = document.getElementById("planning");
	planningElement.innerHTML = "";
	newValue.forEach((cat) => {
		planningElement.appendChild(createCategorieElement(cat));
	});
});

function createCategorieElement(categorie) {
	let div = Html.createDiv("categorie", "categorie");
	let hourDiv = Html.createDiv("hourDiv", "hourDiv");
	let categorieHour = Html.createTitle(categorie.hour, "hour");
	let categorieLabelHour = Html.createTitle("h", "label");
	let categorieMinutes = Html.createTitle(categorie.minutes, "minutes");
	let categorieName = Html.createTitle(categorie.name, "name");
	hourDiv.appendChild(categorieHour);
	hourDiv.appendChild(categorieLabelHour);
	hourDiv.appendChild(categorieMinutes);
	div.appendChild(hourDiv);
	div.appendChild(categorieName);
	return div;
}
