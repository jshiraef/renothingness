var $ = require("jQuery")

var Loop = require("./scripts/Loop.js")

var x = 0;
var y = 0;
var speed = 1;
var vy = 0;
var vx = 0;
var cx = 0;
var cy = 0;
var deacceleration = 0.5;
var maxVelocity = 0.5;
var width = 11;
var height = 9;

var level = require("./assets/mapPrototype.json")

var levelData = level.layers[0].data;

for(var iy = 0; iy < 18; iy++)
	{
	 for (var ix = 0; ix < 33; ix ++)
		 {
		 var tile = levelData[iy * 33 + ix]
		 
			if(tile ==	1)
			{
				 var tileHTML = $("<div class='wall tile'>")
				 tileHTML.css({top: iy + "em"})
				 tileHTML.css({left: ix + "em"})
				 
				 $("#tiles").append(tileHTML)
			}
		 }
	}
			

var Input = require("./scripts/Input.js")

Loop(function(tick)
{
	if(Input.hasKey(83))
	{
		vy +=  speed * tick;
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
		vy -= deacceleration * tick;
		
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
		vx -= deacceleration * tick;
		
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
		
	if(vx > maxVelocity)
	{
		vx = maxVelocity
	}
		
	y += vy	
	x += vx
	
	$("#red").css({top: y + "em"})
	$("#red").css({left: x + "em"})
	cx = Math.floor(x / width) * -width
	cy = Math.floor(y / height) * -height

	//$("#camera").css({top: cy + "em"})
	//$("#camera").css({left: cx + "em"})
	
})
