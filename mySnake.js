var config = {
  type: Phaser.AUTO,
  width: 800,
  hight: 800,
  backgroundColor: '#777777',
  scene:{
    preload: preload,
    create: create,
    update: update
  }
};

var snake;
var cursors;

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);

function preload()
{
  this.load.image('food', 'food.png');
  this.load.image('body', 'body.png');
}

function create()
{
  var Snake = new Phaser.Class({

    initialize:
    function Snake(scene, x, y)
    {
      this.headPosition = new Phaser.Geom.Point(x, y);
      this.body = scene.add.group();

      this.head = this.body.create(x * 16, y * 16, 'body');
      this.head.setOrigin(0);

      this.alive = true;
      this.speed = 100;
      this.moveTime = 0;

      this.heading = RIGHT;
      this.direction = RIGHT;
    },

    update: function(time)
    {
      if(time >= this.moveTime)
      {
        return this.move(time);
      }
    },

    faceLeft: function()
    {
      if(this.direction === UP || this.direction === DOWN)
      {
        this.heading = LEFT;
      }
    },

    faceRight: function()
    {
      if(this.direction === UP || this.direction === DOWN)
      {
        this.heading = RIGHT;
      }
    },

    faceUp: function()
    {
      if(this.direction === LEFT || this.direction === RIGHT)
      {
        this.heading = UP;
      }
    },

    faceDown: function()
    {
      if(this.direction === LEFT || this.direction === RIGHT)
      {
        this.heading = DOWN;
      }
    },

    move: function(time)
    {
      console.log('headPosition.x = ', this.headPosition.x);
      console.log('headPosition.y = ', this.headPosition.y);

      switch(this.heading)
      {
        case LEFT:
          this.headPosition.x = this.headPosition.x - 1;
          break;
        case RIGHT:
          this.headPosition.x = this.headPosition.x + 1;
          break;
        case UP:
          this.headPosition.y = this.headPosition.y - 1;
          break;
        case DOWN:
          this.headPosition.y = this.headPosition.y + 1;
          break;
      }

      this.direction = this.heading;
      if(this.headPosition.x > 49)
      {
        
        this.headPosition.x = 0;
      }
      
      if(this.headPosition.x < 0)
      {
        this.headPosition.x = 49;
      }
    
      if(this.headPosition.y > 49)
      {
        this.headPosition.y = 0;
      }
    
      if(this.headPosition.y < 0)
      {
        this.headPosition.y = 49;
      }

      Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);

      this.moveTime = time + this.speed;

      return true;
    }

  });

  snake = new Snake(this, 8, 8);

  cursors = this.input.keyboard.createCursorKeys();

}

function update(time, delta)
{
  if(!snake.alive)
  {
    return;
  }

  if(cursors.left.isDown)
  {
    snake.faceLeft();
  }
  else if (cursors.right.isDown) {
    snake.faceRight();
  }
  else if (cursors.up.isDown) {
    snake.faceUp();
  }
  else if (cursors.down.isDown) {
    snake.faceDown();
  }

  snake.update(time);
}
