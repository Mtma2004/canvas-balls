let c = document.getElementById("canvas");
let contText = c.getContext("2d");
let width = window.innerWidth - 4;
let height = window.innerHeight - 4;
c.width = width;
c.height = height;
// Settings of balles
let radius = 5;
let numbersOfBalles = 100;
let speed = 5;

let fill = true;

class Circle {
  constructor(xpos, ypos, rad, color, width2, speed) {
    (this.x = xpos),
      (this.y = ypos),
      (this.r = rad),
      (this.c = color),
      (this.w = width2),
      (this.s = speed),
      (this.dx = (Math.random() * 3 - 1.5) * speed),
      (this.dy = (Math.random() * 3 - 1.5) * speed);
  }
  draw(context) {
    context.beginPath();
    contText.textAlign = "center";
    contText.textBaseline = "middle";

    context.lineWidth = this.w;
    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    context.strokeStyle = this.c;
    context.stroke();
    contText.fillStyle = this.c;
    if (fill) {
      contText.fill();
    }
    context.closePath();
  }
  update() {
    this.draw(contText);

    if (this.x + this.r > width) {
      this.dx = -this.dx;
    }
    if (this.x < this.r) {
      this.dx = -this.dx;
    }
    if (this.y + this.r > height) {
      this.dy = -this.dy;
    }
    if (this.y < this.r) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
  clickCircle(xmouse, ymouse) {
    let destance = Math.sqrt(
      (xmouse - this.x) * (xmouse - this.x) +
        (ymouse - this.y) * (ymouse - this.y)
    );
    if (destance < radius) {
      this.c = "black";
      dirX = 5;
      diry = 5;
      return true;
    } else {
      dirX = 1;
      diry = 1;
      this.c = "black";
      return false;
    }
  }
}
let all = [];

console.log(width);
console.log(height);
console.log("___");
let circle;
for (let i = 0; i < numbersOfBalles; i++) {
  let ranx = Math.floor(Math.random() * width);
  let rany = Math.floor(Math.random() * height);

  if (
    ranx > radius &&
    ranx < width - radius &&
    rany > radius &&
    rany < height - radius
  ) {
    circle = new Circle(ranx, rany, radius, "black", 1, speed);
    all.push(circle);
  }
}
let updateCircle = function () {
  requestAnimationFrame(updateCircle);

  contText.clearRect(0, 0, width, height);
  all.forEach((el) => {
    el.update();
  });
};
window.requestAnimationFrame(updateCircle);

c.addEventListener("click", (e) => {
  let rect = c.getBoundingClientRect();
  console.log(rect);
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  circle.clickCircle(x, y);
});
