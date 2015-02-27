var $ = require("jQuery")

var Loop = require("./scripts/Loop.js")

var x = 0;
var y = 0;
var speed = 75;
var vy = 0;
var vx = 0;
var cx = 0;
var cy = 0;
var deacceleration = 50;
var maxVelocity = 100;

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
	x += vx;
	
	$("#red").css({top: y})
	$("#red").css({left: x})
	cx = Math.floor(x/640) * -640
	cy = Math.floor(y/480) * -480

	$("#camera").css({top: cy})
	$("#camera").css({left: cx})
	
})

console.log(Loop)
