class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    
    this.angle = 0;
    this.speed = 3;
    this.boost = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }
 

  //Bp
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  //Bp
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

 getDistance()
 {
   database.ref("players/player" + this.index).on("value", data =>{
     var data = data.val()
     this.positionX = data.positionX;
     this.positionY = data.positionY;
   })
 }

  //Bp
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  update()
  {
    database.ref("players/player" + this.index).update({
      positionX : this.positionX,
      positionY : this.positionY,
      angle : this.angle,
      boost : this.boost
    })

  }

  goTheWayWeAreFacing()
  {
    this.positionX += this.speed * sin(this.angle );
    this.positionY += this.speed * cos(this.angle);
    player.update()
  }
  playerInputs()
  {
    if(keyDown(UP_ARROW)){
      this.speed = 5;
      this.boost = 1
      boostSound.play()
    }else{    
      boostSound.stop();
      boostSound.stop();
      this.speed = 3;
      this.boost = 0
    }
  }

  
}

