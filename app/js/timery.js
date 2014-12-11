/*
 * timery.js
 * Copyright (C) 2014 soud
 *
 * Distributed under terms of the MIT license.
 */

window.onload = function() {
    if (rt != 'time') return;

    var cookie = new Cookies();
    var clocks = [];
    var clockCount = parseInt(cookie.get("count")) || 0;
    var muteAll = cookie.get("muteAll") || false;

    // create the clocks saved in cookie
    if (document.cookie) {
        for (var i = 0; i < clockCount; i ++) {
            clocks[i] = new Clock(
                JSON.parse(cookie.get("clock"+i))
            );
        }
    }

    document.querySelector('.addTimer').onclick = function(e){
        e.preventDefault();

        clocks[clockCount] = new Clock({
            appendTo: document.querySelector('main'),
            id: clockCount,
            name: 'clock'+clockCount
        });

        cookie.create("clock"+clockCount, clocks[clockCount].getInfo());
        cookie.create("count", clockCount+1);

        console.log(clocks[clockCount].getInfo());

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
            cookie.remove("count");
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
}
