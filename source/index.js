var jQuery = require("jQuery")

var Loop = require("./scripts/Loop.js")
var Input = require("./scripts/Input.js")

jQuery("#index").html("Hello World!")

Loop(function(tick) {
	console.log(tick, Input.getKeys())
})
