//PLAYER

class Player {
  constructor() {
    this.width = 155;
    this.height = 150;
    this.positionX = 30;
    this.positionY = 20;
    this.domElement = null;
    this.movingSpeed = 8;
    this.createDomElement();
  }

  createDomElement() {
    this.domElement = document.createElement("div");

    this.domElement.setAttribute("class", "player");
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";
    this.domElement.style.backgroundImage = "url('./img/hp-left.png')";

    const boardElement = document.getElementById("board");
    boardElement.appendChild(this.domElement);
  }

  moveLeft() {
    if (this.positionX > 0) {
      this.positionX -= this.movingSpeed;
      this.domElement.style.left = this.positionX + "px";
      this.domElement.style.backgroundImage = "url('./img/hp-right.png')";
      this.domElement.setAttribute("class", "player-left");
    }
  }
  moveRight() {
    if (this.positionX + this.width < 1200) {
      this.positionX += this.movingSpeed;
      this.domElement.style.left = this.positionX + "px";
      this.domElement.style.backgroundImage = "url('./img/hp-left.png')";
      this.domElement.setAttribute("class", "player");
    }
  }
  moveBottom() {
    if (this.positionY + this.height > 150) {
      this.positionY -= this.movingSpeed;
      this.domElement.style.bottom = this.positionY + "px";
    }
  }
  moveTop() {
    if (this.positionY + this.height < 795) {
      this.positionY += this.movingSpeed;
      this.domElement.style.bottom = this.positionY + "px";
    }
  }
}

//SCORE

class Score {
  constructor() {
    this.width = 80;
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

    const scoreDiv = document.getElementById("score");
    const scoreText = document.createElement("p");
    scoreText.setAttribute("class", "score-text");
    scoreDiv.appendChild(scoreText);

    const levelText = document.createElement("h1");
    levelText.setAttribute("class", "level-text");
    //levelText.innerText = "Level 1";
    scoreDiv.appendChild(levelText);
  }
}

//Patronus
const prizes = [];

//Every time prize & player collides, score increments: +30;
const displayScore = new Score();

const countingScore = displayScore.domElement.querySelector(".score-text");
let score = 0;

//PRIZES

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
      score += 30;
      countingScore.innerText = score;
      updateGameParameters(score); //ISsue
    }
  });
}, 20);

setInterval(function () {
  const newPrize = new Prize();
  prizes.push(newPrize);
}, 4000);

//OBSTACLES --> Dementors
class Obstacle {
  constructor() {
    this.width = 80;
    this.height = 100;
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
let intervals = 3000;
//Set Interval para que aparezcan nuevos obstaculos
function createObstacle() {
  const newObstacle = new Obstacle();
  obstacles.push(newObstacle);
}

//SEt Interval para la velocidad con la q se mueven los obstáculos
let obstacleSpeed = 20;
let level = "Level 1";

let obstacleInterval = setInterval(createObstacle, intervals);

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
      location.href = "./game-over.html";
    }
  });
}, obstacleSpeed);

function updateGameParameters(score) {
  // Update obstacle speed and intervals based on the score
  if (score >= 400) {
    obstacleSpeed = 5;
    level = "Level 5";
    intervals = 2000;
    changeLevelBackground();
  } else if (score >= 300) {
    obstacleSpeed = 10;
    level = "Level 4";
    intervals = 2000;
    changeLevelBackground();
  } else if (score >= 200) {
    obstacleSpeed = 15;
    level = "Level 3";
    intervals = 2000;
    changeLevelBackground();
  } else if (score >= 100) {
    obstacleSpeed = 18;
    level = "Level 2";
    intervals = 2500;
    changeLevelBackground();
  }

  document.getElementsByClassName("level-text").innerText = level;
  console.log(level);

  clearInterval(obstacleInterval);
  obstacleInterval = setInterval(createObstacle, intervals);
}

function changeLevelBackground() {
  const boardElement = document.getElementById("board");
  if (level === "Level 2") {
    boardElement.style.backgroundImage = "url('./img/background-test.jpg')";
  } else if (level === "Level 3") {
    boardElement.style.backgroundImage = "url('./img/background-test-2.jpg')";
  } else if (level === "Level 4") {
    boardElement.style.backgroundImage = "url('./img/snowy-bg.jpg')";
  } else if (level === "Level 5") {
    boardElement.style.backgroundImage = "url('./img/quidditch-bg.jpg')";
  }
}
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
