var bg, bgImg, bg2;

var gameState;

var pikachu, pikachuImg;

var coins, coinsImg, coinsGroup;

var pokeball, pokeballImg, pokeballGroup;

var b;

var score;

function preload() {
  bgImg = loadImage("bg0.png");
  pikachuImg = loadAnimation(
    "pikachu10.png",
    "pikachu11.png",
    "pikachu12.png",
    "pikachu13.png"
  );
  coinsImg = loadImage("download.png");
  pokeballImg = loadImage("pokeball.png");
}

function setup() {
  createCanvas(1280, 612);

  gameState = "play";

  score = 0;

  bg = createSprite(1200, 0, 600, 600);
  bg.scale = 10;
  bg.addImage(bgImg);
  //   bg.velocityX = -4;

  bg2 = createSprite(300, 570, 1000, 70);
  bg2.visible = false;

  b = createSprite(300, 0, 1000, 10);
  b.visible = false;

  pikachu = createSprite(50, 200, 10, 10);
  pikachu.addAnimation("running", pikachuImg);
  pikachu.setCollider("circle", 100, 0, 500);
  pikachu.scale = 0.07;

  coinsGroup = new Group();
  coins = [];
  pokeballGroup = new Group();
}

function draw() {
  textSize(40);

  stroke("black");
  fill("green");

  background(0);

  pikachu.velocityY = pikachu.velocityY + 1;
  pikachu.collide(bg2);

  if (gameState === "play") {
    pikachu.collide(b);
    pikachu.x = pikachu.x + 5;
    bg2.x = bg2.x + 5;
    camera.position.x = camera.position.x + 5;

    if (keyDown("space") && Math.round(pikachu.y) === 500) {
      pikachu.velocityY = -20;
    }

    if (frameCount % 220 === 0) {
      bg.x = pikachu.x + 1150;
    }

    spawnCoins();
    spawnPokeballs();

    if (coins != []) {
      coins.forEach((coin) => {
        if (pikachu.isTouching(coin)) {
          coin.destroy();
          score = score + 1;
        }
      });
    }

    if (pikachu.isTouching(pokeballGroup)) {
      gameState = "end";
    }
  }
  drawSprites();
  if (gameState === "end") {
    pokeballGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    coinsGroup.setLifetimeEach(-1);
    pokeballGroup.setLifetimeEach(-1);
    fill("red");
    text("GAME OVER", pikachu.x + 450, 300);
    bg.velocityX = 0;
  }
  text(score, pikachu.x - 10, 40);
}

function spawnCoins() {
  if (frameCount % 70 === 0) {
    let index = coins.length - 1;
    coin = createSprite(pikachu.x + 1220, Math.round(random(300, 450), 10, 10));

    coin.addImage(coinsImg);
    coin.scale = 0.2;
    coin.lifetime = 540;
    // coin.velocityX = -5;
    coins.push(coin);
    coinsGroup.add(coin);
  }
}

function spawnPokeballs() {
  if (frameCount % 150 === 0) {
    pokeball = createSprite(pikachu.x + 1220, 500, 10, 10);
    pokeball.addImage(pokeballImg);
    pokeball.depth = pikachu.depth - 1;
    // pokeball.velocityX = -5;
    pokeball.lifetime = 540;
    pokeball.scale = 0.4;
    pokeball.setCollider("circle", 0, 7, 45);
    pokeballGroup.add(pokeball);
  }
}
