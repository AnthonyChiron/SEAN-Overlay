export class Select {
	firstValue = "";
	lastValue = "";

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
		if (this.select.options[this.select.options.length - 1])
			this.lastValue =
				this.select.options[this.select.options.length - 1].value;
		return this.select;
	}

	addOptionsFromArrayWithValues(options, values) {
		this.removeAllOptions();

		for (let i = 0; i < options.length; i++) {
			const newSelectOption = document.createElement("option");
			newSelectOption.textContent = options[i];
			newSelectOption.value = values[i];
			this.select.add(newSelectOption);
		}

		if (this.select.options[0])
			this.firstValue = this.select.options[0].value;
		return this.select;
	}
}
