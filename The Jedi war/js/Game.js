class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");   
  }
  
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
 
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start()
  {
    player = new Player();
    playerCount = player.getCount()

    form = new Form()
    form.display()

    jet1 = createSprite(random(150,170),random(100,170),20,20)
    jet1.addImage("jet",whiteJet)
    jet1.addImage("boost",whiteJetBoost)
    jet1.scale = 0.1;

    jet2 = createSprite(random(50,90),random(100,170),20,20)
    jet2.addImage("jet",blackJet)
    jet2.addImage("boost",blackJetBoost)
    jet2.scale = 0.1;

    jets = [jet1,jet2]
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

     //C39
     this.resetTitle.html("Reset Game");
     this.resetTitle.class("resetText");
     this.resetTitle.position(width / 2 + 200, 40);
 
     this.resetButton.class("resetButton");
     this.resetButton.position(width / 2 + 230, 100);
     this.resetButton.size(50,50)
 
     //this.leadeboardTitle.html("Leaderboard");
     //this.leadeboardTitle.class("resetText");
     //this.leadeboardTitle.position(width / 3 - 60, 40);
 
      //this.leader1.class("leadersText");
      //this.leader1.position(width / 3 - 50, 80);
 
      //this.leader2.class("leadersText");
      //this.leader2.position(width / 3 - 50, 130);
  }

  play()
  {
    //var whiteJ = jet1
    this.handleElements()
    this.handleResetButton()

    Player.getPlayersInfo()

    drawSprites()

    var index = 0;
    for(var plr in allPlayers)
    {
      index = index + 1;

      var x = allPlayers[plr].positionX;
      var y = height - allPlayers[plr].positionY;
      var ang = allPlayers[plr].angle;
      var bst = allPlayers[plr].boost;

      jets[index-1].position.x = x;
      jets[index-1].position.y = y;

      jets[index-1].rotation = ang
      if(bst == 1)
      {
        jets[index - 1].changeImage("boost")
      }else{
        jets[index - 1].changeImage("jet")
      }
    }
    
    this.handlePlayerControls()
    //this.drawBullets()
    //player.constrainToMap()
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }
  
  handlePlayerControls()
  {
    player.goTheWayWeAreFacing()
    player.playerInputs()
    
    if(keyIsDown(RIGHT_ARROW))
    {
      player.angle += 2.5 + HALF_PI;
    }

    if(keyIsDown(LEFT_ARROW))
    {
      player.angle -= 1.5 + HALF_PI;
    }
 
    if(keyCode == 32)
    {
      this.drawBullets()
    }

  }

  shoot()
  {
    let bullet = new Bullet(player.x, player.y, player.angle);
    bullets.push(bullet);
  }

  drawBullets() {
    this.shoot()
    for (let bullet of bullets) {   
    bullet.display();
    }
    console.log(bullets)
  }

  

}
