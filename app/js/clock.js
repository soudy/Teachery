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

function Clock(settings){

    // We need this to work in events
    var self = this;
    var appendTo = document.querySelector("main");

    // Copy the shadow clone and append it to the given node
    this.element = document.querySelector('.shadowTimer').cloneNode(true);
    this.element.classList.remove('shadowTimer');
    appendTo.appendChild(this.element); 

    // Get all objects we need
    this.title = this.element.querySelector('.checkbox-title input');
    this.times = this.element.querySelectorAll('.checkbox-input input');
    this.buttons = this.element.querySelectorAll('.checkbox-button a');

    this.started = false;
    this.mute = true;
    this.id = settings.id;
    this.sound = new Audio('src/hitmarker.mp3');
    //this.sound.loop = true;
    this.endsound = new Audio('src/endtick.mp3');

    this.title.value = settings.name || 'Clock'+(Math.floor(Math.random()*200));
    // Create a default timer
    this.timer = new Timer({
        name: this.title.value,
        direction: 'down',
        time: settings.time || "00:10:00",
        callback: function(){
            if (!self.mute)
                self.endsound.play();
            console.log(self.render.stop());
            self.stop();
        },
    });

    // Create the render
    this.render = new Render({
        callback: function(){
            self.updateDisplay();
        },
        timeout: 10,
    });

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].addEventListener('click', function(e){
            e.preventDefault();
            this.hash = this.hash.toLowerCase();
            switch(this.hash) {
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
    }

    this.updateTime = function(){
        this.timer.reset();
        this.timer.setTime(this.times[0].value+':'+this.times[1].value+':'+this.times[2].value);
        console.log(this.times[0].value+':'+this.times[1].value+':'+this.times[2].value);
    }

    for (var i = 0; i < this.times.length; i++) {
        this.times[i].addEventListener('blur', function(e){
            self.updateTime();
        });
    };

    this.updateDisplay = function(){
        var time = this.timer.getTime(),
            times = time.split(':');
        this.times[0].value = times[0];
        this.times[1].value = times[1];
        if (this.times[2].value != times[2] && !this.mute){
            /* this.sound.currentTime = 0; */
            this.sound.play();
        }
        this.times[2].value = times[2];
        /* console.log(times); */
    }

    this.start = function(){
        if (this.started){
            this.setReadOnly(false);
            this.setPlaying(false);
            this.timer.pause();
            this.render.stop();
            this.started = false;
            this.checkSound();
            return this;
        } else {
            this.setReadOnly(true);
            this.setPlaying(true);
            this.updateTimer();
            this.timer.start();
            this.render.start();
            this.started = true;
            this.checkSound();
        }
    }

    this.stop = function(){
        this.started = true;
        this.start();
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

    this.setMuted = function(bool){
        this.mute = bool;
        this.checkSound();
    }

    this.checkSound = function(){
        if (!this.started || this.mute){
            this.sound.pause();
        }
        if (this.started && !this.mute){
            var event = new CustomEvent('unmuteClock');
            document.dispatchEvent(event);
        }
    }

    this.setReadOnly = function(bool){
        this.title.readOnly = bool;
        this.title.readOnly = bool;
        for (var i = 0; i < this.times.length; i++) {
            this.times[i].readOnly = bool;
            this.times[i].disabled = bool;
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
