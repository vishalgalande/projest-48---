var canvas;
var jet1 , jet2;
var backgroundImage , titleBG, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers;
var jets = [],bullets = [];
var rotateSpeed;
var blackJet, whiteJet, blackJetBoost, whiteJetBoost;
var boostSound;

//BP
function preload() {
  backgroundImage = loadImage("assets/bg2.jpg");
  titleBG = loadImage("assets/titleBG.jpg")

  boostSound = loadSound("assets/BoostSD.mp3")
  boostSound.stop()
  boostSound.setVolume(0.3)

  blackJet = loadImage("assets/jet2.png");
  blackJetBoost = loadImage("assets/jet2-boost.png")

  whiteJet = loadImage("assets/jet1.png");
  whiteJetBoost = loadImage("assets/jet1-boost.png")
}

//BP
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  angleMode(DEGREES)
  game = new Game();
  game.getState();
  game.start();
  rotateSpeed = 0.05;
}

//BP
function draw() {
  if(gameState == 1)
  {
    background(backgroundImage);
  }else{
    background(titleBG);
  }
  

  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

