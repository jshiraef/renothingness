module.exports = {
	x: 0,
	y: 0,
	speed: 1,
	vy: 0,
	vx: 0,
	health: 3,
	width: 0.5,
	height: 1,
	deacceleration: 0.5,
	maxVelocity: 0.1,
	direction: "south",
	update: function(tick)
	{
		if(this.vy > 0)
		{
			this.vy -= this.deacceleration * tick
			
			if(this.vy < 0)
			{
				this.vy = 0
			}
		}
		else if (this.vy < 0)
		{
			this.vy += this.deacceleration * tick
			
			if(this.vy > 0)
			{
				this.vy = 0
			}
		}
		if(this.vx > 0)
		{
			this.vx -= this.deacceleration * tick
			
			if(this.vx < 0)
			{
				this.vx = 0
			}
		}
		else if (this.vx < 0)
		{
			this.vx += this.deacceleration * tick
			
			if(this.vx > 0)
			{
				this.vx = 0
			}
		}
		
		if(this.vx > this.maxVelocity)
		{
			 this.vx = this.maxVelocity
		}
		else if(this.vx < -this.maxVelocity)
		{
			 this.vx = -this.maxVelocity
		}
		if(this.vy > this.maxVelocity)
		{
			this.vy = this.maxVelocity
		}
		else if(this.vy < -this.maxVelocity)
		{
			this.vy = -this.maxVelocity
		}

		this.y += this.vy
		this.x += this.vx
	}
}
