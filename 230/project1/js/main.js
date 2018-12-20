"use strict";
const app = new PIXI.Application(900, 600, {backgroundColor: 0xFFFFFF});
document.querySelector("#game-space").appendChild(app.view);

// Scene boundaries
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// Load with sprite images
PIXI.loader.
add(["media/HareResting.png", "media/HareJumping.png", "media/Carrot.png", "media/OwlResting.png", "media/OwlFlying.png"]).
on("progress", e=>{console.log(e.progress)}).
load(gameSetup); 

// Variables
let stage;
let startScene, titleLabel, instructionsLabel, startButton;
let gameScene, levelLabel, hare, scoreLabel, livesLabel;
let endScene, endLabel, titleButton;

let carrots = [];
let owls = [];
let dt;
let level = 1;
let lives = 3;
let score = 0;
let paused = true;
let hopping = false;

function gameSetup() {
	stage = app.stage;

	startScene = new PIXI.Container();
	startScene.visible = true;
	stage.addChild(startScene);

	gameScene = new PIXI.Container();
	gameScene.visible = false;
	stage.addChild(gameScene);

	endScene = new PIXI.Container();
	endScene.visible = false;
	stage.addChild(endScene);

	populateLabels();

	hare = new Hare();
	gameScene.addChild(hare);

	app.ticker.add(gameLoop);

	app.view.onclick = hop;
}

function populateLabels() {
	let buttonStyle = new PIXI.TextStyle({
		fill: 0x659D32,
		fontSize: 48,
		fontFamily: "Lato",
		stroke: 0x663300,
		strokeThickness: 2
	});

	let bigStyle = new PIXI.TextStyle({
		fill: 0x477148,
		fontSize: 64,
		fontFamily: "Lato",
		stroke: 0x663300,
		strokeThickness: 2
	});

	titleLabel = new PIXI.Text("Pack Instinct");
	titleLabel.style = bigStyle;
	titleLabel.x = 280;
	titleLabel.y = 80;
	startScene.addChild(titleLabel);

	instructionsLabel = new PIXI.Text("Click to hop!\nAvoid owls!\nCollect carrots!\nHave fun!");
	instructionsLabel.style = new PIXI.TextStyle({
		fill: 0x477148,
		fontSize: 24,
		fontFamily: "Lato",
		stroke: 0x663300,
		strokeThickness: 2
	});
	instructionsLabel.x = 380;
	instructionsLabel.y = 190;
	startScene.addChild(instructionsLabel);

	endLabel = new PIXI.Text("");
	endLabel.style = bigStyle;
	endLabel.x = 50;
	endLabel.y = 100;
	endScene.addChild(endLabel);

	startButton = new PIXI.Text("Start game!");
	startButton.style = buttonStyle;
	startButton.x = 340;
	startButton.y = 400;
	startButton.interactive = true;
	startButton.buttonMode = true;
	startButton.on("pointerup", startGame);
	startScene.addChild(startButton);

	titleButton = new PIXI.Text("Title");
	titleButton.style = buttonStyle;
	titleButton.x = 420;
	titleButton.y = 400;
	titleButton.interactive = true;
	titleButton.buttonMode = true;
	titleButton.on("pointerup", ()=>{endScene.visible = false; startScene.visible = true;});
	endScene.addChild(titleButton);

	let statStyle = new PIXI.TextStyle({
		fill: 0xDDDDFF,
		fontSize: 24,
		fontFamily: "Lato",
		stroke: 0x000000,
		strokeThickness: 2
	});

	levelLabel = new PIXI.Text(`Level: ${level}`);
	levelLabel.style = statStyle;
	levelLabel.x = 5;
	levelLabel.y = 5;
	gameScene.addChild(levelLabel);

	scoreLabel = new PIXI.Text(`Score: ${score}`);
	scoreLabel.style = statStyle;
	scoreLabel.x = 5;
	scoreLabel.y = 35;
	gameScene.addChild(scoreLabel);

	livesLabel = new PIXI.Text(`Lives: ${lives}`);
	livesLabel.style = statStyle;
	livesLabel.x = 5;
	livesLabel.y = 60;
	gameScene.addChild(livesLabel);
}

function startGame() {
	startScene.visible = false;
	endScene.visible = false;
	gameScene.visible = true;
	score = 0;
	scoreLabel.text = `Score: ${score}`;
	level = 1;
	lives = 3;
	livesLabel.text = `Lives: ${lives}`;
	paused = false;
	levelSetup();
}

