new p5();

let faces;
let game;
function preload() {
    faces = [
        loadImage("images/tile000.png"),
        loadImage("images/tile001.png"),
        loadImage("images/tile002.png"),
        loadImage("images/tile003.png"),
        loadImage("images/tile004.png"),
        loadImage("images/tile005.png"),
        loadImage("images/tile006.png"),
        loadImage("images/tile007.png"),
        loadImage("images/tile008.png"),
        loadImage("images/tile009.png"),
        loadImage("images/tile010.png"),
        loadImage("images/tile011.png"),
        loadImage("images/tile012.png"),
        loadImage("images/tile013.png"),
        loadImage("images/tile014.png"),
        loadImage("images/tile015.png"),
        loadImage("images/tile016.png"),
        loadImage("images/tile017.png"),
        loadImage("images/tile018.png"),
        loadImage("images/tile019.png"),
        loadImage("images/tile020.png"),
        loadImage("images/tile021.png"),
        loadImage("images/tile022.png"),
        loadImage("images/tile023.png"),
        loadImage("images/tile024.png"),
        loadImage("images/tile025.png"),
        loadImage("images/tile026.png"),
        loadImage("images/tile027.png"),
        loadImage("images/tile028.png"),
        loadImage("images/tile029.png"),
        loadImage("images/tile030.png"),
        loadImage("images/tile031.png"),
        loadImage("images/tile032.png"),
        loadImage("images/tile033.png"),
        loadImage("images/tile034.png"),
        loadImage("images/tile035.png"),
        loadImage("images/tile036.png"),
        loadImage("images/tile037.png"),
        loadImage("images/tile038.png"),
        loadImage("images/tile039.png"),
        loadImage("images/tile040.png"),
        loadImage("images/tile041.png"),
        loadImage("images/tile042.png"),
        loadImage("images/tile043.png"),
        loadImage("images/tile044.png"),
        loadImage("images/tile045.png"),
        loadImage("images/tile046.png"),
        loadImage("images/tile047.png"),
        loadImage("images/tile048.png"),
        loadImage("images/tile049.png"),
        loadImage("images/tile050.png"),
        loadImage("images/tile051.png"),
        loadImage("images/tile052.png"),
        loadImage("images/tile053.png"),
        loadImage("images/tile054.png"),
        loadImage("images/tile055.png"),
        loadImage("images/tile056.png"),
        loadImage("images/tile057.png"),
        loadImage("images/tile058.png"),
        loadImage("images/tile059.png"),
        loadImage("images/tile060.png"),
        loadImage("images/tile061.png"),
        loadImage("images/tile062.png"),
        loadImage("images/tile063.png"),
        loadImage("images/tile064.png"),
        loadImage("images/tile065.png"),
        loadImage("images/tile066.png"),
        loadImage("images/tile067.png"),
        loadImage("images/tile068.png"),
        loadImage("images/tile069.png"),
        loadImage("images/tile070.png"),
        loadImage("images/tile071.png"),
        loadImage("images/tile072.png"),
        loadImage("images/tile073.png"),
        loadImage("images/tile074.png"),
        loadImage("images/tile075.png"),
        loadImage("images/tile076.png"),
        loadImage("images/tile077.png"),
        loadImage("images/tile078.png"),
        loadImage("images/tile079.png"),
        loadImage("images/tile080.png"),
        loadImage("images/tile081.png"),
        loadImage("images/tile082.png"),
        loadImage("images/tile083.png"),
        loadImage("images/tile084.png"),
        loadImage("images/tile085.png"),
        loadImage("images/tile086.png"),
        loadImage("images/tile087.png"),
        loadImage("images/tile088.png"),
        loadImage("images/tile089.png"),
        loadImage("images/tile090.png"),
        loadImage("images/tile091.png"),
        loadImage("images/tile092.png"),
        loadImage("images/tile093.png"),
        loadImage("images/tile094.png"),
        loadImage("images/tile095.png"),
        loadImage("images/tile096.png"),
        loadImage("images/tile097.png"),
        loadImage("images/tile098.png"),
        loadImage("images/tile099.png"),
    ];
}

function setup() {
    game = new Game();
    createCanvas(400, 400);
}


// Now shuffle the elements of that array
var shuffleArray = function (array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var ind = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[ind];
        array[ind] = temp;
    }
};
var Tile = function (x, y, face) {
    this.x = x;
    this.y = y;
    this.size = 70;
    this.face = face;
    this.isFaceUp = false;
    this.isMatch = false;
    this.hover = false;
};

