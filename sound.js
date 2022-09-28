var sketchProc = function (processingInstance) {
    with (processingInstance) {
      size(400, 400);
      frameRate(30);

      // ProgramCodeGoesHere
      fill(255, 255, 0);
      ellipse(200, 200, 200, 200);
      noFill();
      stroke(0, 0, 0);
      strokeWeight(2);
      arc(200, 200, 150, 100, 0, PI);
      fill(0, 0, 0);
      ellipse(250, 200, 10, 10);
      ellipse(153, 200, 10, 10);



      image(loadImage("bros1.png"));
      img = loadImage("bros2.png");
      mousePressed = function () {

        Sound = new Audio('mario.mp3');
        Sound.play();
        //how to play a sound file here?



      };
    }
  };

  // Get the canvas that Processing-js will use
  var canvas = document.getElementById("mycanvas");
  // Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
  var processingInstance = new Processing(canvas, sketchProc); 