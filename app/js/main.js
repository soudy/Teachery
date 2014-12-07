window.onload = function(){
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

    document.querySelector('.muteSounds').onclick = function(e){
        e.preventDefault();
        if (this.classList.contains('muted')){
            for(key in clocks){
                clocks[key].setMuted(false);
            }
            this.classList.remove('muted');
            this.querySelector('i').classList.remove('ion-volume-mute');
            this.querySelector('i').classList.add('ion-volume-high');
        } else {
            for(key in clocks){
                clocks[key].setMuted(true);
            }
            this.classList.add('muted');
            this.querySelector('i').classList.remove('ion-volume-high');
            this.querySelector('i').classList.add('ion-volume-mute');
        }
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

    document.addEventListener('unmuteClock', function(e){
         document.querySelector('.muteSounds').classList.remove('muted');
         document.querySelector('.muteSounds i').classList.remove('ion-volume-mute');
         document.querySelector('.muteSounds i').classList.add('ion-volume-high');
    });
};
