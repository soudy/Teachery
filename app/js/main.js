window.onload = function(){
    var cookie = new Cookies();
    var clocks = [];
    var clockCount = parseInt(cookie.get("count")) || 0;
    var muteAll = cookie.get("muteAll") || false;

    console.log(clockCount);
    console.log(muteAll);

    // create the clocks saved in cookie
    // TODO: remember clock name, time and mute
    if (document.cookie) {
        for (var i = 0; i < clockCount; i ++) {
            clocks[i] = new Clock({
                appendTo: document.querySelector("main"),
                id: i,
                /* name: cookie.get("clock"+i+"name"),  */
                name: "clock"+i, 
                time: parseInt(cookie.get("clock"+i))
            });
        }
    }

    document.querySelector('.addTimer').onclick = function(e){
        e.preventDefault();

        clocks[clockCount] = new Clock({
            appendTo: document.querySelector('main'),
            id: clockCount,
            name: 'clock'+clockCount,
        });

        cookie.create("clock"+clockCount, clocks[clockCount].timer.time);
        cookie.create("count", clockCount+1);

        clockCount = parseInt(cookie.get("count"));
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
        if (!clockCount) {
            alert("You have no clocks.");
            return false;
        }

        if (confirm('Are you sure u want to delete all clocks?')){
            for (key in clocks){
                clocks[key].remove(true);
                cookie.remove("clock"+key);
            }
            // reset the count to 0
            cookie.create("count", 0);
        }
    }

    document.addEventListener('removeClock', function(e){
        clocks[e.detail] = null;
        delete clocks[e.detail];

        cookie.create("count", clockCount-1);
        clockCount = parseInt(cookie.get("count"));
    });

    document.addEventListener('unmuteClock', function(e){
         document.querySelector('.muteSounds').classList.remove('muted');
         document.querySelector('.muteSounds i').classList.remove('ion-volume-mute');
         document.querySelector('.muteSounds i').classList.add('ion-volume-high');
    });
};
