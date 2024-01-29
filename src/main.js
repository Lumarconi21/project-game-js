//PLAYER

class Player {
  constructor() {
    this.width = 320;
    this.height = 300;
    this.positionX = 30;
    this.positionY = 20;
    this.domElement = null;
    //Applying a formula to equal vh & vw to pixels
    const totalViewportWidth = window.innerWidth;
    this.playerWidthPercentage = (this.width / totalViewportWidth) * 100;
    const totalViewportHeight = window.innerHeight;
    this.playerHeightPercentage = (this.height / totalViewportHeight) * 100;

    this.createDomElement();
  }

  createDomElement() {
    console.log("I am the div child");
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("id", "player");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);

    //Adding img to the Player Element
    const playerImg = document.createElement("img");
    playerImg.setAttribute("id", "hp-img");
    playerImg.src = "./img/harry-potter-flying.png";
    this.domElement.appendChild(playerImg);
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX--;
      this.domElement.style.left = this.positionX + "vw";
      console.log("moving left");
    }
  }
  moveRight() {
    if (this.positionX + this.playerWidthPercentage < 100) {
      this.positionX++;
      this.domElement.style.left = this.positionX + "vw";
      console.log("moving right");
    }
  }
}

//OBSTACLES
class Obstacle {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = Math.floor(Math.random() * (100 - this.width + 1));
    this.positionY = 100;
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    console.log("I am the obstacle div");
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("class", "obstacle");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "vw";
    this.domElement.style.bottom = this.positionY + "vh";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "vh";
  }
}

const player1 = new Player();
const obstacles = [];

setInterval(function () {
  const newObstacle = new Obstacle();
  obstacles.push(newObstacle);
}, 3000);

setInterval(function () {
  obstacles.forEach(function (obsInstance) {
    obsInstance.moveDown();
    if (
      player1.positionX < obsInstance.positionX + obsInstance.width &&
      player1.positionX + this.playerWidthPercentage > obsInstance.positionX &&
      player1.positionY < obsInstance.positionY + obsInstance.height &&
      player1.positionY + this.playerHeightPercentage > obsInstance.positionY
    ) {
      console.log("game over");
    }
  });
}, 50);

//Adding functionality / Event Listeners
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    player1.moveLeft();
  } else if (e.code === "ArrowRight") {
    player1.moveRight();
  }
});
