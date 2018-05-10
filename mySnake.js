var config = {
  type: Phaser.AUTO,
  width: 800,
  hight: 800,
  scene:{
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var borders;

function preload(){
}

function create(){
  boarders = this.physics.add.staticGroup();
}

function update(){

}
