window.onload = function(){
    (function(){
        console.log(window.innerWidth)
    })();

    var timers = [];

    timers[0] = {};

    timers[0].timer = new Timer({
    	name:'timer1',
    	direction: 'down',
    	time: '00:00:10',
    }).start();

    timers[0].render = new Render({
    	callback: function(){
    		console.log(timers[0].timer.getTime());
    	},
    	timeout: 500,
    }).start();
};