var Player = function () {
    this.numTries = 0;
    this.numMatches = 0;
};
var Game = function () {
    this.players = [new Player(), new Player()];
    this.currentPlayer = 0;
    this.numCols = 5;
    this.numRows = 4;
    this.possibleFaces = faces.slice(0);
    this.selected = [];
    for (var i = 0; i < (this.numCols * this.numRows) / 2; i++) {
        // Randomly pick one from the array of remaining faces
        var randomInd = floor(random(this.possibleFaces.length));
        var face = this.possibleFaces[randomInd];
        // Push twice onto array
        this.selected.push(face);
        this.selected.push(face);
        // Remove from array
        this.possibleFaces.splice(randomInd, 1);
    }
    shuffleArray(this.selected);
    this.tiles = [];
    for (var i = 0; i < this.numCols; i++) {
        for (var j = 0; j < this.numRows; j++) {
            var tileX = i * 78 + 10;
            var tileY = j * 78 + 40;
            var tileFace = this.selected.pop();
            this.tiles.push(new Tile(tileX, tileY, tileFace));
        }
    }

    this.flippedTiles = [];
    this.delayStartFC = null;
    this.t0 = millis();
    this.gameOver = false;
};

Tile.prototype.draw = function () {
    if (this.hover) {
        fill(255, 255, 255);
    } else {
        fill(125, 125, 125);
    }
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 10);
    if (this.isFaceUp) {
        image(this.face, this.x, this.y, this.size, this.size);
    } else {
        //     image(getImage("avatars/leaf-green"), this.x, this.y, this.size, this.size);
    }
};

Tile.prototype.isUnderMouse = function (x, y) {
    return x >= this.x && x <= this.x + this.size &&
        y >= this.y && y <= this.y + this.size;
};


mouseClicked = function () {
    if (game.gameOver) {
        game = new Game();
        loop();
    }

    for (var i = 0; i < game.tiles.length; i++) {
        var tile = game.tiles[i];
        if (tile.isUnderMouse(mouseX, mouseY)) {
            if (game.flippedTiles.length < 2 && !tile.isFaceUp) {
                tile.isFaceUp = true;
                game.flippedTiles.push(tile);
                if (game.flippedTiles.length === 2) {
                    game.players[game.currentPlayer].numTries++;
                    if (game.flippedTiles[0].face === game.flippedTiles[1].face) {
                        game.flippedTiles[0].isMatch = true;
                        game.flippedTiles[1].isMatch = true;
                        game.flippedTiles.length = 0;
                        game.players[game.currentPlayer].numMatches++;
                    }
                    var n = game.currentPlayer + 1;
                    var d = game.players.length;
                    game.currentPlayer = ((n % d) + d) % d;
                    game.delayStartFC = frameCount;
                }
            }
            loop();
        }
    }
};

var shadow = function (m, x, y) {
    fill(0, 0, 0);
    text(m, x + 6, y + 6);
    fill(228, 245, 231);
    text(m, x, y);
};

draw = function () {

    // println(game.currentPlayer);
    background(255, 255, 255);
    if (game.delayStartFC && (frameCount - game.delayStartFC) > 30) {
        for (var i = 0; i < game.tiles.length; i++) {
            var tile = game.tiles[i];
            if (!tile.isMatch) {
                tile.isFaceUp = false;
            }
        }
        game.flippedTiles = [];
        game.delayStartFC = null;
        // noLoop();
    }

    for (var i = 0; i < game.tiles.length; i++) {
        game.tiles[i].hover = game.tiles[i].isUnderMouse(mouseX, mouseY);
        game.tiles[i].draw();
    }

    if (game.players[0].numMatches + game.players[1].numMatches === game.tiles.length / 2) {
        fill(255, 0, 0);
        textSize(61);
        if (game.players[0].numMatches > game.players[1].numMatches) {
            shadow("Player 0 wins!", 8, 100);
        } else if (game.players[0].numMatches < game.players[1].numMatches) {
            shadow("Player 1 wins!", 8, 100);
        } else if (game.players[0].numMatches === game.players[1].numMatches) {
            shadow("Tie!", 8, 100);
        }
        noLoop();
    }
    fill(0, 0, 0);
    textSize(30);
    text("Play-Time:", 8, 385);
    text("Player 0: " + game.players[0].numMatches, 23, 34);
    text("Player 1: " + game.players[1].numMatches, 234, 34);
    var t = millis();
    var playtime = t - game.t0;
    text(playtime, 179, 386);
    if (playtime > 300000) {
        game.gameOver = true;
        textSize(72);
        shadow("duck poo the\ngames over\ncacahead!", 4, 96);
        noLoop();
        fill(255, 0, 0);
        rect(291, 327, 113, 76);
        fill(242, 228, 228);
        textSize(40);
        text("restart", 287, 379);

    }
};

// noLoop();
