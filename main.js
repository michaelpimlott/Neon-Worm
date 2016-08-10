var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

var blockSize = 10;
var widthInBlocks = width/blockSize;
var heightInBlocks = height/blockSize;

var score = 0;

var drawBorder = function() {
  ctx.fillStyle = '#F408B8';
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0 , blockSize, height);
};

var drawScore = function() {
  ctx.font = "20px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText('Score: ' + score, blockSize, blockSize);
};

var gameOver = function() {
  clearInterval(intervalId);
  ctx.font = "40px Courier";
  ctx.fillStyle = "Black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("I love you, but you blew it. Game Over.", width/2, height/2);
};

var Block = function(col, row) {
  this.col = col;
  this.row = row;
};

Block.prototype.drawSquare = function(color) {
  var x = this.col * blockSize;
  var y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function(color) {
  var centerX = this.col * blockSize + blockSize/2;
  var centerY = this.row * blockSize + blockSize/2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize/2, true);
};

Block.prototype.equal = function(otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

var Worm = function() {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];

  this.direction = "right";
  this.nextDirection = "right";
};

Worm.prototype.draw = function(){
  for (var i = 0; i < this.segments.length; i++){
    this.segments[i].drawSquare("#39FF14");
  }
};

Worm.prototype.move = function(){
  var head = this.segments[0];
  var newHead;

  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col -1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row -1);
  }
  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
     score ++;
     apple.move();
   }else {
     this.segments.pop();
   }
 };
  
drawBorder();
drawScore();
