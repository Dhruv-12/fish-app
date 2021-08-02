
var fish, fishIMG
var obstacle, obstacleIMG
var bg, bgIMG
var gameOver, restart;
var gameOverIMG, restartIMG;
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var obstacleGroup;
var score = 0;
function preload(){
 fishIMG = loadImage("fish.png");
 bgIMG = loadImage("bg.png");
 obstacleIMG = loadImage("obstacle.png");
 restartIMG = loadImage("restartImage.png");
 gameOverIMG = loadImage("gameOverImage.png");

}

function setup() {
  // canvas = 800,400;
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2,height/2,width,height);
  bg.addImage(bgIMG)
  bg.scale=4
   bg.velocityX = -5

  fish = createSprite(100,280,20,20);
  fish.addImage(fishIMG);
  fish.scale = 0.25
  
  gameOver = createSprite(width/2,height/2,50,50);
  gameOver.addImage(gameOverIMG);

  restart = createSprite(width/2,height/2+100,50,50);
  restart.addImage(restartIMG);
restart.scale = 0.05;
  obstacleGroup = new Group();
  //createSprite(400, 200, 50, 50);
}

function draw() {
  background(0);  
  
  if(gameState===PLAY){
    if(bg.x<width/2-150){
      bg.x = width/2+150
    }
  
    if (keyDown("space")){
      fish.velocityY = -10
      
    }
  
    fish.velocityY = fish.velocityY+0.8
  
    edges = createEdgeSprites();
    fish.collide(edges[3])
    restart.visible = false;
    gameOver.visible = false;
    score =score+Math.round(frameCount/120);
    
    spawnObstacles();
    if(obstacleGroup.isTouching(fish)){
      gameState = END;
    }

  } else if (gameState===END){
    bg.velocityX = 0;
    fish.velocityY = 0;
    restart.visible = true;
    gameOver.visible = true;
    score = 0;
    obstacleGroup.setVelocityXEach(0);

    if(mousePressedOver(restart)){
      gameState = PLAY;
      obstacleGroup.destroyEach();
      bg.velocityX = -5
    }
    
  }
  
  drawSprites();
  fill("red");
  textSize(24);

  text("SCORE = " + score,width-200,50);

  
 
}

function spawnObstacles(){
  if (frameCount%120===0){
    obstacles = createSprite(width,height-50,20,20);
    obstacles.addImage(obstacleIMG);
    obstacles.scale = 0.35
    obstacles.velocityX = -5
    obstacleGroup.add(obstacles);

  }
}