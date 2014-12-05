window.onload = function(){
    (function(){
        console.log(window.innerWidth)
    })();

    var clocks = [];
    var clockCount = 0;

    document.querySelector('.addTimer').onclick = function(e){
        e.preventDefault();

        clocks[clockCount] = new Clock({
            appendTo: document.querySelector('main'),
            id: clockCount,
            name: 'Clock'+clockCount,
        });
        clockCount++;
    }

    document.querySelector('.removeTimers').onclick = function(e){
        e.preventDefault();
        if (confirm('Are you sure u want to delete all clocks?')){
            for (key in clocks){
                clocks[key].remove(true);
            }
        }
    }

    document.addEventListener('removeClock', function(e){
        clocks[e.detail] = null;
        delete clocks[e.detail];
    });
};

function Clock(settings){

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

    this.started = false;
    this.id = settings.id;

    this.title.value = settings.name || 'Clock'+(Math.floor(Math.random()*200));

    // Create a default timer
    this.timer = new Timer({
        name: this.title.value,
        direction: 'down',
        time: '00:10:00',
        callback: function(){
            self.setPlaying(false);
            console.log(self.render.stop());
        },
    });

    // Create the render
    this.render = new Render({
        callback: function(){
            self.updateDisplay();
        },
        timeout: 500,
    });

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].addEventListener('click', function(e){
            e.preventDefault();
            this.hash = this.hash.toLowerCase();
            switch(this.hash){
                case '#play':
                    self.start();
                    break;
                case '#fullscreen':
                    alert('Fullscreen is not yet supported');
                    break;
                case '#remove':
                    self.remove();
                    break;
                case '#settings':
                    alert('Settings is not yet supported');
                    break;
            }
        });
    };

    this.updateTimer = function(){
        this.timer.setName(this.title.value);
        if (!this.timer.isPaused()){
            this.timer.setTime(this.times[0].value+':'+this.times[1].value+':'+this.times[2].value);
        }
        console.log(this.times[0].value+':'+this.times[1].value+':'+this.times[2].value);
    }

    this.updateDisplay = function(){
        var time = this.timer.getTime(),
            times = time.split(':');
        this.times[0].value = times[0];
        this.times[1].value = times[1];
        this.times[2].value = times[2];
        //console.log(times);
    }

    this.start = function(){
        if (this.started){
            this.setReadOnly(false);
            this.setPlaying(false);
            this.timer.pause();
            this.render.stop();
            this.started = false;
        } else {
            this.setReadOnly(true);
            this.setPlaying(true);
            this.updateTimer();
            this.timer.start();
            this.render.start();
            this.started = true;
        }
    }

    this.setPlaying = function(bool){
        var button = this.buttons[0].querySelector('i');
        if (bool){
            button.classList.remove('ion-play');
            button.classList.add('ion-pause');
        } else {
            button.classList.add('ion-play');
            button.classList.remove('ion-pause');
        }
    }

    this.setReadOnly = function(bool){
        this.title.readOnly = bool;
        for (var i = 0; i < this.times.length; i++) {
            this.times[i].readOnly = bool;
        };
    }

    this.remove = function(force){
        if (force || confirm('Are you sure u want to delete '+this.timer.getName()+'?')) {
            this.render.stop();
            this.element.remove();
            var event = new CustomEvent('removeClock', { 'detail': this.id });
            document.dispatchEvent(event);
        }
    }
}