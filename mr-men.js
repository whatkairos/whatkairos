let img;

function preload() {
  img = loadImage('bros1.png');
}

function setup() {
  createCanvas(1000, 1000);
   var x=12;
}

function draw() {
strokeWeight(8);
background(219, 247, 255);
fill(228, 255, 92);
ellipse(387,43,-91,95);
fill(255, 234, 0);
ellipse(135,129,100,100);
fill(18, 4, 4);
ellipse(115,130,x,x);
ellipse(151,130,x,x);
arc(134, 149, 50, 50, 1, 180); 
fill(255, 234, 0);
rect(108,178,20,41,1);
rect(142,178,20,41,1);
rect(181,140,20,41,1);
rect(61,140,20,41,1);
fill(13, 4, 4);
text("mr happy (mr men)",10,14,67,75);
fill(150, 135, 135);
rect(49,226,411,274,1);  
x=x+1;
}
