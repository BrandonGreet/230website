"use strict";
class Carrot extends PIXI.Sprite {
	constructor (x=0, y=0, color=0xFF4500) {
		super(PIXI.loader.resources["media/Carrot.png"].texture);
		this.anchor.set(0.5, 0.5);
		this.scale.set(0.3);
		this.x = x;
		this.y = y;
		this.boundRadius = 12;
	}
}

class Hare extends PIXI.Sprite {
	constructor (x=0, y=0, color=0xC0C0C0) {
		super(PIXI.loader.resources["media/HareResting.png"].texture);
		this.anchor.set(0.5, 0.5);
		this.scale.set(0.4);
		this.x = x;
		this.y = y;
		this.speed = 75;
		this.fwd = {x: 1, y: 0};
		this.targetPoint = {x:0,y:0};
		this.boundRadius = 12;
		this.startPos = {x:0, y:0};
	}

	start() {
		this.x = this.startPos.x;
		this.y = this.startPos.y;
	}

	move(dt = 1/60) {
		this.x += this.fwd.x * this.speed * dt;
		this.y += this.fwd.y * this.speed * dt;
	}

	// Change sprite to whatever's appropriate
	jump() {
		this.rotation = arctan(this.fwd) + Math.PI/2;
		this.texture = PIXI.loader.resources["media/HareJumping.png"].texture;
	}

	rest() {
		this.texture = PIXI.loader.resources["media/HareResting.png"].texture;
	}
}

class Owl extends PIXI.Sprite { 
	constructor (x=0, y=0, color=0xFF0000, speed=120) {
		super(PIXI.loader.resources["media/OwlResting.png"].texture);
		this.anchor.set(0.5, 0.5);
		this.scale.set(0.6);
		this.x = x;
		this.y = y;
		this.fwd = {x:1, y:0};
		this.speed = speed;
		this.isActive = false;
		this.boundRadius = 30;
	}

	move (dt = 1/60)
	{
		this.x += this.fwd.x * this.speed * dt;
		this.y += this.fwd.y * this.speed * dt;
	}

	// Change sprite to attack player
	fly() {
		this.rotation = arctan(this.fwd) + Math.PI/2;
		this.texture = PIXI.loader.resources["media/OwlFlying.png"].texture;
	}
}