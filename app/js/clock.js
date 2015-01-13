/*
* Teachery is a web application to make the life of teachers easier.
* Copyright (C) 2015 Terence Keur, Mirko van der Waal and Steven Oud
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

function Clock(options){

    // We need this to work in events
    var self = this;
    var settings = JSON.parse(cookie.get("settings")) || {};
    var appendTo = options.appendTo || document.querySelector("main");

    // Copy the shadow clone and append it to the given node
    this.element = document.querySelector('.shadowTimer').cloneNode(true);
    this.element.classList.remove('shadowTimer');
    setTimeout(function(){
        self.element.classList.remove('offscreen');
    }, 100);

    //appendTo.insertBefore(this.element, appendTo.querySelector('.checkboxes'));
    appendTo.appendChild(this.element);

    // Get all objects we need
    this.title = this.element.querySelector('.checkbox-title input');
    this.times = this.element.querySelectorAll('.checkbox-input input');
    this.buttons = this.element.querySelectorAll('.checkbox-button a');

    this.started = false;
    this.mute = options.mute || (settings.auto_mute == 1) ? true : false;
    this.id = options.id;

    this.endsoundsrc = settings.finish || "airhorn";
    //this.sound.loop = true;
    this.endsound = new Audio("sounds/" + this.endsoundsrc + ".mp3");
    this.sound = new Audio('sounds/hitmarker.mp3');

    this.title.value = options.name || 'Clock'+(Math.floor(Math.random()*200));

    // Create a default timer
    this.timer = new Timer({
        name: this.title.value,
        direction: options.direction || 'down',
        time: options.time || settings.clock || "00:10:00",
        callback: function() {
            self.endsound.play();
            self.stop();
            new Notification("Clock " + options.name + " finished.", "normal", 3500);
        }
    });

    this.getInfo = function() {
        return JSON.stringify(this);
    };

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
                    self.fullscreen(true);
                    break;
                case '#remove':
                    self.remove();
                    break;
                case '#settings':
                    new clockSettings({
                        elm: document.querySelector('.settings-overlay'),
                        onChange: function(e){
                            switch(e.name){
                                case 'direction':
                                    self.timer.setDirection((e.value == "UP") ? 'up' : 'down');
                                    self.updateCookie();
                                    break;
                                case 'muted':
                                    self.setMuted((e.value == "TRUE") ? true : false);
                                    self.updateCookie();
                                    break;
                            }
                        },
                    });
                    break;
            }
        });
    }

    this.updateTimer = function(){
        this.timer.setName(this.title.value);
        this.updateCookie();
    };

    this.updateTime = function(){
        this.timer.reset();
        this.timer.setTime(this.times[0].value+':'+this.times[1].value+':'+this.times[2].value);
        this.updateCookie();
    };

    for (i = 0; i < this.times.length; i++) {
        this.times[i].addEventListener('blur', function(e){
            self.updateTime();
            self.updateCookie();
        });
    }

    this.updateDisplay = function(){
        var time = this.timer.getTime(),
        times = time.split(':');
        this.times[0].value = times[0];
        this.times[1].value = times[1];
        if (this.times[2].value != times[2] && !this.mute){
            /* this.sound.currentTime = 0; */
            this.sound.play();
            this.updateCookie();
        }
        this.times[2].value = times[2];
    };

    this.start = function(){
        if (this.started){
            this.setReadOnly(false);
            this.setPlaying(false);
            this.timer.pause();
            this.render.stop();
            this.started = false;
            this.checkSound();
        } else {
            this.setReadOnly(true);
            this.setPlaying(true);
            this.updateTimer();
            this.timer.start();
            this.render.start();
            this.started = true;
            this.checkSound();
        }
        this.updateCookie();
    };

    this.stop = function(){
        this.started = true;
        this.start();
    };

    this.setPlaying = function(bool){
        var button = this.buttons[0].querySelector('i');
        if (bool){
            button.classList.remove('ion-play');
            button.classList.add('ion-pause');
        } else {
            button.classList.add('ion-play');
            button.classList.remove('ion-pause');
        }
    };

    this.setMuted = function(bool){
        this.mute = bool;
        this.checkSound();
        this.updateCookie();
    };

    this.checkSound = function(){
        if (!this.started || this.mute){
            this.sound.pause();
        }
    };

    this.setReadOnly = function(bool){
        this.title.readOnly = bool;
        this.title.readOnly = bool;
        for (var i = 0; i < this.times.length; i++) {
            this.times[i].readOnly = bool;
            this.times[i].disabled = bool;
        }
    };

    this.remove = function(force){
        if (force) {
            this.render.stop();
            this.element.remove();
            var event = new CustomEvent('removeClock', { 'detail': this.id });
            document.dispatchEvent(event);
        }  else {
            // Cba to do it better atm
            // Recreate the above in a temporary function then call it with force or with confirm.
            new Confirm({
                element: document.querySelector('.checkbox-overlay'),
                message: 'Are you sure u want to delete '+this.timer.getName()+'?',
                confirm: function(){
                    self.render.stop();
                    self.element.remove();
                    var event = new CustomEvent('removeClock', { 'detail': self.id });
                    document.dispatchEvent(event);
                }
            }).show();
        }
    };

    this.fullscreen = function(force){
        if (fullScreenEnabled()){
            if (this.element.requestFullscreen) {
                this.element.requestFullscreen();
            } else if (this.element.webkitRequestFullscreen) {
                this.element.webkitRequestFullscreen();
            } else if (this.element.mozRequestFullScreen) {
                this.element.mozRequestFullScreen();
            } else if (this.element.msRequestFullscreen) {
                this.element.msRequestFullscreen();
            }
        }
    };

    this.getInfo = function(){
        return {
            muted: this.mute,
            id: this.id,
            name: this.timer.name,
            direction: this.timer.direction,
            time: this.timer.timeLeft(),
        };
    };

    this.updateCookie = function(){
        cookie.create("clock__"+this.id, JSON.stringify(this.getInfo()));
        return true;
    };

    this.updateCookie();
    this.updateDisplay();
}

function fullScreenEnabled(){
    return document.fullscreenEnabled || document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled || document.msFullscreenEnabled;
}

function clockSettings(options){
    var self = this;
    this.elm = options.element || options.elm;
    this.settings = this.elm.querySelectorAll('.settings-bool > div');
    this.callback = options.onChange || function(){};
    this.elm.onclick = function(e){
        if (e.target.classList.contains('settings-overlay')){
            self.elm.style.display = "none";
        }
    };

    for (var i = 0; i < this.settings.length; i++) {
        this.settings[i].onclick = function(){
            self.callback({
                name: this.dataset.name,
                value: this.dataset.value,
            });
            self.elm.style.display = "none";
        };
    }

    this.elm.style.display = 'table';
}
