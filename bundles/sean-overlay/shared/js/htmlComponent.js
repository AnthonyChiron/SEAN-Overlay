export class HtmlComponent {
	constructor() {}

	createTitle(name) {
		let title = document.createElement("h3");
		title.innerText = name;
		return title;
	}

	createDiv(name, className) {
		let div = document.createElement("div");
		div.id = name;
		div.classList.add(className);
		return div;
	}
}
