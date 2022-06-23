let img;

function preload() {
  img = loadImage('bros1.png');
}

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
    image(img, mouseX, mouseY);
}
