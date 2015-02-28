var $ = require("jQuery")

var Loop = require("./scripts/Loop.js")
var Input = require("./scripts/Input.js")

var x = 0
var y = 0
var speed = 75
var vy = 0
var vx = 0
var cx = 0
var cy = 0
var deacceleration = 50
var maxVelocity = 100
var width = 704
var height = 576

var level = require("./assets/mapPrototype.json")
var levelData = level.layers[0].data

for(var y = 0; y < 18; y++)
{
	for (var x = 0; x < 33; x ++)
	{
		var tile = levelData[y * 33 + x]

		if(tile ==	1)
		{
			var tileHTML = $("<div class='wall tile'>")
			tileHTML.css({top: y * 64})
			tileHTML.css({left: x * 64})
			 
			$("#tiles").append(tileHTML)
		}
	}
}

Loop(function(tick)
{
	if(Input.hasKey(83))
	{
		vy +=  speed * tick
	}
	if(Input.hasKey(87))
	{
		vy -= speed * tick
	}
	if(Input.hasKey(65))
	{
		vx -= speed * tick
	}
	if(Input.hasKey(68))
	{
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
	cx = Math.floor(x/width) * -width
	cy = Math.floor(y/height) * -height

	$("#red").css({top: y})
	$("#red").css({left: x})
	$("#camera").css({top: cy})
	$("#camera").css({left: cx})
})
