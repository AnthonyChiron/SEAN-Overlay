export class Select {
	firstValue = "";
	constructor(name) {
		this.name = name;
		this.select = document.getElementById(this.name);
	}

	removeAllOptions() {
		if (this.select)
			while (this.select.options.length > 0) {
				this.select.remove(0);
			}
	}

	addOptionsFromArray(options) {
		this.removeAllOptions();

		options.forEach((option) => {
			const newSelectOption = document.createElement("option");
			newSelectOption.textContent = option;
			newSelectOption.value = option;
			this.select.add(newSelectOption);
		});

		if (this.select.options[0])
			this.firstValue = this.select.options[0].value;
		return this.select;
	}
}
