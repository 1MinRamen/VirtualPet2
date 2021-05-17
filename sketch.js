//Create variables here

var dog, happydog;
var dogIMG, happydogIMG;
var foodS, foodStock;
var database;
var changeState, readState;
var bedroom, washroom, garden;
var addFood, feedFood;
var foodObj, lastFed;
var readState;

function preload()
{
	//load images here
  dogIMG = loadImage("images/dogImg.png");
  happydogIMG = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(750, 500);

  database = firebase.database();

  dog = createSprite(500,250,100,100);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodObj = new Food();


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Get More Food");
  addFood.position(815,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  // background(46,139,87);
  currentTime = hour();

  if (currentTime === lastFed + 1){
    update("Playing");
  }else if (currentTime === lastFed + 2){
    update("Sleeping");
  }else if (currentTime > lastFed + 2 && currentTime <= lastFed + 4){
    update("Bathing");
  }else{
    update("Hungry");
    foodObj.display();
  }

  if (gameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
    feed.show();
    addFood.show();
    dog.addImage(dogIMG);
  }

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function update(state){
  database.ref("/").update({
    gameState:state
  })
}

function addFoods(){
  foodS = foodS + 1;
  database.ref("/").update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happydogIMG);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    feedTime:hour(),
    gameState:"Hungry"
  })
}