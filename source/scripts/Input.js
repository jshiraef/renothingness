var Input = function() {
    document.addEventListener("keydown", function(event) {
        if(!this.hasKey(event.keyCode)) {
            this.startKey(event.keyCode)
        }
    }.bind(this))
    document.addEventListener("keyup", function(event) {
        this.stopKey(event.keyCode)
    }.bind(this))
    this.hasKey = function(keycode) {
        return this.data[keycode] == true
    }
    this.startKey = function(keycode) {
        this.data[keycode] = true
    }
    this.stopKey = function(keycode) {
        delete this.data[keycode]
    }
    this.getKeys = function() {
        return this.data
    }
    this.data = {}
}

module.exports = new Input()
