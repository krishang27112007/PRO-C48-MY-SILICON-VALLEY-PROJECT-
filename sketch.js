var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var background1
var PLAY=1
var ENd=0;
var gameState=1;
var Survival;
var image1;
var explotion;
var achievment;
var bounce;
var restart;

function preload(){
 monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 //LoadImage("giphy.gif")    
 bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  image1 = loadImage("1.jfif")
  bounce = loadSound("Blastwave_FX_BounceTympani_BW.59868.mp3")
  explotion = loadSound("456.mp3")
  achievment = loadSound("achievment.mp3")
  restart = loadImage("restart.png")
  
}
  

function setup() {
  createCanvas(700,350);
  
  monkey = createSprite(80,300,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;

  ground = createSprite(400,350,1200,10);
  
  score=0;
  Survival=0;
  
  obstacleGroup=createGroup();
  FoodGroup= new Group();
}


function draw() {
  
  image(restart, 0, 0  )
background(image1);
  
  
  
 if(gameState===1){
       monkey.collide(ground);

    objects();
    food();
    Survival=Math.round(frameCount/frameRate())
   
   image1.velocityX=-10;
   if(image1.x<0){ 
     image1.x=image1.width/2;
     
   }
  
   
   if(keyDown("space")&& monkey.y>=298.95){
     monkey.velocityY=-15;
     bounce.play();
     
   }
   monkey.velocityY=monkey.velocityY+0.8;
  console.log(monkey.y);
   
   if(monkey.isTouching(FoodGroup)){
     score=score+2;
     FoodGroup.destroyEach();
     achievment.play();
     
   }
   else if(monkey.isTouching(obstacleGroup)){
     
     
          
     
     gameState=0;
     explotion.play();
     textSize(30)
     text("GAMEOVER ,Please Click On Refresh,", 60,230)
     Textcolor="black"
     image(restart, 300, 250  )
     if(mousePressedOver(restart)) {
     reset();
    }
     

   }

 }
  if(gameState===0){
    monkey.velocity=0;
     FoodGroup.destroyEach();
     obstacleGroup.destroyEach();
    ground.velocityX = 0;
  }

  drawSprites();
  stroke("black");
  textSize(20);
  strokeWeight(0.1);
  text(""+score,40,40);
//  text(mouseX+" , "+mouseY,200,200);
    text("Survival Time ----- "+Survival,200,100);

 
}


function food(){
  if(frameCount%80===0){
    var banana = createSprite(700,Math.round(random(110,230)),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-10-score/2;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
}
function objects(){
  if(frameCount%180===0){
    var obstacle=createSprite(700,315,20,20)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.18;
    obstacle.velocityX=-10-score/2;
    obstacleGroup.add(obstacle);
  }
}
