var $ = require("jQuery")

var Loop = require("./scripts/Loop.js")
var Input = require("./scripts/Input.js")

var Hero = {
x: 0,
y: 0,
speed: 1,
vy: 0,
vx: 0,
deacceleration: 0.5,
maxVelocity: 0.1
}

var cx = 0
var cy = 0

var width = 11
var height = 9

function createRoom(rx, ry, data)
{
	var rooms = [
		require("./assets/rooms/bigdot.json"),
		require("./assets/rooms/fivedots.json"),
		require("./assets/rooms/fourdots.json"),
		require("./assets/rooms/grid.json"),
		require("./assets/rooms/onedot.json")
	]

	var room = rooms[Math.floor(Math.random() * rooms.length)]

	var roomData = room.layers[0].data
	for (var tx = 0; tx < room.width; tx++)
	{
		for(var ty = 0; ty < room.height; ty++)
		{
		
			var tile = roomData[ty * room.width + tx]

			if(data.doors.indexOf("north") != -1
			&& tx == 5 && ty == 0) {
				continue;
			}
			if(data.doors.indexOf("south") != -1
			&& tx == 5 && ty == 9-1) {
				continue;
			}
			if(data.doors.indexOf("west") != -1
			&& tx == 0 && ty == 4) {
				continue;
			}
			if(data.doors.indexOf("east") != -1
			&& tx == 11-1 && ty == 4) {
				continue;
			}

			if(tile == 2)
			{
				var tileHTML = $("<div class='wall tile'>")
				tileHTML.css({top: ((ry * 9) + ty) + "em"})
				tileHTML.css({left: ((rx * 11) + tx) + "em"})
				$("#tiles").append(tileHTML)
			}
		}
	}
}

createRoom(0, 0, {doors: ["south"]})
createRoom(0, 1, {doors: ["north", "east"]})
createRoom(1, 1, {doors: ["west"]})

Loop(function(tick)
{
	console.log(Hero.x + ", " + Hero.y)

	if(Input.hasKey(83))
	{
		Hero.vy +=  Hero.speed * tick
	}
	if(Input.hasKey(87))
	{
		Hero.vy -= Hero.speed * tick
	}
	if(Input.hasKey(65))
	{
		Hero.vx -= Hero.speed * tick
	}
	if(Input.hasKey(68))
	{
		Hero.vx += Hero.speed * tick
	}
	
	if(Hero.vy > 0)
	{
		Hero.vy -= Hero.deacceleration * tick
		
		if(Hero.vy < 0)
		{
			Hero.vy = 0
		}
	}
	else if (Hero.vy < 0)
	{
		Hero.vy += Hero.deacceleration * tick
		
		if(Hero.vy > 0)
		{
			Hero.vy = 0
		}
	}
	if(Hero.vx > 0)
	{
		Hero.vx -= Hero.deacceleration * tick
		
		if(Hero.vx < 0)
		{
			Hero.vx = 0
		}
	}
	else if (Hero.vx < 0)
	{
		Hero.vx += Hero.deacceleration * tick
		
		if(Hero.vx > 0)
		{
			Hero.vx = 0
		}
	}
	
	if(Hero.vx > Hero.maxVelocity)
	{
		 Hero.vx = Hero.maxVelocity
	}
	else if(Hero.vx < -Hero.maxVelocity)
	{
		 Hero.vx = -Hero.maxVelocity
	}
	if(Hero.vy > Hero.maxVelocity)
	{
		Hero.vy = Hero.maxVelocity
	}
	else if(Hero.vy < -Hero.maxVelocity)
	{
		Hero.vy = -Hero.maxVelocity
	}

	Hero.y += Hero.vy
	Hero.x += Hero.vx
	cx = Math.floor(Hero.x / width) * -width
	cy = Math.floor(Hero.y / height) * -height
	
	$("#red").css({top: Hero.y + "em"})
	$("#red").css({left: Hero.x + "em"})
	$("#camera").css({top: cy + "em"})
	$("#camera").css({left: cx + "em"})
})
