
function Timer(settings){

	this.name = settings.name;
	this.direction = settings.direction || 'up';
	this.mute = settings.mute || false;
	this.callback = settings.callback || function(){};

	this.time = false;

	this.duration = 0;
	this.lastTick = false;
	this.pauseBool = false;

	this.start = function(){
		this.lastTick = new Date();
		this.pauseBool = false;
		return this;
	}

	this.reset = function(){
		this.duration = 0;
		this.time = false;
		this.pauseBool = false;
		this.lastTick = false;
		return this;
	}

	this.pause = function(){
		this.pauseBool = true;
		return this;
	}

	this.setName = function(name){
		this.name = name;
		return this;
	}

	this.setTime = function(time){
		var t = time.split(':');
		console.log('cur', this.time);
		this.time = parseInt(t[2]);
		this.time += parseInt(t[1]) * 60;
		this.time += parseInt(t[0]) * (3600);
		this.time *=  1000;
		console.log('now', this.time);
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
		var currentTick = new Date();
		var added;
		if (this.pauseBool)
			added = 0
		else
			added = currentTick - this.lastTick;

		this.duration += added;
		var display = this.duration;
		this.lastTick = new Date();

		if (this.time && this.direction == 'down')
			display = this.time - this.duration;

		if (display < 0){
			this.callback();
			this.duration = 0;
		}

		var milliseconds = parseInt((display%1000)/100),
			seconds = parseInt((display/1000)%60),
			minutes = parseInt((display/(1000*60))%60),
			hours = parseInt((display/(1000*60*60))%24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;
		return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
	}

	this.isPaused = function(){
		if (!this.pauseBool)
			return false;
		return true;
	}

	if (settings.time){
		this.setTime(settings.time);
	}
}