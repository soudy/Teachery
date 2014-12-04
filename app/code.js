window.onload = function(){
    (function(){
        console.log(window.innerWidth)
    })();

    var clocks = [];
    
    clocks[0] = new Clock({
        appendTo: document.querySelector('main'),
    })

};

var clockCount = 0;
function Clock(settings){
    // static clock clockCount
    clockCount++;

    // We need this to work in events
    var self = this;

    // Copy the shadow clone and append it to the given node
    this.element = document.querySelector('.shadowTimer').cloneNode(true);
    this.element.classList.remove('shadowTimer');
    settings.appendTo.appendChild(this.element);

    // Get all objects we need
    this.title = this.element.querySelector('.checkbox-title input');
    this.times = this.element.querySelectorAll('.checkbox-input input');
    this.buttons = this.element.querySelectorAll('.checkbox-button a');

    // Create a default timer
    this.timer = new Timer({
        name:'Clock'+clockCount,
        direction: 'down',
        time: '00:10:00',
        callback: function(){
            console.log(self.render.stop());
        },
    });

    // Create the render
    this.render = new Render({
        callback: function(){
            console.log(self.timer.getTime());
        },
        timeout: 500,
    });

}