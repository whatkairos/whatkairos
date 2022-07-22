let img;
var x=12;

function preload() {
  img = loadImage('bros1.png');
}

function setup() {
  createCanvas(1000, 1000);
   
}

function draw() {
strokeWeight(8);
background(219, 247, 255);
fill(228, 255, 92);
ellipse(x,43,-91,95);
fill(255, 234, 0);
ellipse(x,129,100,100);
fill(18, 4, 4);
ellipse(x,130,30,20);
ellipse(x+40,130,30,20);
arc(x, 149, 50, 50, 0, Math.PI); 
fill(255, 234, 0);
rect(x-50,178,20,41);
rect(x+30,178,20,41);
rect(x+50,140,20,41);
rect(x+70,140,20,41);
fill(13, 4, 4);
text("mr happy (mr men)",10,14,67,75);
fill(150, 135, 135);
rect(x,226,411,274,1);  
x++;
}