function gameLoop() {
	if (paused) return;

	dt = 1/app.ticker.FPS;
	if (dt < 1/12) dt = 1/12;

	for(let i = 0; i < owls.length; i++) {
		let owl = owls[i];

		if (owl.isActive) {
			owl.move(dt);

			//For optimization's sake
			if (owl.x < 0 || owl.x > sceneWidth || owl.y < 0 || owl.y > sceneHeight) {
				gameScene.removeChild(owl);
				owls.splice(owls.indexOf(owl), 1);
				i--;
				continue;
			}

			if (boundsIntersect(hare, owl)) {
				decreaseLives();
				if (lives > 0) {
					if (hopping) {
						app.ticker.remove(hopInstructions);
						hopping = false;
						hare.rest();
					}
					hare.start();
				} else {
					// End screen with loss
					lose();
				}
			}
		} else {
			let owlToHare = {x:hare.x - owl.x, y:hare.y - owl.y};
			if (getMagnitude(owlToHare) < 200) {
				owl.fwd = normalize(owlToHare);
				owl.isActive = true;
				owl.fly();
			}
		}
	}

	for(let i = 0; i < carrots.length; i++) {
		let carrot = carrots[i];

		if (boundsIntersect(hare, carrot)) {
			increaseScore();
			gameScene.removeChild(carrot);
			carrots.splice(carrots.indexOf(carrot), 1);
			if (carrots.length == 0) {
				level++;
				levelSetup();
			}
			i--;
		}
	}
}

//Each level is statically set up
function levelSetup() {
	// Reset in-level variables
	if (hopping) {
		hopping = false;
		hare.rest();
		app.ticker.remove(hopInstructions);
	}
	clearScene();

	// Update levelLabel
	levelLabel.text = `Level: ${level}`;

	// Set up level
	switch (level) {
		case 1:
			hare.startPos = {x:150, y:100};
			hare.start();
			carrots.push(new Carrot(200, 320));
			gameScene.addChild(carrots[0]);
			carrots.push(new Carrot(650, 300));
			gameScene.addChild(carrots[1]);
			owls.push(new Owl(580, 400));
			gameScene.addChild(owls[0]);
			owls.push(new Owl(380, 380));
			gameScene.addChild(owls[1]);
			break;
		case 2:
			hare.startPos = {x:100, y:500};
			hare.start();
			carrots.push(new Carrot(400, 200));
			gameScene.addChild(carrots[0]);
			carrots.push(new Carrot(530, 480));
			gameScene.addChild(carrots[1]);
			owls.push(new Owl(300, 520));
			gameScene.addChild(owls[0]);
			owls.push(new Owl(120, 130));
			gameScene.addChild(owls[1]);
			owls.push(new Owl(650, 270));
			gameScene.addChild(owls[2]);
			break;
		case 3:
			hare.startPos = {x:250, y:150};
			hare.start();
			carrots.push(new Carrot(240, 340));
			gameScene.addChild(carrots[0]);
			carrots.push(new Carrot(500, 480));
			gameScene.addChild(carrots[1]);
			carrots.push(new Carrot(620, 300));
			gameScene.addChild(carrots[2]);
			owls.push(new Owl(80, 480));
			gameScene.addChild(owls[0]);
			owls.push(new Owl(480, 230));
			gameScene.addChild(owls[1]);
			break;
		default:
			//Call end with win
			win();
			break;
	}
}

function clearScene() {
	for (let carrot of carrots) gameScene.removeChild(carrot);
	carrots = [];
	for(let owl of owls) gameScene.removeChild(owl);
	owls = [];
}

function increaseScore() {
	score++;
	scoreLabel.text = `Score: ${score}`;
}

function decreaseLives() {
	lives--;
	livesLabel.text = `Lives: ${lives}`;
}

function hop() {
	if (!hopping) {
		let mousePos = app.renderer.plugins.interaction.mouse.global;
		let moveVect = {x:mousePos.x - hare.x, y:mousePos.y - hare.y};

		hare.fwd = normalize(moveVect);
		let relToHare = scaleTo(moveVect, 75);
		hare.targetPoint = {x:hare.x + relToHare.x,y:hare.y + relToHare.y};

		hopping = true;
		hare.jump();
		app.ticker.add(hopInstructions);
	}
}

function hopInstructions() {
	hare.move(dt);
	if (Math.floor(hare.x) == Math.floor(hare.targetPoint.x) && Math.floor(hare.y) == Math.floor(hare.targetPoint.y)) {
		app.ticker.remove(hopInstructions);
		hopping = false;
		hare.rest();
	}
}

function win() {
	paused = true;
	clearScene();
	endLabel.text = `You win!\nYou collected ${score} carrots!`;
	gameScene.visible = false;
	endScene.visible = true;
}

function lose() {
	paused = true;
	clearScene();
	endLabel.text = `You lost.\nYou collected ${score} carrots.\n:[`;
	gameScene.visible = false;
	endScene.visible = true;
}