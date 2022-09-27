new p5();

function setup() {
  createCanvas(400, 400);
}

var faces = [
    getImage("avatars/aqualine-sapling"),
    getImage("avatars/aqualine-seed"),
    getImage("avatars/aqualine-seedling"),
    getImage("avatars/aqualine-tree"),
    getImage("avatars/aqualine-ultimate"),
    getImage("avatars/avatar-team"),
    getImage("avatars/duskpin-sapling"),
    getImage("avatars/duskpin-seed"),
    getImage("avatars/duskpin-tree"),
    getImage("avatars/duskpin-ultimate"),
    getImage("avatars/leaf-blue"),
    getImage("avatars/leaf-green"),
    getImage("avatars/leaf-grey"),
    getImage("avatars/leaf-orange"),
    getImage("avatars/leaf-red"),
    getImage("avatars/leaf-yellow"),
    getImage("avatars/leafers-sapling"),
    getImage("avatars/leafers-seed"),
    getImage("avatars/leafers-seedling"),
    getImage("avatars/leafers-tree"),
    getImage("avatars/leafers-ultimate"),
    getImage("avatars/marcimus"),
    getImage("avatars/marcimus-orange"),
    getImage("avatars/marcimus-purple"),
    getImage("avatars/marcimus-red"),
    getImage("avatars/mr-pants"),
    getImage("avatars/mr-pants-green"),
    getImage("avatars/mr-pants-orange"),
    getImage("avatars/mr-pants-pink"),
    getImage("avatars/mr-pants-purple"),
    getImage("avatars/mr-pants-with-hat"),
    getImage("avatars/mr-pink"),
    getImage("avatars/mr-pink-green"),
    getImage("avatars/mr-pink-orange"),
    getImage("avatars/old-spice-man"),
    getImage("avatars/old-spice-man-blue"),
    getImage("avatars/orange-juice-squid"),
    getImage("avatars/piceratops-sapling"),
    getImage("avatars/piceratops-seed"),
    getImage("avatars/piceratops-seedling"),
    getImage("avatars/piceratops-tree"),
    getImage("avatars/piceratops-ultimate"),
    getImage("avatars/primosaur-sapling"),
    getImage("avatars/primosaur-seed"),
    getImage("avatars/primosaur-seedling"),
    getImage("avatars/primosaur-tree"),
    getImage("avatars/primosaur-ultimate"),
    getImage("avatars/purple-pi"),
    getImage("avatars/purple-pi-pink"),
    getImage("avatars/purple-pi-teal"),
    getImage("avatars/questionmark"),
    getImage("avatars/robot_female_1"),
    getImage("avatars/robot_female_2"),
    getImage("avatars/robot_female_3"),
    getImage("avatars/robot_male_1"),
    getImage("avatars/robot_male_2"),
    getImage("avatars/robot_male_3"),
    getImage("avatars/spunky-sam"),
    getImage("avatars/spunky-sam-green"),
    getImage("avatars/spunky-sam-orange"),
    getImage("avatars/spunky-sam-red"),
    getImage("avatars/starky-sapling"),
    getImage("avatars/starky-seed"),
    getImage("avatars/starky-seedling"),
    getImage("avatars/starky-tree"),
    getImage("avatars/starky-ultimate"),
    getImage("creatures/Hopper-Happy"),
    getImage("creatures/Hopper-Cool"),
    getImage("creatures/Hopper-Jumping"),
    getImage("creatures/OhNoes"),
    getImage("creatures/OhNoes-Happy"),
    getImage("creatures/OhNoes-Hmm"),
];
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
        fill(222, 124, 124);
    } else {
        fill(43, 217, 188);
    }
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size, 10);
    if (this.isFaceUp) {
        image(this.face, this.x, this.y, this.size, this.size);
    } else {
        image(getImage("avatars/leaf-green"), this.x, this.y, this.size, this.size);
    }
};

Tile.prototype.isUnderMouse = function (x, y) {
    return x >= this.x && x <= this.x + this.size &&
        y >= this.y && y <= this.y + this.size;
};

background(255, 255, 255);

var game = new Game();

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

noLoop();
