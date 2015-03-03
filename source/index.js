var $ = require("jQuery")

var Loop = require("./scripts/Loop.js")
var Input = require("./scripts/Input.js")

var x = 1
var y = 1
var speed = 1
var vy = 0
var vx = 0
var cx = 0
var cy = 0
var deacceleration = 0.5
var maxVelocity = 0.1
var width = 11
var height = 9
var direction = "east"

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
	if(Input.hasKey(83))
	{
		direction = "north"
		vy +=  speed * tick
	}
	if(Input.hasKey(87))
	{
		direction = "south"
		vy -= speed * tick
	}
	if(Input.hasKey(65))
	{
		direction = "west"
		vx -= speed * tick
	}
	if(Input.hasKey(68))
	{
		direction = "east"
		vx += speed * tick
	}
	
	if(vy > 0)
	{
		vy -= deacceleration * tick
		
		if(vy < 0)
		{
			vy = 0
		}
	}
	else if (vy < 0)
	{
		vy += deacceleration * tick
		
		if(vy > 0)
		{
			vy = 0
		}
	}
	if(vx > 0)
	{
		vx -= deacceleration * tick
		
		if(vx < 0)
		{
			vx = 0
		}
	}
	else if (vx < 0)
	{
		vx += deacceleration * tick
		
		if(vx > 0)
		{
			vx = 0
		}
	}
	
	if(vx > maxVelocity)
	{
		 vx = maxVelocity
	}
	else if(vx < -maxVelocity)
	{
		 vx = -maxVelocity
	}
	if(vy > maxVelocity)
	{
		vy = maxVelocity
	}
	else if(vy < -maxVelocity)
	{
		vy = -maxVelocity
	}

	y += vy
	x += vx
	cx = Math.floor(x / width) * -width
	cy = Math.floor(y / height) * -height
	
	$("#red").css({top: y + "em"})
	$("#red").css({left: x + "em"})
	$("#camera").css({top: cy + "em"})
	$("#camera").css({left: cx + "em"})

	if(direction == "north")
	{
		$("#red > img").css({top: "-2em"})
	}
	else if(direction == "south")
	{
		$("#red > img").css({top: "-3em"})
	}
	else if(direction == "west")
	{
		$("#red > img").css({top: "-1em"})
	}
	else if(direction == "east")
	{
		$("#red > img").css({top: "0em"})
	}
})
