//PLAYER

class Player {
  constructor() {
    this.width = 200;
    this.height = 180;
    this.positionX = 30;
    this.positionY = 20;
    this.domElement = null;

    this.createDomElement();
  }

  createDomElement() {
    console.log("I am the div child");
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("class", "player");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.backgroundImage =
      "url('./img/harry-potter-flying.png')";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }

  moveLeft() {
    const moveSize = 7;
    if (this.positionX > 0) {
      this.positionX -= moveSize;
      this.domElement.style.left = this.positionX + "px";
      this.domElement.style.backgroundImage =
        "url('./img/harry-potter-flying-left.png')";

      //this.domElement.setAttribute("class", "player");
      this.domElement.setAttribute("class", "player-left");
      console.log("moving left");
    }
  }
  moveRight() {
    const moveSize = 7;
    if (this.positionX + this.width < 1200) {
      this.positionX += moveSize;
      this.domElement.style.left = this.positionX + "px";
      this.domElement.style.backgroundImage =
        "url('./img/harry-potter-flying.png')";
      this.domElement.setAttribute("class", "player");
      console.log("moving right");
    }
  }
  moveBottom() {
    let moveDown = 7;
    if (this.positionY + this.height > 300) {
      this.positionY -= moveDown;
      this.domElement.style.bottom = this.positionY + "px";
      console.log("moving down");
    }
  }
  moveTop() {
    console.log(this.positionY);
    let moveUp = 7;
    if (this.positionY + this.height < 795) {
      this.positionY += moveUp;
      this.domElement.style.bottom = this.positionY + "px";
      console.log("moving up");
    }
  }
}

//OBSTACLES
class Obstacle {
  constructor() {
    this.width = 100;
    this.height = 150;
    this.positionX = Math.floor(Math.random() * (1200 - this.width + 1));
    this.positionY = 800;
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("class", "obstacle");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.backgroundImage = "url('./img/dementor.png')";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "px";
  }
}

const player1 = new Player();
const obstacles = [];

setInterval(function () {
  const newObstacle = new Obstacle();
  obstacles.push(newObstacle);
}, 6000);

setInterval(function () {
  obstacles.forEach(function (obstacle) {
    obstacle.moveDown();
    if (
      player1.positionX < obstacle.positionX + obstacle.width &&
      player1.positionX + player1.width > obstacle.positionX &&
      player1.positionY < obstacle.positionY + obstacle.height &&
      player1.positionY + player1.height > obstacle.positionY
    ) {
      console.log("game over");
      // location.href = "/gameover.html"; //
    }
  });
}, 30);

class Score {
  constructor() {
    this.width = 100;
    this.height = 50;
    this.positionX = 1080;
    this.positionY = 10;
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("id", "score");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);

    const scoreDiv = document.getElementById("score"); //Accesing my score div
    const scoreText = document.createElement("p");
    scoreText.setAttribute("class", "score-text");
    scoreDiv.appendChild(scoreText);
  }
}

class Prize {
  constructor() {
    this.width = 100;
    this.height = 150;
    this.positionY = 800;
    this.positionX = Math.floor(Math.random() * (1200 - this.width + 1));
    this.domElement = null;

    this.createDomElement();
  }
  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("class", "prize");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.backgroundImage = "url('./img/patronus.png')";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }
  moveDown() {
    this.positionY--;
    this.domElement.style.bottom = this.positionY + "px";
  }
  remove() {
    this.domElement.remove();
  }
}

const prizes = [];
//Every time prize & player collides, score increments: +10;
const displayScore = new Score();

const countingScore = displayScore.domElement.querySelector(".score-text");
let score = 0;

setInterval(function () {
  const newPrize = new Prize();
  prizes.push(newPrize);
}, 7000);

setInterval(function () {
  prizes.forEach(function (prizeInstance, index) {
    prizeInstance.moveDown();
    if (
      player1.positionX < prizeInstance.positionX + prizeInstance.width &&
      player1.positionX + player1.width > prizeInstance.positionX &&
      player1.positionY < prizeInstance.positionY + prizeInstance.height &&
      player1.positionY + player1.height > prizeInstance.positionY
    ) {
      prizes.splice(index, 1);
      prizeInstance.remove();
      score += 10;
      countingScore.innerText = score;
      console.log(countingScore, score);
    }
  });
}, 30);

//Adding functionality / Event Listeners
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    player1.moveLeft();
  } else if (e.code === "ArrowRight") {
    player1.moveRight();
  } else if (e.code === "ArrowUp") {
    player1.moveTop();
  } else if (e.code === "ArrowDown") {
    player1.moveBottom();
  }
});
