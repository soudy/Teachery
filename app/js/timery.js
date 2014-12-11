/*
 * Teachery is a web application to make the life of teachers easier.
 * Copyright (C) 2014 Terence Keur, Mirko van der Waal and Steven Oud
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 */

(function()
{

    if(rt != "time") return;

    var cookie = new Cookies();
    var clocks = [];
    var clockCount = 0;
    var muteAll = false;

    if (document.cookie) {
        clockCount = cookie.get('clock_count');
        for (var i = 0; i < clockCount; i ++) {
            var settings = cookie.get('clock__'+i);
            if (settings != null){
                settings = JSON.parse(settings);
                clocks[i] = new Clock({
                    id: settings.id,
                    name: settings.name,
                    direction: settings.direction,
                    time: settings.time,
                });
            }
        }
    }

    document.querySelector('.addTimer').onclick = function(e){
        e.preventDefault();

        clocks[clockCount] = new Clock({
            appendTo: document.querySelector('main'),
            id: clockCount,
            name: 'clock'+clockCount
        });
        //cookie.create("clock__"+clockCount, JSON.stringify(clocks[clockCount].getInfo()));
        cookie.create("clock_count", clockCount+1);

        clockCount = parseInt(cookie.get("clock_count"));
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

        cookie.remove('clock__'+e.detail);
    });

    document.addEventListener('unmuteClock', function(e){
         document.querySelector('.muteSounds').classList.remove('muted');
         document.querySelector('.muteSounds i').classList.remove('ion-volume-mute');
         document.querySelector('.muteSounds i').classList.add('ion-volume-high');
    });
})();
