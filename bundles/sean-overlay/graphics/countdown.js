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
  constructor(defaultCounter) {
    this.defaultCounter = defaultCounter;
  }

  reset() {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "00:" + this.defaultCounter;
    document.getElementById("timer-info").classList.add("show");
    document.getElementById("timer-info").classList.remove("hide");
    document.getElementById("info").classList.remove("slide");
  }

  stop() {
    clearInterval(interval);
    document.getElementById("timer").innerHTML = "00:00";
    document.getElementById("timer-info").classList.add("hide");
    document.getElementById("timer-info").classList.remove("show");
    document.getElementById("info").classList.add("slide");
  }

  start() {
    this.reset();
    const stop = this.stop;
    let counter = this.defaultCounter;
    interval = setInterval(function () {
      if (counter == 0) {
        setTimeout(function () {
          stop();
        }, 1500);
      } else {
        counter--;

        if (counter < 10)
          document.getElementById("timer").innerHTML = "00:0" + counter;
        else document.getElementById("timer").innerHTML = "00:" + counter;
      }
    }, 1000);
  }
}
