'use strict;'

//with these constants, the user can play with different enemy speed range
const MIN_SPEED = 10000;
const MAX_SPEED = 20000;
let speed;

//this method returns a random posible starting position for the enemies
function posibleStartingPosition(){
  let startingPosition;
  const aux = Math.floor(Math.random() * 3) + 1;
  if(aux == 1){
    startingPosition = 60;
  } else if (aux == 2){
    startingPosition = 145;
  } else startingPosition = 230;

  return startingPosition;
}

//this method returns a random between the constants declared before
function getSpeed() {

  return Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED)) + MIN_SPEED;

}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  speed = this.speed*dt;

  //if the enemy is still on the canvas, then move it
  if(this.x < 505){
    this.x += speed;
  }

  //if it's outside, then set to a random posible starting position, with a random new speed
  else{
    this.x = -100;
    this.y = posibleStartingPosition();
    this.speed = getSpeed()*dt;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
  //for every enemy in the array, if it hits the player, then take the player to the starting point
  for (var i = 0; i < allEnemies.length; i++) {
    if(allEnemies[i].x + 40 >= this.x - 40 && this.x + 40 >= allEnemies[i].x - 40 && allEnemies[i].y == this.y){
      this.x = 203;
      this.y = 400;
    }
  }
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(e){
  //posible player movements
  if (e == "left") {
    if(this.x > 3){
      this.x -= 100;
    }
  }
  else if (e == "right") {
    if(this.x < 403){
      this.x += 100;
    }
  }
  else if (e == "up") {
    this.y -= 85;

    //if the player reaches the water, go back to the starting point
    if(this.y < 60){
      this.x = 203;
      this.y = 400;
    }
  }
  else if (e == "down") {
    if(this.y < 400){
      this.y += 85;
    }
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(-100,posibleStartingPosition(),getSpeed()),
  new Enemy(-100,posibleStartingPosition(),getSpeed()),
  new Enemy(-100,posibleStartingPosition(),getSpeed())
];

// Place the player object in a variable called player
var player = new Player(203,400);




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
