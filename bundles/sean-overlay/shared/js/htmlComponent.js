export class HtmlComponent {
	constructor() {}

	createTitle(name) {
		let title = document.createElement("h3");
		title.innerText = name;
		return title;
	}

	createTitle(name, className) {
		let title = document.createElement("h3");
		title.classList.add(className);
		title.innerText = name;
		return title;
	}

	createDiv(name, className) {
		let div = document.createElement("div");
		div.id = name;
		div.classList.add(className);
		return div;
	}

	createInput(id, className, value) {
		let input = document.createElement("input");
		input.id = id;
		input.value = value;
		input.classList.add(className);
		return input;
	}

	createPrimaryBtn(id, onclick) {
		let btn = document.createElement("button");
		btn.classList.add("primary", "w1");
		btn.onclick = onclick;
		btn.id = id;
		let icon = document.createElement("i");
		icon.classList.add("bi", "bi-check");
		btn.appendChild(icon);
		return btn;
	}

	createDangerBtn(id, onclick) {
		let btn = document.createElement("button");
		btn.classList.add("danger", "w1");
		btn.onclick = onclick;
		btn.id = id;
		let icon = document.createElement("i");
		icon.classList.add("bi", "bi-x");
		btn.appendChild(icon);
		return btn;
	}
}
