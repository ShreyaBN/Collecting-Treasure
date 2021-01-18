var PLAY = 1;
var END = 0;
var gameState = 1;

var Fruit1, Fruit2, Fruit3, Fruit4, EnemyImage, sword, gameover, Sword, fruitGroup, enemyGroup, fruit, monster;      

var score;

function preload(){
 Fruit1 = loadImage("fruit1.png");
 Fruit2 = loadImage("fruit2.png");
 Fruit3 = loadImage("fruit3.png");
 Fruit4 = loadImage("fruit4.png");
  
 EnemyImage = loadAnimation("alien1.png", "alien2.png");
  
 sword = loadImage("sword.png");
  
 gameover = loadAnimation("gameover.png");
  
 KnifeSound = loadSound("knifeSwooshSound.mp3");
 GameoverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(500, 500);
  
  Sword = createSprite(50, 250, 20, 20);
  Sword.addImage(sword);
  Sword.scale = 0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  Sword.setCollider("rectangle", 0, 0, 90, 90);
  Sword.debug = false;
  
  score = 0;
}

function draw(){
 background('#fae');
  
  textSize(20);
  fill("white");
  stroke("black")
  strokeWeight(2);
  text("Score: "+ score, 410, 30);
  
  if(gameState === PLAY){
    Sword.y = World.mouseY;
    Sword.x = World.mouseX;
    friuts();
    Enemy();
    if(fruitGroup.isTouching(Sword)){
    fruitGroup.destroyEach();
    score = score+2;
    KnifeSound.play();
   }
    if(Sword.isTouching(enemyGroup)){
    gameState = END;
  }
}
  
  if(gameState === END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    Sword.x = 250;
    Sword.y =250;
    Gameover = createSprite(250, 250, 40, 40);
    Gameover.addAnimation("GAMEOVER", gameover);
    background('rgba(100%,0%,100%,0.5)')
    GameoverSound.play();
  }
  
  drawSprites();
}

function friuts(){
  if(World.frameCount%50===0){
    position = Math.round(random(1,2));
    console.log(position);
    if(position === 1){
      fruit.x = 500;
      fruit.velocityX=-(7+(score/4));
    }
    
  if(position === 2){
    fruit.x = 50;
    fruit.velocityX = (7 + score/4)
  }
    fruit = createSprite(500, 200, 20, 20);
    fruit.scale = 0.2;
    i = Math.round(random(1,4));
    if(i == 1){
      fruit.addImage(Fruit1);
    }else if(i == 2){
      fruit.addImage(Fruit2);
    }else if(i == 3){
      fruit.addImage(Fruit3);
    }else if(i == 4){
      fruit.addImage(Fruit4);
    }
    
    fruit.y = Math.round(random(50, 340));
    
    fruit.velocityX = -(7 + score/4);
    fruit.setLimetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%250===0){
    monster = createSprite(500, 200, 20, 20);
    monster.addAnimation("moving", EnemyImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8 + score/10);
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}
