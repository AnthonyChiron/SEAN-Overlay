import { HtmlComponent } from "../../shared/js/htmlComponent.js";

const timer = nodecg.Replicant("waitingTimerFront");
const labelTimer = nodecg.Replicant("labelTimer");
const selectedCategorie = nodecg.Replicant("SelectedCategorie");
const pubs = nodecg.Replicant("assets:pubs");

let Html = new HtmlComponent();

pubs.on("change", (newValue) => {
	newValue.forEach((asset) => {
		let slide = Html.createDiv("slide", "swiper-slide");
		slide.style.backgroundImage = "url(" + asset.url + ")";
		slide.innerText = "z";
		document.getElementById("pubSwipper").appendChild(slide);
	});
});

labelTimer.on("change", (newValue) => {
	document.getElementById("labelTimer").innerHTML = newValue;
});

timer.on("change", (newValue) => {
	document.getElementById("timer").innerHTML = newValue;
});

selectedCategorie.on("change", (newValue) => {
	document.getElementById("categorie").innerHTML = newValue;
});
