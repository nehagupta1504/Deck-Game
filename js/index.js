const cardNames = [
  "2C",
  "2D",
  "2H",
  "2S",
  "3C",
  "3D",
  "3H",
  "3S",
  "4C",
  "4D",
  "4H",
  "4S",
  "5C",
  "5D",
  "5H",
  "5S",
  "6C",
  "6D",
  "6H",
  "6S",
  "7C",
  "7D",
  "7H",
  "7S",
  "8C",
  "8D",
  "8H",
  "8S",
  "9C",
  "9D",
  "9H",
  "9S",
  "10C",
  "10D",
  "10H",
  "10S",
  "AC",
  "AD",
  "AH",
  "AS",
  "JC",
  "JD",
  "JH",
  "JS",
  "KC",
  "KD",
  "KH",
  "KS",
  "QC",
  "QD",
  "QH",
  "QS",
];

const cardHolderNames = ["spade.png", "diamond.png", "club.png", "heart.png"];
let restartBtn = document.getElementById("restart-button");
let winItem = document.getElementById("win");

function timerFunction() {
  let min = 0;
  let sec = 10;
  var timerVal = setInterval(function () {
    document.getElementById("timer").innerHTML = "0" + min + ":" + sec;
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;
    }
    if (min < 0) {
      clearInterval(timerVal);
    }
  }, 1000);
}
window.onload = () => {
  timerFunction();
};
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
//Drag & drop functinality
function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  let cardId = ev.dataTransfer.getData("text");
  console.log(ev.target.id, cardId);
  if (
    (ev.target.id == 100 && cardId % 4 == 3) ||
    (ev.target.id == 101 && cardId % 4 == 1) ||
    (ev.target.id == 102 && cardId % 4 == 0) ||
    (ev.target.id == 103 && cardId % 4 == 2)
  )
    ev.target.appendChild(document.getElementById(cardId));
  hasChildren();
}
function hasChildren() {
  console.log(document.getElementById("app").children.length);
  if (document.getElementById("app").children.length == 0) {
    restartBtn.classList.remove("not-visible");
    winItem.classList.remove("not-visible");
    console.log(winItem);
    winItem.style.color = "white";
    winItem.innerHTML = " <span>Congratulations!!! 🎉🎉🎉, You Won!!</span>";
  }
}
restartBtn.addEventListener("click", () => {
  let setCardsAgain = new RenderCards(
    appDiv,
    cardHolder,
    cardNames,
    cardHolderNames
  );
  setCardsAgain.restart();
});

class RenderCards {
  constructor(rootElement, cardHolderDiv, cardNames, cardHolderNames) {
    this.root = rootElement;
    this.cardHolderDiv = cardHolderDiv;
    this.cardNames = cardNames;
    this.cardHolderNames = cardHolderNames;
    this.i = 0;
    this.cardHolderId = 100;
  }
  scatterCards() {
    this.cardNames.forEach((element) => {
      const card = document.createElement("img");
      card.setAttribute("src", `../assets/${element}.jpg`);
      card.setAttribute("draggable", "true");
      card.setAttribute("ondragstart", "drag(event)");
      card.setAttribute("id", this.i);
      card.style.width = "90px";
      card.style.height = "130px";
      card.style.border = "1px solid black";
      card.style.margin = "2px 2px";
      this.i++;
      this.root.appendChild(card);
    });
  }
  setCardHolders() {
    this.cardHolderNames.forEach((element) => {
      const cardHolder = document.createElement("img");
      cardHolder.setAttribute("src", `../assets/${element}`);
      cardHolder.setAttribute("id", this.cardHolderId);
      cardHolder.setAttribute("ondrop", "drop(event)");
      cardHolder.setAttribute("ondragover", "allowDrop(event)");
      cardHolder.style.width = "130px";
      cardHolder.style.padding = "14px 10px";
      cardHolder.style.border = "2px solid black";
      cardHolder.style.margin = "0px 110px";
      this.cardHolderId++;
      this.cardHolderDiv.appendChild(cardHolder);
    });
  }
  start() {
    this.scatterCards();
    this.setCardHolders();
  }
  restart() {
    restartBtn.classList.add("not-visible");
    winItem.classList.add("not-visible");
    this.scatterCards();
  }
}

const appDiv = document.getElementById("app");
const cardHolder = document.getElementById("card-holder");
let setCards = new RenderCards(appDiv, cardHolder, cardNames, cardHolderNames);
setCards.start();
