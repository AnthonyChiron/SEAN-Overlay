const timerCount = nodecg.Replicant("timerCount");

let count;
var interval;

timerCount.on("change", (newValue) => {
  count = new countdown(newValue);
  count.reset();
});

nodecg.listenFor("startTimer", () => {
  count.start();
});

nodecg.listenFor("stopTimer", () => {
  count.stop();
});

nodecg.listenFor("resetTimer", () => {
  count.reset();
});

export default class countdown {
  constructor(defaultCount) {
    this.defaultCount = defaultCount;
  }

  start() {
    this.reset();
    let counter = this.defaultCount;
    interval = setInterval(function () {
      counter--;

      if (counter < 10)
        document.getElementById("timer").innerHTML = "00:0" + counter;
      else document.getElementById("timer").innerHTML = "00:" + counter;

      if (counter == 0) {
        document.getElementById("timer").innerHTML = "00:00";
        document.getElementById("timer-info").classList.add("hide");
        document.getElementById("timer-info").classList.remove("show");
        clearInterval(interval);
      }
    }, 1000);
  }

  stop() {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "00:00";
    document.getElementById("timer-info").classList.add("hide");
    document.getElementById("timer-info").classList.remove("show");
    document.getElementById("info").classList.add("slide");
  }

  reset() {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "00:" + this.defaultCount;
    document.getElementById("timer-info").classList.add("show");
    document.getElementById("timer-info").classList.remove("hide");
    document.getElementById("info").classList.remove("slide");
  }
}
