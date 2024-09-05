const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const window_height = window.outerHeight;
const window_width = window.outerWidth;
canvas.height = window_height;
canvas.width = window_width;

// let x_pos = 5;
// let y_pos = 5;

document.addEventListener("keydown", function (event) {
  let k = event.key;
  if ((k === "w") | (k === "a") | (k === "s") | (k === "d")) {
    player.dir = k;
  }
  if (event.key === "e") {
    Fruit.getInstance();
  }
});

class Pos {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }
}

const drawPlayer = {
  drawPlayer() {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "#000";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.fill();
    ctx.stroke();
  },
};

const drawFruit = {
  drawFruit() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, 25, 25);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.stroke();
  },
};

const checkCollision = {
  checkCollision(entity) {
    if (
      entity.x < this.x + this.radius &&
      entity.x > this.x - this.radius &&
      entity.y < this.y + this.radius &&
      entity.y > this.y - this.radius
    ) {
      console.log("COLLISION");
      entity.x = Math.random() * window_width;
      entity.y = Math.random() * window_height;
    }
  },
};

const move = {
  move() {
    if (this.x > window_width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = window_width;
    }
    if (this.y > window_height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = window_height;
    }
    switch (this.dir) {
      case "w":
        this.y -= 2;
        break;
      case "s":
        this.y += 2;
        break;
      case "a":
        this.x -= 2;
        break;
      case "d":
        this.x += 2;
        break;
      default:
        break;
    }
  },
};

const Fruit = (function () {
  function createInstance() {
    const fruit = {
      x: Math.random() * window_width,
      y: Math.random() * window_height,
    };

    return Object.assign(fruit, drawFruit);
  }
  let instance;

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    resetInstance() {
      instance = null;
      return instance;
    },
  };
})();

function createPlayer(pos) {
  let x = pos.x;
  let y = pos.y;
  let dir = pos.dir;
  let radius = 50;
  const player = { x, y, dir, radius };
  return Object.assign(player, drawPlayer, move, checkCollision);
}

const player = createPlayer(new Pos(10, 10, ""));
const fruit = Fruit.getInstance();
function draw() {
  fruit.drawFruit();
  player.drawPlayer();
  player.checkCollision(fruit);
  player.move();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  window.requestAnimationFrame(animate);
}
animate();

window.requestAnimationFrame(animate);
