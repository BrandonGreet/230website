"use strict";
function boundsIntersect(obj1, obj2) {
	let vectBetween = {x:obj2.x - obj1.x, y:obj2.y - obj1.y};
	let distBetween = getMagnitude(vectBetween);
	return distBetween < obj1.boundRadius + obj2.boundRadius;
}

function scaleTo(vector, desiredMagnitude=100) {
	let magnitude = getMagnitude(vector);

	let newX = vector.x / magnitude * desiredMagnitude;
	let newY = vector.y / magnitude * desiredMagnitude;
	return {x:newX, y:newY};
}

function getMagnitude(vector) {
	return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

function normalize(vector) {
	let magnitude = getMagnitude(vector);
	return {x:vector.x / magnitude, y:vector.y / magnitude};
}

function arctan(vector) {
	return Math.atan2(vector.y, vector.x);
}