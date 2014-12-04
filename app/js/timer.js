
function Timer(settings){

	this.name = settings.name;
	this.direction = settings.direction || 'up';
	this.mute = settings.mute || false;
	this.callback = settings.callback || function(){};

	this.startTick = false;
	this.pauseTick = false;

	this.start = function(){
		if (!this.pauseTick)
			this.startTick = new Date();
		else
			this.startTick = this.pauseTick;
		return this;
	}

	this.reset = function(){
		this.startTick = new Date();
		return this;
	}

	this.pause = function(){
		this.pauseTick = this.startTick;
		return this;
	}

	this.setName = function(name){
		this.name = name;
		return this;
	}

	this.setDirection = function(direction){
		if (direction == 'up' || direction == 'down'){
			this.direction = direction;
		}
		return this;
	}

	this.getDirection = function(){
		return this.direction;
	}

	this.getName = function(){
		return this.name;
	}
	
	this.getTime = function(){
		var duration;
		if (!this.pauseTick)
			duration = (new Date() - this.startTick);
		else
			duration = (new Date() - this.pauseTick);

		var milliseconds = parseInt((duration%1000)/100),
			seconds = parseInt((duration/1000)%60),
			minutes = parseInt((duration/(1000*60))%60),
			hours = parseInt((duration/(1000*60*60))%24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;
		return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
	}

	this.isPaused = function(){
		if (!this.pauseTick)
			return false;
		return true;
	}
}