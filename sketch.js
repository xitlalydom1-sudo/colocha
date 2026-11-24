let radius = 25;
let circleX, circleY;
let speedX, speedY;
let paddleW = 90;
let paddleH = 20;
let paddleY = 370;
let gameOver = false;
let restartButton;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(32);
  resetBall();
}

function resetBall() {
  circleX = width / 2;
  circleY = height / 2;
  speedX = random(-1, 1) * random(3, 6);
  speedY = 4;
}

function restartGame() {
  gameOver = false;
  resetBall();
}

function draw() {
  background('rgb(255 255 255)');

  if (gameOver) {
    fill(255, 0, 0);
    text("Try Again lol", width / 2, height / 2);
    return;
  }

  circleX += speedX;
  circleY += speedY;

  if (circleX - radius < 0 || circleX + radius > width) {
    speedX *= -1;
  }

  // bounce off top wall
  if (circleY - radius < 0) {
    speedY *= -1;
  }

  // paddle position, clamped so it stays fully on screen
  let paddleX = constrain(mouseX, paddleW / 2, width - paddleW / 2);
  let paddleTop = paddleY - paddleH / 2;

  if (
    speedY > 0 &&
    circleY + radius >= paddleTop &&
    circleY + radius <= paddleTop + speedY + 2 &&
    circleX > paddleX - paddleW / 2 &&
    circleX < paddleX + paddleW / 2
  ) {
    speedY *= -1;
    let hitOffset = (circleX - paddleX) / (paddleW / 2);
    speedX += hitOffset * 2;
  }

  if (circleY - radius > height) {
    gameOver = true;
  }

  fill('rgb(254 180 248)');
  circle(circleX, circleY, radius * 2);

  fill('rgb(0 0 0)');
  rectMode(CENTER);
  rect(paddleX, paddleY, paddleW, paddleH);
}