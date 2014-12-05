if ( !window.requestAnimationFrame ) {
 
	window.requestAnimationFrame = ( function() {
 
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
 
	} )();
 
}

function Render(settings){
	var self = this;
	this.call = settings.callback || function(){};
	this.timeout = settings.timeout || 10;
	this.started = false;
	this.break = false;

	this.start = function(){
		if (this.started) return false;

		this.break = false;
		this.started = true;
		function render(){
			if (self.break) return false;
			self.call();
			setTimeout(function(){ 
				window.requestAnimationFrame(render);
			}, self.timeout);
		}
		render();
		return this;
	}

	this.stop = function(){
		this.break = true;
		this.started = false;
		return this;
	}
}