const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var rope2;
var rope3;
var fruit;
var fruit_con;
var fruit_con2;
var fruit_con3;
var backgroundImage;
var rabbit;
var rabbitImage;
var melon;
var melonImage;
var scissor;
var button;
var button2;
var button3;
var sad;
var eat;
var blink;
var airSound;
var cutSound;
var bgSound;
var eatSound;
var sadSound;
var balloon;
var balloonImage;
var mute;
var muteImage;
var edges;


function preload(){
  backgroundImage=loadImage("background.png")
  rabbitImage=loadImage("Rabbit-01.png")
  melonImage=loadImage("melon.png")
  balloonImage=loadImage("balloon.png")
  muteImage=loadImage("mute.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  airSound=loadSound("air.wav")
  eatSound=loadSound("eating_sound.mp3")
  cutSound=loadSound("rope_cut.mp3")
  bgSound=loadSound("sound1.mp3")
  sadSound=loadSound("sad.wav")

  blink.playing=true
  eat.playing=true
  sad.playing=true
  sad.looping=false
  eat.looping=false
}

function setup() 
{
  createCanvas(500,700);
  

  bgSound.play()
  bgSound.setVolume(0.8)
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,690,600,20)
  rope = new Rope(8,{x:40,y:30})
  rope2 = new Rope(7,{x:370,y:40})
  rope3 = new Rope(4,{x:400,y:225})
  
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20
  rabbit = createSprite(450,620,100,100)
  rabbit.addAnimation("blink",blink)
  rabbit.changeAnimation("blink")
  rabbit.addAnimation("eat",eat)
  rabbit.addAnimation("sad",sad)
  rabbit.velocityX=-3
  
  

  rabbit.scale=0.2

  balloon=createImg("balloon.png")
  balloon.position(-25,280)
  balloon.size(150,100)
  balloon.mouseClicked(blow)

  mute=createImg("mute.png")
  mute.position(420,5)
  mute.size(50,50)
  mute.mouseClicked(stopSound)

  

  //melon = createSprite(270,300,20,20)
  //melon.addImage(melonImage)
  //melon.scale=0.1
  button=createImg("cut_btn.png")
  button.position(35,20)
  button.size(80,80)
  button.mouseClicked(drop)

  button2=createImg("cut_btn.png")
  button2.position(340,30)
  button2.size(80,80)
  button2.mouseClicked(drop2)

  button3=createImg("cut_btn.png")
  button3.position(360,200)
  button3.size(80,80)
  button3.mouseClicked(drop3)




  fruit = Bodies.circle(270,300,20)
  
  Matter.Composite.add(rope.body,fruit)
  fruit_con= new Link(rope,fruit)
  
  //Matter.Composite.add(rope2.body,fruit)
  fruit_con2= new Link(rope2,fruit)

  //Matter.Composite.add(rope3.body,fruit)
  fruit_con3= new Link(rope3,fruit)
 

  //melon.position=fruit.position
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImage,0,0,490,690)
  imageMode(CENTER)

  if(fruit != null){
    image(melonImage,fruit.position.x,fruit.position.y,70,70)
  }

  
 
  
  Engine.update(engine);
  ground.display()
  rope.show()
  rope2.show()
  rope3.show()
  
  
  //ellipse (fruit.position.x,fruit.position.y,30,30)
  if(collide(fruit,rabbit)==true){
    rabbit.changeAnimation("eat")
    eatSound.play()
    eatSound.setVolume=10
  }

  if(collide(fruit,ground.body)==true){
    rabbit.changeAnimation("sad")
    sadSound.play()
    sadSound.setVolume=10
    bgSound.stop()
  }

  if(rabbit.x<0){
    rabbit.velocityX=3
  }

  if(rabbit.x>500){
    rabbit.velocityX=-3
  }
 
  drawSprites()
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con=null
}

function drop2(){
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
}

function drop3(){
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
}

function collide(body,sprite){
 if(body != null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(d <= 80){
    World.remove(world,fruit)
    fruit=null
    return true
  }
  else{
    return false
  }
 }
}

function stopSound(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play()
  }
}

function blow(){
  console.log("Working?")
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.05 ,y:0})
}






