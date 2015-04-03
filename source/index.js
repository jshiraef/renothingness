var $ = require("jquery")

var Loop = require("./scripts/Loop.js")
var Input = require("./scripts/Input.js")

var Hero = require("./scripts/HeroStore.js")
var Camera = require("./scripts/CameraStore.js")

var Room = {
	width: 11,
    height: 9
}

var Blue = {
	x: 3.5,
    y: 2.5,
    width: 0.5,
    height: 1
}

$("#blue").css({top: Blue.y - Blue.height/2 + "em"})
$("#blue").css({left: Blue.x - Blue.width/2 + "em"})

var tiles = {}

function hasTile(x, y)
{
    return tiles[Math.floor(x) + "-" + Math.floor(y)] == true
}

function isIntersecting(a, b)
{
    //this function assumes and b are both
    //objects that have the following properties:
    //    x
    //    y
    //    width
    //    height
    // where x and y are anchored at the center
    // of the entity, and both position (x and y)
    // and dimensions (width and height) are in ems.
    
    var ax1 = a.x - (a.width / 2)
    var ax2 = a.x + (a.width / 2)
    var ay1 = a.y - (a.height / 2)
    var ay2 = a.y + (a.height / 2)
    var bx1 = b.x - (b.width / 2)
    var bx2 = b.x + (b.width / 2)
    var by1 = b.y - (b.height / 2)
    var by2 = b.y + (b.height / 2)
    
    if(ax1 > bx2) {return false}
    if(ay1 > by2) {return false}
    if(ax2 < bx1) {return false}
    if(ay2 < by1) {return false}
    
    return true
}
	
	
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

			}
			var tile = roomData[ty * room.width + tx]
			if(tile == 2) {
                var x = (rx * 11) + tx
                var y = (ry * 9) + ty
                tiles[x + "-" + y] = true
				var tileHTML = $("<div class='wall tile'>")
				tileHTML.css({top: y + "em"})
				tileHTML.css({left: x + "em"})
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
	else if(Hero.vy < 0)
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
	else if(Hero.vx < 0)
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
=======
    
    if(!hasTile(Hero.x + Hero.vx, Hero.y))
    {
        Hero.x += Hero.vx
    }
    if(!hasTile(Hero.x, Hero.y + Hero.vy))
    {
        Hero.y += Hero.vy
    }
    
    if(isIntersecting(Hero, Blue))
    {
        console.log("red takes damage")
    }
    
    //console.log(Hero.x.toFixed(2) + " , " + Hero.y.toFixed(2))
    
	$("#red").css({top: Hero.y - (Hero.height / 2) + "em"})
	$("#red").css({left: Hero.x - (Hero.width / 2) + "em"})
	$("#camera").css({top: Camera.cy + 2 + "em"})
	$("#camera").css({left: Camera.cx + "em"})
	$("#menu > #map > #marker").css({top: Math.floor(Hero.y / Room.height) + "em"})
	$("#menu > #map > #marker").css({left: Math.floor(Hero.x / Room.width) + "em"})
	
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

	$("#menu > #health").empty()
	for(var i = 0; i < Hero.health; i++) {
		$("#menu > #health").append("!")
	}
})
