/*
 * Teachery is a web application to make the life of teachers easier.
 * Copyright (C) 2015 Terence Keur, Mirko van der Waal and Steven Oud
 * This program is free software; you can redistribute it and/or modify
 *
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

    var clocks = [];
    var muteAll = false;

    if (document.cookie) {
        var clockCount = cookie.get('clock_count');
        for (var i = 0; i < clockCount+1; i ++) {
            var settings = cookie.get('clock__'+i);
            if (settings !== null){
                settings = JSON.parse(settings);
                clocks[i] = new Clock({
                    appendTo: document.querySelector('main.timery'),
                    id: settings.id,
                    name: settings.name,
                    direction: settings.direction,
                    time: settings.time,
                    mute: settings.muted,
                });
            }
        }
    }

    document.querySelector('.addTimer').onclick = function(e){
        e.preventDefault();
        var c = 0;
        for (var key in clocks)
            c = key;
        c++;
        clocks[c] = new Clock({
            appendTo: document.querySelector('main.timery'),
            id: c,
            name: 'clock'+c,
        });
        new Notification('Clock'+c+' added.', 'normal');
        cookie.create("clock_count", c);
    };

    document.querySelector('.muteSounds').onclick = function(e){
        e.preventDefault();
        for(var key in clocks){
            clocks[key].setMuted(true);
        }
    };

    document.querySelector('.removeTimers').onclick = function(e){
        e.preventDefault();
        var c = 0;
        for (var key in clocks)
            c++;
        if (c < 1) {
            return false;
        }

        new Confirm({
            element: document.querySelector('.checkbox-overlay'),
            message: 'Are you sure u want to delete all clocks?',
            confirm: function(){
                for (key in clocks){
                    clocks[key].remove(true);
                    cookie.remove("clock__"+key);
                }
                cookie.remove("clock_count");
            }
        }).show();
    };

    document.addEventListener('removeClock', function(e){
        var name = clocks[e.detail].timer.getName();
        new Notification(name + ' removed.', 'warning');
        
        clocks[e.detail] = null;
        delete clocks[e.detail];

        cookie.remove('clock__'+e.detail);
    });
})();
