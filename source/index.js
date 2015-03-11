var $ = require("jQuery")

var Loop = require("./scripts/Loop.js")
var Input = require("./scripts/Input.js")

var Hero = require("./scripts/HeroStore.js")

var Camera = {
	cx: 0, cy: 0
}

var Room = {
	width: 11, height: 9
}

var rooms = [
		require("./assets/rooms/bigdot.json"),
		require("./assets/rooms/fivedots.json"),
		require("./assets/rooms/fourdots.json"),
		require("./assets/rooms/grid.json"),
		require("./assets/rooms/onedot.json")
	]

	var room = rooms[Math.floor(Math.random() * rooms.length)]

	var roomData = room.layers[0].data
	
	
function createRoom(rx, ry, data)
{
	
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

	if(Input.hasKey(83))
	{
		Hero.direction = "north"
		Hero.vy +=  Hero.speed * tick
	}
	if(Input.hasKey(87))
	{
		Hero.direction = "south"
		Hero.vy -= Hero.speed * tick
	}
	if(Input.hasKey(65))
	{
		Hero.direction = "west"
		Hero.vx -= Hero.speed * tick
	}
	if(Input.hasKey(68))
	{
		Hero.direction = "east"
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
	
	var tx = Math.floor(Hero.x)
	var ty = Math.floor(Hero.y)
	
	var tile = roomData[ty * room.width + tx]
	var nextTileRight = roomData[ty * room.width + (tx + 1)]
	var nextTileLeft = roomData[ty * room.width + (tx - 1)]
	
	
	if(Hero.vx > 0)
		{
			if(nextTileRight == 2)
			{
				Hero.vx = 0
			}	
		}
	
	if(Hero.vx < 0)
		{
			if(nextTileLeft == 2)
			{
				Hero.vx = 0
			}	
		}
		
	console.log(Hero.x + " , " + Hero.y)

	Hero.y += Hero.vy
	Hero.x += Hero.vx
	Camera.cx = Math.floor(Hero.x / Room.width) * -Room.width
	Camera.cy = Math.floor(Hero.y / Room.height) * -Room.height
	
	$("#red").css({top: Hero.y - Hero.height/2 + "em"})
	$("#red").css({left: Hero.x - Hero.width/2 + "em"})
	$("#camera").css({top: Camera.cy + "em"})
	$("#camera").css({left: Camera.cx + "em"})

	
	
	if(Hero.direction == "north")
	{
		$("#red > img").css({top: "-2em"})
	}
	else if(Hero.direction == "south")
	{
		$("#red > img").css({top: "-3em"})
	}
	else if(Hero.direction == "west")
	{
		$("#red > img").css({top: "-1em"})
	}
	else if(Hero.direction == "east")
	{
		$("#red > img").css({top: "0em"})
	}
})
