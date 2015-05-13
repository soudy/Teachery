/*Minified CSS*//*
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

var Cookies = {
    create: function(name, value)
    {
        document.cookie = name + "="+value+";expires=Mon, 1 Jan 2020 00:00:00 UTC;";
    },

    remove: function(name)
    {
        document.cookie = name + "=;expires=Thu, 01 Jan 1990 00:00:01 GMT;";
    },

    get: function(name)
    {
        var regex  = new RegExp("(?:^"+name+"|;\ *"+name+")=(.*?)(?:;|$)", "g");
        var result = regex.exec(document.cookie);
        return result ? result[1] : null;
    }
};


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

var Confirm = function(options)
{
	this.element     = options.element;
	this.cancelCall  = options.cancel || function(){};
	this.confirmCall = options.confirm || function(){};
	this.message     = options.message || 'N/A';

    this.yes = this.element.querySelector('.checkbox-confirm');
    this.no  = this.element.querySelector('.checkbox-cancel');
    this.msg = this.element.querySelector('.checkbox-message');

    this.element.onclick = function(e) {
        if (e.target === this.yes){
            this.hide();
            this.confirmCall();
        } else {
            if (e.target === this.msg)
                return;
            this.hide();
            this.cancelCall();
        }
    }.bind(this);

    document.onkeydown = function(e) {
        if (e.keyCode === 27){
            this.hide();
            this.cancelCall();
        }
        if (e.keyCode === 13){
            this.hide();
            this.confirmCall();
        }
    }.bind(this);
};


Confirm.prototype.show = function()
{
    this.msg.innerHTML = this.message;
    this.element.classList.add('active');
};

Confirm.prototype.hide = function()
{
    this.msg.innerHTML = '';
    this.element.classList.remove('active');
};

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

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout( callback, 1000 / 60 );
        };
    })();
}

function Render(settings)
{
    var self = this;
    this.call = settings.callback || function(){};
    this.timeout = settings.timeout || 10;
    this.started = false;
    this.break = false;

    this.start = function(){
        if (this.started)
            return false;

        this.break = false;
        this.started = true;
        function render(){
            if (self.break) return false;
            self.call();
            setTimeout(function(){
                window.requestAnimationFrame(render);
            }, self.timeout);
        }
        render();
        return this;
    };

    this.stop = function(){
        this.break = true;
        this.started = false;
        return this;
    };
}

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

var CSV = {
    to_json_magister: function(csv)
    {
        csv = csv.replace("\r", "");

        var cells   = [];
        var columns = csv.split("\n");
        var titles  = columns[0].split(",");

        for (var i = 1, l = columns.length - 1; i < l; ++i) {
            var student = [];
            var row     = columns[i].split(",");

            for (var j = 0, ll = row.length; j < ll; ++j)
                student.push(row[j]);

            cells.push(student);
        }

        return {
            titles : titles,
            cells  : cells
        };
    },

    to_json: function(csv)
    {
        csv = csv.replace("\r", "");
        csv = csv.split("\n");

        var entries = csv.join(",").split(",");

        // Remove last element as it will always be an empty string becausse of
        // joining with ","
        entries.splice((entries.length - 1), 1);

        return {
            cells: entries
        };
    }
};

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

var Notification = function(txt, level, time)
{
    var self = this;

    this.elm           = document.createElement("p");
    this.elm.innerHTML = txt;
    this.allnots       = document.querySelector("#notlist").children;

    this.elm.classList.add(level || "normal");

    for (var i = 0; i < this.allnots.length; ++i) {
        if (this.allnots[i].innerHTML === txt) {
            this.allnots[i].remove();

            setTimeout(self.elm.classList.add("show"), false);

            self.elm.classList.add("shake");
        }
    }

    document.querySelector("#notlist").appendChild(this.elm);

    setTimeout(function(){
        self.elm.classList.add("show");
    }, 10);

    setTimeout(function(){
        self.elm.classList.add("hide");
    }, time+100 || 2100);

    setTimeout(function(){
        if (!self.elm || !self.elm.parentNode) return;
        self.elm.parentNode.removeChild(self.elm);
    }, time+300 || 2300);
};

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

var Timer = function(settings)
{

	this.name = settings.name;
	this.direction = settings.direction || 'up';
	this.callback = settings.callback || function(){};

	this.time = false;

	this.duration = 0;
	this.lastTick = false;
	this.pauseBool = false;

    if (settings.time)
        this.setTime(settings.time);
};

Timer.prototype.start = function()
{
    this.lastTick = new Date();
    this.pauseBool = false;

    return this;
};

Timer.prototype.reset = function()
{
    this.duration = 0;
    this.time = false;
    this.pauseBool = false;
    this.lastTick = false;

    return this;
};

Timer.prototype.pause = function()
{
    this.pauseBool = true;

    return this;
};

Timer.prototype.setName = function(name)
{
    this.name = name;

    return this;
};

Timer.prototype.setTime = function(time)
{
    if (time.toString().match(':')){
        var t = time.split(':');
        this.time = parseInt(t[2]);
        this.time += parseInt(t[1]) * 60;
        this.time += parseInt(t[0]) * (3600);
        this.time *=  1000;
    } else {
        this.time = time;
    }
};

Timer.prototype.setDirection = function(direction)
{
    if (direction == 'up' || direction == 'down'){
        this.direction = direction;
        if (this.direction == 'down'){
            this.setTime(this.duration-this.time);
            this.duration = 0;
        }
        if (this.direction == 'up'){
            this.duration = this.time-this.duration;
            this.time = false;
        }
    }

    return this;
};

Timer.prototype.getDirection = function()
{
    return this.direction;
};

Timer.prototype.getName = function()
{
    return this.name;
};

Timer.prototype.getTime = function()
{
    if (!this.lastTick)
        return this.timeLeft();

    var currentTick = new Date();
    var added;

    if (this.pauseBool)
        added = 0;
    else
        added = currentTick - this.lastTick;

    this.duration += added;
    var display = this.duration;
    this.lastTick = new Date();

    if (this.time && this.direction == 'down')
        display = this.time - this.duration;

    if (display < 0){
        this.callback();
        this.duration = 0;
    }

    var milliseconds = parseInt((display%1000)/100),
    seconds = parseInt((display/1000)%60),
    minutes = parseInt((display/(1000*60))%60),
    hours = parseInt((display/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
};

Timer.prototype.isPaused = function()
{
    return this.pauseBool;
};

Timer.prototype.timeLeft = function()
{
    var display = this.duration;

    if (this.time && this.direction == 'down')
        display = this.time - this.duration;

    if (display < 0)
        this.duration = 0;

    var milliseconds = parseInt((display%1000)/100),

    seconds = parseInt((display/1000)%60),
    minutes = parseInt((display/(1000*60))%60),
    hours = parseInt((display/(1000*60*60))%24);

    hours   = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
};

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

var Clock = function(options)
{
    var i;
    var self = this;
    var settings = JSON.parse(Cookies.get("settings")) || {};
    var appendTo = options.appendTo || document.querySelector("main");

    // Copy the shadow clone and append it to the given node
    this.element = document.querySelector(".shadowTimer").cloneNode(true);
    this.element.classList.remove("shadowTimer");
    setTimeout(function(){
        this.element.classList.remove("offscreen");
    }.bind(this), 100);

    //appendTo.insertBefore(this.element, appendTo.querySelector('.checkboxes'));
    appendTo.appendChild(this.element);

    // Get all objects we need
    this.title   = this.element.querySelector(".checkbox-title input");
    this.times   = this.element.querySelectorAll(".checkbox-input input");
    this.buttons = this.element.querySelectorAll(".checkbox-button a");

    this.started = false;
    this.mute = options.mute || (settings.auto_mute === 1) ? true : false;
    this.endmute = options.endmute || (settings.auto_mute === 1) ? true : false;
    this.id = options.id;

    this.endsoundsrc = settings.finish || "airhorn";
    //this.sound.loop = true;
    this.endsound = new Audio("sounds/" + this.endsoundsrc + ".mp3");
    this.sound = new Audio("sounds/hitmarker.mp3");

    this.title.value = options.name || "Clock"+(Math.floor(Math.random()*200));

    // Create a default timer
    this.timer = new Timer({
        name: this.title.value,
        direction: options.direction || "down",
        time: options.time || settings.clock || "00:10:00",
        callback: function() {
            this.endsound.play();
            this.stop();
            new Notification("Clock " + options.name + " finished.", "normal", 3500);
        }.bind(this)
    });

    // Create the render
    this.render = new Render({
        callback: function(){
            this.updateDisplay();
        }.bind(this),
        timeout: 10,
    });

    for (i = 0, l = this.buttons.length; i < l; i++) {
        this.buttons[i].addEventListener('click', function(e){
            e.preventDefault();
            this.hash = this.hash.toLowerCase();
            switch(this.hash) {
                case "#play":
                    self.start();
                    break;
                case "#fullscreen":
                    self.fullscreen(true);
                    break;
                case "#remove":
                    self.remove();
                    break;
                case "#settings":
                    new clockSettings({
                        elm: document.querySelector(".settings-overlay"),
                        onChange: function(e){
                            switch(e.name){
                                case "direction":
                                    self.timer.setDirection((e.value.toUpperCase() == "UP") ? "up" : "down");
                                    if (!self.timer.isPaused())
                                        self.timer.start();
                                    self.updateCookie();
                                    break;
                                case "muted":
                                    self.setMuted((e.value == "TRUE") ? true : false);
                                    self.updateCookie();
                                    break;
                                case "endmuted":
                                    self.setEndMuted((e.value == "TRUE") ? true : false);
                                    self.updateCookie();
                                    break;
                            }
                        },
                    });
                    break;
            }
        });
    }

    for (i = 0, l = this.times.length; i < l; i++) {
        this.times[i].addEventListener("blur", function(e){
            this.updateTime();
            this.updateCookie();
        }.bind(this));
    }

    this.updateCookie();
    this.updateDisplay();
};

Clock.prototype.updateTimer = function()
{
    this.timer.setName(this.title.value);
    this.updateCookie();
};

Clock.prototype.updateTime = function()
{
    this.timer.reset();
    this.timer.setTime(this.times[0].value+":"+this.times[1].value+":"+this.times[2].value);
    this.updateCookie();
};


Clock.prototype.updateDisplay = function()
{
    var time = this.timer.getTime(),
    times = time.split(":");
    this.times[0].value = times[0];
    this.times[1].value = times[1];
    if (this.times[2].value !== times[2] && !this.mute){
        /* this.sound.currentTime = 0; */
        this.sound.play();
        this.updateCookie();
    }
    this.times[2].value = times[2];
};

Clock.prototype.start = function()
{
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

Clock.prototype.stop = function()
{
    this.started = true;
    this.start();
};

Clock.prototype.setPlaying = function(bool)
{
    var button = this.buttons[0].querySelector("i");
    if (bool){
        button.classList.remove("ion-play");
        button.classList.add("ion-pause");
    } else {
        button.classList.add("ion-play");
        button.classList.remove("ion-pause");
    }
};

Clock.prototype.setMuted = function(bool)
{
    this.mute = bool;
    this.sound.muted = this.mute;
    this.checkSound();
    this.updateCookie();
};

Clock.prototype.setEndMuted = function(bool)
{
    this.endmute = bool;
    this.endsound.muted = this.endmute;
    this.updateCookie();
};

Clock.prototype.checkSound = function()
{
    if (!this.started || this.mute){
        this.sound.pause();
    }
};

Clock.prototype.setReadOnly = function(bool){
    var i, l;

    this.title.readOnly = bool;
    this.title.readOnly = bool;

    for (i = 0, l = this.times.length; i < l; i++) {
        this.times[i].readOnly = bool;
        this.times[i].disabled = bool;
    }
};

Clock.prototype.remove = function(force)
{
    if (force) {
        this.render.stop();
        this.element.remove();
        var event = new CustomEvent("removeClock", { "detail": this.id });
        document.dispatchEvent(event);
    }  else {
        // Cba to do it better atm
        // Recreate the above in a temporary function then call it with force or with confirm.
        new Confirm({
            element: document.querySelector(".checkbox-overlay"),
            message: "Are you sure you want to delete "+this.timer.getName()+"?",
            confirm: function(){
                this.render.stop();
                this.element.remove();
                var event = new CustomEvent("removeClock", { "detail": this.id });
                document.dispatchEvent(event);
            }.bind(this)
        }).show();
    }
};

Clock.prototype.fullscreen = function()
{
    if (fullScreenEnabled())
        if (this.element.requestFullscreen)
            this.element.requestFullscreen();
        else if (this.element.webkitRequestFullscreen)
            this.element.webkitRequestFullscreen();
        else if (this.element.mozRequestFullScreen)
            this.element.mozRequestFullScreen();
        else if (this.element.msRequestFullscreen)
            this.element.msRequestFullscreen();
};

Clock.prototype.getInfo = function()
{
    return {
        muted: this.mute,
        endmuteD: this.endmute,
        id: this.id,
        name: this.timer.name,
        direction: this.timer.direction,
        time: this.timer.timeLeft(),
    };
};

Clock.prototype.updateCookie = function()
{
    Cookies.create("clock__"+this.id, JSON.stringify(this.getInfo()));
    return true;
};

function fullScreenEnabled(){
    return document.fullscreenEnabled || document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled || document.msFullscreenEnabled;
}


/**
 * Clock settings class
 *
 */
function clockSettings(options){
    var self = this;
    this.elm = options.element || options.elm;
    this.settings = this.elm.querySelectorAll(".settings-bool > div");
    this.callback = options.onChange || function(){};
    this.elm.onclick = function(e){
        if (e.target.classList.contains("settings-overlay"))
            this.elm.style.display = "none";
    }.bind(this);

    for (var i = 0; i < this.settings.length; i++) {
        this.settings[i].onclick = function(){
            self.callback({
                name: this.dataset.name,
                value: this.dataset.value,
            });
            self.elm.style.display = "none";
        };
    }

    this.elm.style.display = "table";
}

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

var Picker = function(students, fields)
{
    "use strict";

    this.chosen_names_elm = document.querySelector("#pickery_chosen_names");
    this.all_names_elm    = document.querySelector("#pickery_all_names");
    this.chosen_name  = document.querySelector("#chosen_name");
    this.chosen_name_elm  = document.querySelector("#chosen_name p");
    this.chosen_sound = new Audio();
    this.chosen_sound.src = "sounds/chat_tone.mp3";
    this.chosen_timeout = null;

    this.csv_overlay           = document.querySelector("#csv_overlay_pickery");
    this.all_fields_elm        = document.querySelector("#pickery_all_fields");
    this.all_fields_info_elm   = document.querySelector("#pickery_all_fields_info");
    this.all_fields_submit     = document.querySelector("#pickery_fields_submit");

    this.students     = students;
    this.blacklist    = [];
    this.chosen_names = [];
    this.fields       = fields || [];

    if (localStorage.getItem("pickery_blacklist")) {
        try {
            this.blacklist = JSON.parse(localStorage.getItem("pickery_blacklist"));
        } catch (e) {
            localStorage.clear();
            this.blacklist = JSON.parse(localStorage.getItem("pickery_blacklist"));
        }

        this.set_chosen_names();
    }
};

Picker.prototype.hide_fields = function()
{
    this.csv_overlay.classList.add("hidden");
    this.all_fields_elm.innerHTML = "";
};

Picker.prototype.show_fields = function()
{
    this.csv_overlay.classList.remove("hidden");

    for (var i = 0, l = this.students.titles.length; i < l; ++i) {
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = i;

        input.onchange = function(e) {
            if (this.fields.indexOf(e.target.id) >= 0)
                this.fields.splice(this.fields.indexOf(e.target.id), 1);
            else
                this.fields.push(e.target.id);
        }.bind(this);

        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerHTML += this.students.titles[i];
        li.appendChild(input);
        li.appendChild(span);
        this.all_fields_elm.appendChild(li);
    }
};

Picker.prototype.set = function()
{
    this.hide_fields();

    for (var i = 0, l = this.students.cells.length; i < l; ++i) {
        var option = document.createElement("option");

        var fullname = "";
        for (var j = 0, ll = this.fields.length; j < ll; ++j) {
            fullname += this.students.cells[i][this.fields[j]] + " ";

            option.innerHTML = fullname;
            option.id = i;

            this.all_names_elm.appendChild(option);
        }
    }

    this.update_storage();

};

Picker.prototype.update_storage = function()
{
    localStorage.setItem("pickery_blacklist", JSON.stringify(this.blacklist));
    localStorage.setItem("pickery_fields", JSON.stringify(this.fields));
    localStorage.setItem("pickery", JSON.stringify(this.students));
};

Picker.prototype.set_chosen_names = function()
{
    for (var i = 0, l = this.blacklist.length; i < l; ++i) {
        var option = document.createElement("option");
        var fullname = "";

        for (var j = 0, ll = this.fields.length; j < ll; ++j)
            fullname += this.students.cells[this.blacklist[i]][this.fields[j]] + " ";

        option.innerHTML = fullname;
        option.id = i;

        this.chosen_names_elm.insertBefore(
            option,
            document.querySelector("#pickery_chosen_names > option:first-of-type")
        );
    }
};

Picker.prototype.remove = function()
{
    var element  = this.all_names_elm;
    var selected = element.options[element.selectedIndex];

    if (!selected) {
        new Notification("No name selected.", "warning");
        return false;
    }

    var selected_id = parseInt(selected.id);

    this.students.cells.splice(selected_id, 1);
    this.all_names_elm.removeChild(document.getElementById(selected_id));

    this.update_storage();
};

Picker.prototype.random = function()
{
    var allow_duplicates = document.querySelector("#allow_duplicates").checked;
    var randint;

    if (!allow_duplicates) {
        if (this.blacklist.length >= this.students.cells.length) {
            new Notification("You've looped through all names.");
            return false;
        }
    }

    randint = Math.floor(Math.random() * (this.students.cells.length - 0));

    if (!allow_duplicates) {
        // No duplicates allowed
        while (this.blacklist.indexOf(randint) >= 0)
            randint = Math.floor(Math.random() * (this.students.cells.length - 0));

        this.blacklist.push(randint);
    }

    var student = this.students.cells[randint];
    var option  = document.createElement("option");

    var fullname = "";

    for (var j = 0, l = this.fields.length; j < l; ++j)
        fullname += student[this.fields[j]] + " ";

    this.chosen_names.push(fullname);

    option.innerHTML = fullname;
    option.id        = randint;

    this.chosen_name_elm.innerHTML = fullname;
    this.chosen_sound.currentTime = 0;
    this.chosen_sound.play();

    this.chosen_name.classList.add("shake");
    clearTimeout(this.chosen_timeout);
    this.chosen_timeout = setTimeout(function(){
        this.chosen_name.classList.remove("shake");
    }.bind(this), 500);

    this.chosen_names_elm.insertBefore(
        option,
        document.querySelector("#pickery_chosen_names > option:first-of-type")
    );

    this.update_storage();
};

Picker.prototype.clear_history = function()
{
    localStorage.removeItem("pickery_blacklist");
    this.blacklist = [];
    this.chosen_names_elm.innerHTML = "";
    this.chosen_name_elm.innerHTML = "";
};

Picker.prototype.clear_students = function()
{
    localStorage.removeItem("pickery");
    localStorage.removeItem("pickery_fields");

    this.students = [];
    this.all_names_elm.innerHTML = "";
    this.fields = "";
};

Picker.prototype.clear_all = function()
{
    this.clear_history();
    this.clear_students();
};

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

var Grouper = function(students, fields)
{
    "use strict";

    this.students       = students;
    this.student_count  = students.cells.length;
    this.fields         = fields || [];
    this.blacklist      = [];
    this.groups         = {};

    this.formats = {
        "default" : document.querySelector("#set_default"),
        "json"    : document.querySelector("#set_json"),
        "plain"   : document.querySelector("#set_plain")
    };

    this.group_container_elm = document.querySelector("#groupery_options");
    this.groupery_groups_elm = document.querySelector("#groupery_groups");
    this.groupery_title_elm  = document.querySelector("#groupery_title");
    this.generate_groups_elm = document.querySelector("#generate_groups");
    this.groupery_format_elm = document.querySelector("#format");

    this.all_names_elm         = document.querySelector("#groupery_all_names");
    this.csv_overlay           = document.querySelector("#csv_overlay_groupery");
    this.all_fields_elm        = document.querySelector("#groupery_all_fields");
    this.all_fields_info_elm   = document.querySelector("#groupery_all_fields_info");
    this.all_fields_submit     = document.querySelector("#groupery_fields_submit");

    if (this.student_count > 1000) {
        new Notification("The maximum amount of importable names is 1000.",
                         "warning", 3000);
        return false;
    }


    if (localStorage.getItem("groupery_groups")) {
        this.groups = JSON.parse(localStorage.getItem("groupery_groups").split(","));
        this.set_groups();
    }

};

Grouper.prototype.remove = function()
{
    var element  = this.all_names_elm;
    var selected = element.options[element.selectedIndex];

    if (!selected) {
        new Notification("No name selected.", "warning");
        return false;
    }

    var selected_id = parseInt(selected.id);

    this.students.cells.splice(selected_id, 1);
    this.all_names_elm.removeChild(document.getElementById(selected_id));

    this.update_storage();
};

Grouper.prototype.hide_fields = function()
{
    this.csv_overlay.classList.add('hidden');
    this.all_fields_elm.innerHTML = "";
};

Grouper.prototype.show_fields = function()
{
    this.csv_overlay.classList.remove('hidden');

    for (var i = 0, l = this.students.titles.length; i < l; ++i) {
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = i;

        input.onchange = function(e) {

            if (this.fields.indexOf(e.target.id) >= 0)
                this.fields.splice(this.fields.indexOf(e.target.id), 1);
            else
                this.fields.push(e.target.id);
        }.bind(this);

        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerHTML += this.students.titles[i];
        li.appendChild(input);
        li.appendChild(span);
        this.all_fields_elm.appendChild(li);
    }
};

Grouper.prototype.set = function()
{
    this.hide_fields();

    for (var i = 0, l = this.students.cells.length; i < l; ++i) {
        var option = document.createElement("option");
        var fullname = "";

        for (var j = 0, ll = this.fields.length; j < ll; ++j)
            fullname += this.students.cells[i][this.fields[j]] + " ";

        option.innerHTML = fullname;
        option.id = i;

        this.all_names_elm.appendChild(option);
    }

    this.update_storage();
};

Grouper.prototype.set_groups = function()
{
    this.clear_active();
    this.formats.default.className = "active";
    this.groupery_groups_elm.style.cssText -= "white-space:pre;";

    this.generate_groups_elm.innerHTML = "Reset";
    this.groupery_title_elm.innerHTML  = "Groups";
    this.groupery_groups_elm.innerHTML = "";

    this.group_container_elm.style.display = "none";
    this.groupery_groups_elm.style.display = "block";
    this.groupery_format_elm.style.display = "block";

    for (var group in this.groups) {
        var group_number = group;

        var group_elm = document.createElement("div");
        var h4        = document.createElement("h4");

        h4.innerHTML = group_number;

        group_elm.className = "group";
        group_elm.id        = group_number;

        group_elm.appendChild(h4);
        this.groupery_groups_elm.appendChild(group_elm);

        for (var key in this.groups[group]) {
            var fields = this.groups[group][key];
            var name = "";

            for (var field in fields)
                name += " " + fields[field];

            document.getElementById(group_number).innerHTML += name + "<br>";
        }

    }
};


Grouper.prototype.set_json = function()
{
    this.clear_active();
    this.formats.json.className = "active";

    var pre = document.createElement("pre");

    pre.innerHTML = JSON.stringify(this.groups, null, 4);

    this.groupery_groups_elm.innerHTML = "";
    this.groupery_groups_elm.appendChild(pre);
};

Grouper.prototype.set_plain = function()
{
    this.clear_active();
    this.formats.plain.className = "active";

    var div = document.createElement("p");

    for (var group in this.groups) {
        var group_number = group;
        div.innerHTML += "<p>" + group_number + "</p>";

        var group_elm = document.createElement("div");
        var h4        = document.createElement("h4");

        h4.innerHTML = group_number;

        group_elm.className = "group";
        group_elm.id        = group_number;

        group_elm.appendChild(h4);
        this.groupery_groups_elm.appendChild(group_elm);

        for (var key in this.groups[group]) {
            var fields = this.groups[group][key];
            var name = "";

            for (var field in fields)
                name += " " + fields[field];

            div.innerHTML += name + "<br>";
        }

    }

    this.groupery_groups_elm.innerHTML = "";
    this.groupery_groups_elm.appendChild(div);
};

Grouper.prototype.clear_active = function()
{
    for (var format in this.formats)
        this.formats[format].classList.remove("active");
};

Grouper.prototype.update_storage = function()
{

    localStorage.setItem("groupery_fields", JSON.stringify(this.fields));
    localStorage.setItem("groupery", JSON.stringify(this.students));
};

Grouper.prototype.clear_groups = function()
{
    this.generate_groups_elm.innerHTML     = "Generate groups";
    this.groupery_title_elm.innerHTML      = "Options";
    this.groupery_groups_elm.innerHTML     = "";

    this.group_container_elm.style.display = "inherit";
    this.groupery_groups_elm.style.display = "none";
    this.groupery_format_elm.style.display = "none";

    localStorage.removeItem("groupery_groups");
    this.groups = {};
    this.blacklist = [];
};

Grouper.prototype.clear_students = function()
{
    this.students = [];
    localStorage.removeItem("groupery");

    document.querySelector("#groupery_all_names").innerHTML = "";
    document.querySelector("#groupery_students").innerHTML = "";
};

Grouper.prototype.clear_all = function()
{
    this.clear_groups();
    this.clear_students();
};

Grouper.prototype.random = function()
{
    var randint;

    if (this.blacklist.length >= this.students.cells.length)
        return false;

    randint = Math.floor(Math.random() * (this.students.cells.length - 0));

    while (this.blacklist.indexOf(randint) >= 0)
        randint = Math.floor(Math.random() * (this.students.cells.length - 0));

    this.blacklist.push(randint);

    var student = this.students.cells[randint];
    var result  = [];

    for (var j = 0, l = this.fields.length; j < l; ++j)
        result.push(student[this.fields[j]]);

    return result;
};

Grouper.prototype.generate_groups = function()
{
    var n_students = document.querySelector("#n_students").value || null;
    var n_groups   = document.querySelector("#n_groups").value || null;

    if (!this.students.titles)
        this.students.titles = ['Name'];


    if (Object.keys(this.groups).length) {
        this.clear_groups();
        n_students = "";
        n_groups = "";
        return false;
    }

    if (!n_students && !n_groups) {
        new Notification("Please select an option for creating groups.",
                         "normal", 3000);
        return false;
    }

    if (n_groups) {
        if (n_groups > Math.floor(this.student_count / 2)) {
            new Notification("Can't create " + n_groups + " groups. " +
                             "Maximum amount possible to create is " +
                             Math.floor(this.student_count / 2),
                             "warning", 3000);
            return false;
        }

        this.make_groups(parseInt(n_groups), null);
    } else if (n_students) {
        if (n_students > Math.floor(this.student_count / 2)) {
            new Notification("Can't create groups with " + n_students +
                             " students. Maximum amount students per group is " +
                             Math.floor(this.student_count / 2),
                             "warning", 3000);
            return false;
        }

        this.make_groups(null, parseInt(n_students));
    } else {
        new Notification("Something went wrong. Please try again.",
        "normal", 3000);
        return false;
    }

    this.set_groups();
    localStorage.setItem("groupery_groups", JSON.stringify(this.groups));
};

Grouper.prototype.make_groups = function(n_groups, n_students)
{
    var names      = [];
    var used_names = 0;
    var i, j, k, h, l, count;

    // Generate an array with names in random order
    while ((name = this.random())) {
        names.push(name.split(","));
    }

    if (n_groups) {
        var students_per_group = Math.floor(this.student_count / n_groups);

        if (n_groups <= 1) {
            new Notification("Please enter a valid number above one.",
            "normal", 3000);
            return false;
        }

        for (i = 1, count = 0; i <= n_groups; ++i, count += students_per_group) {
            this.groups["Group " + i] = {};

            for (j = count, k = 0; j < count + students_per_group; ++j, ++k) {
                this.groups["Group " + i][k] = {};

                for (h = 0, l = names[j].length; h < l; ++h) {
                    var title = this.students.titles[this.fields[h]];
                    this.groups["Group " + i][k][title] = names[j][h];
                }

                used_names++;
            }
        }

    } else if (n_students) {
        n_groups = Math.ceil(this.student_count / n_students);

        if (n_groups <= 1) {
            new Notification("Please enter a valid number above one.",
            "normal", 3000);
            return false;
        }

        for (i = 1, count = 0; i <= n_groups; ++i, count += n_students) {
            this.groups["Group " + i] = {};

            for (j = count, k = 0; j < count + n_students; ++j, ++k) {
                if (!names[j])
                    continue;

                this.groups["Group " + i][k] = {};

                for (h = 0, l = names[j].length; h < l; ++h) {
                    var title = this.students.titles[this.fields[h]];
                    this.groups["Group " + i][k][title] = names[j][h];
                }

                used_names++;
            }
        }
    }

    names.splice(0, used_names);

    /*
     * If there are leftover names, try to divide them over the groups if
     * possible, else append them to the last group.
     *
     * TODO: Evenly divide if possible
     */
    if (names) {
        var last_group_length = Object.keys(this.groups["Group " + n_groups]).length;

        for (j = 0, i = last_group_length; i < last_group_length + names.length; ++j, ++i) {
            if (!names[j])
                continue;

            this.groups["Group " + n_groups][i] = {};

            for (h = 0, l = names[j].length; h < l; ++h) {
                var title = this.students.titles[this.fields[h]];
                this.groups["Group " + n_groups][i][title] = names[j][h];
            }
        }
    }

    new Notification("Created " + n_groups + " groups.", "normal", 3000);
};

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
        var clockCount = Cookies.get("clock_count");
        for (var i = 0; i < clockCount+1; i ++) {
            var settings = Cookies.get("clock__"+i);
            if (settings !== null){
                settings = JSON.parse(settings);
                clocks[i] = new Clock({
                    appendTo: document.querySelector("main.timery"),
                    id: settings.id,
                    name: settings.name,
                    direction: settings.direction,
                    time: settings.time,
                    mute: settings.muted,
                    endmute: settings.endmuted,
                });
            }
        }
    }

    document.querySelector(".addTimer").onclick = function(e){
        e.preventDefault();
        var c = 0;
        for (var key in clocks)
            c = key;
        c++;
        clocks[c] = new Clock({
            appendTo: document.querySelector("main.timery"),
            id: c,
            name: "clock"+c,
        });
        new Notification("Clock"+c+" added.", "normal");
        Cookies.create("clock_count", c);
    };

    document.querySelector(".muteSounds").onclick = function(e){
        e.preventDefault();
        for(var key in clocks){
            clocks[key].setMuted(true);
            clocks[key].setEndMuted(true);
        }
    };

    document.querySelector(".removeTimers").onclick = function(e){
        e.preventDefault();
        var c = 0;
        for (var key in clocks)
            c++;
        if (c < 1) {
            return false;
        }

        new Confirm({
            element: document.querySelector(".checkbox-overlay"),
            message: "Are you sure you want to delete all clocks?",
            confirm: function(){
                for (key in clocks){
                    clocks[key].remove(true);
                    Cookies.remove("clock__"+key);
                }
                Cookies.remove("clock_count");
            }
        }).show();
    };

    document.addEventListener("removeClock", function(e){
        var name = clocks[e.detail].timer.getName();
        new Notification(name + " removed.", "warning");
        
        clocks[e.detail] = null;
        delete clocks[e.detail];

        Cookies.remove("clock__"+e.detail);
    });
})();

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

var Settings = {
    base_default       : "f20094",
    text_default       : "191919",
    background_default : "FFFFFF",
    mute_default       : 1,
    clock_default      : "00:10:00",
    finish_default     : "airhorn",

    test_color: function(color)
    {
        var regex  = new RegExp("([a-fA-F0-9]+)");
        var result = regex.exec(color);

        if (!color) {
            new Notification("Please enter a color.");
            return false;
        }

        if(!result || !(result[0].length === 3 || result[0].length === 6)) {
            new Notification("Not a valid color: " + color, "warning", 2500);
            return false;
        }

        Cookies.create("settings", JSON.stringify(settings));

        return result[0];
    }
};

(function()
{

    var settings = JSON.parse(Cookies.get("settings")) ||
    {
        base_color       : Settings.base_default,
        text_color       : Settings.text_default,
        background_color : Settings.background_default,
        clock            : Settings.clock_default,
        finish           : Settings.finish_default
    };

    var base_color_hash       = document.querySelector("#base_color_hash");
    var background_color_hash = document.querySelector("#background_color_hash");
    var text_color_hash       = document.querySelector("#text_color_hash");
    var base_color            = document.querySelector("#base_color");
    var background_color      = document.querySelector("#background_color");
    var text_color            = document.querySelector("#text_color");
    var clocks                = document.querySelectorAll(".clock_default");
    var finish                = document.querySelectorAll(".finish");
    var stylesheet            = document.querySelector('#stylesheet');
    
    function reloadStyle(){
        var href = stylesheet.href.split('?');
        stylesheet.href = href[0] + '?id=' + new Date().getMilliseconds();
    }

    base_color.value       = settings.base_color;
    background_color.value = settings.background_color;
    text_color.value       = settings.text_color;

    base_color.addEventListener("blur", function() {
        settings.base_color = Settings.test_color(this.value);
        Cookies.create("settings", JSON.stringify(settings));
        
        reloadStyle();
        //window.location.reload();
    });

    background_color.addEventListener("blur", function() {
        settings.background_color = Settings.test_color(this.value);
        Cookies.create("settings", JSON.stringify(settings));

        reloadStyle();
        //window.location.reload();
    });

    text_color.addEventListener("blur", function() {

        settings.text_color = Settings.test_color(this.value);
        Cookies.create("settings", JSON.stringify(settings));

        reloadStyle();
        //window.location.reload();
    });

    document.querySelector("#base_reset").onclick = function() {
        settings.base_color = Settings.base_default;
        Cookies.create("settings", JSON.stringify(settings));

        //reloadStyle();
        window.location.reload();
    };

    document.querySelector("#background_reset").onclick = function() {
        settings.background_color = Settings.background_default;
        Cookies.create("settings", JSON.stringify(settings));

        //reloadStyle();
        window.location.reload();
    };

    document.querySelector("#text_reset").onclick = function() {
        settings.text_color = Settings.text_default;
        Cookies.create("settings", JSON.stringify(settings));

        //reloadStyle();
        window.location.reload();
    };

    document.querySelector("#time_reset").onclick = function() {
        var t = clock_default.split(":");
        clocks[0].value = t[0];
        clocks[1].value = t[1];
        clocks[2].value = t[2];

        Cookies.create("settings", JSON.stringify(settings));
    };

    // default start time
    var t = settings.clock.split(":");
    for (var i = 0; i < clocks.length; i++) {
        clocks[i].value = t[i];
        clocks[i].addEventListener("blur", function(){
            settings.clock = clocks[0].value+":"+clocks[1].value+":"+clocks[2].value;
            Cookies.create("settings", JSON.stringify(settings));
        });
    }

    // sound finish
    for (i = 0; i < finish.length; ++i) {
        finish[i].onclick = function () {
            settings.finish = this.id;
            for (var i = 0; i < finish.length; ++i)
                finish[i].classList.remove("active");
            this.classList.add("active");
            Cookies.create("settings", JSON.stringify(settings));
        };
        //
        // set active on pageload
        if (finish[i].id === settings.finish)
            finish[i].classList.add("active");

    }

    base_color_hash.onchange = function() {
        base_color.value     = base_color_hash.value.slice(1,7);
        settings.base_color  = base_color_hash.value.slice(1,7);
        Cookies.create("settings", JSON.stringify(settings));
        reloadStyle();
        //window.location.reload();
    };

    background_color_hash.onchange = function() {
        background_color.value     = background_color_hash.value.slice(1,7);
        settings.background_color  = background_color_hash.value.slice(1,7);
        Cookies.create("settings", JSON.stringify(settings));
        reloadStyle();
        //window.location.reload();
    };

    text_color_hash.onchange = function() {
        text_color.value     = text_color_hash.value.slice(1,7);
        settings.text_color  = text_color_hash.value.slice(1,7);
        Cookies.create("settings", JSON.stringify(settings));
        reloadStyle();
        //window.location.reload();
    };

   // auto mute
    var mute_toggle = document.querySelector('.auto-mute').querySelectorAll('.bool');
        if (settings.auto_mute === 0)
            mute_toggle[0].classList.add('active');
        else
            mute_toggle[1].classList.add('active');

    mute_toggle[0].onclick = function(){
        mute_toggle[1].classList.remove('active');
        mute_toggle[0].classList.add('active');
        settings.auto_mute = 1;
        Cookies.create("settings", JSON.stringify(settings));
    };
    mute_toggle[1].onclick = function(){
        mute_toggle[0].classList.remove('active');
        mute_toggle[1].classList.add('active');
        settings.auto_mute = 0;
        Cookies.create("settings", JSON.stringify(settings));
    };

})();

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

(function()
{
    "use strict";

    var picker;

    if (localStorage.getItem("pickery") && localStorage.getItem("pickery_fields")) {
        picker = new Picker(JSON.parse(localStorage.getItem("pickery")),
                            JSON.parse(localStorage.getItem("pickery_fields")));
        picker.set();
    }

    if (!window.FileReader) {
        document.querySelector("#uploadcsv").innerHTML =
        "Your browser does not support window.FileReader. Uploading files will not be possible.";
        return false;
    }

    document.querySelector("#pickery_class_magister").addEventListener("change", function()
    {
        var file = this.files[0];

        if(file.size > 100000) {
            new Notification("File size too large.", "warning", 4000);
            return false;
        }

        if (!file) {
            new Notification("Failed to load file.", "warning", 4000);
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        r.onload = function() {
            /*
             * 2, 3, 4 are the name-related columns in the CSV generated by
             * Magister.
             */
            picker = new Picker(CSV.to_json_magister(this.result), [2, 3, 4]);
            picker.set();

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            localStorage.setItem("pickery", JSON.stringify(picker.students));
        };
    }, false);

    document.querySelector("#pickery_class").addEventListener("change", function()
    {
        var file = this.files[0];

        if(file.size > 1000000) {
            new Notification("File size too large.", "warning", 4000);
            return false;
        }

        if (!file) {
            new Notification("Failed to load file.", "warning", 4000);
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        // What happens when a file gets selected
        r.onload = function() {
            picker = new Picker(CSV.to_json(this.result), [0]);
            picker.set();

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            localStorage.setItem("pickery", JSON.stringify(picker.students));
        };
    }, false);

    document.querySelector("#pickery_delete_name").onclick = function() {
        picker.remove();
    };

    document.querySelector("#pickery_fields_submit").onclick = function() {
        picker.set();
    };

    document.querySelector("#pickery_clear_history").onclick = function() {
        if (!document.querySelector("#pickery_chosen_names").children.length) {
            new Notification("Nothing to clear", "normal", 4000);
            return false;
        }

        picker.clear_history();
    };

    document.querySelector("#pickery_clear_all").onclick = function() {
        picker.clear_all();
    };

    document.querySelector("#pickery_post_random").onclick = function() {
        picker.random("#pickery_chosen_names");
    };

    document.querySelector("#allow_duplicates").onclick = function() {
        var button = document.querySelector(".dupes");

        if (this.checked) {
            new Notification("Duplicates enabled", "normal");
            button.classList.remove("disabled");
            button.classList.add("enabled");
        } else {
            new Notification("Duplicates disabled", "warning");
            button.classList.remove("enabled");
            button.classList.add("disabled");
        }
    };
})();

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

(function()
{
    "use strict";

    var grouper;

    if (localStorage.getItem("groupery") && localStorage.getItem("groupery_fields")) {
        grouper = new Grouper(JSON.parse(localStorage.getItem("groupery")),
                              JSON.parse(localStorage.getItem("groupery_fields")));
        grouper.set();
    }

    if (!window.FileReader) {
        document.querySelector("#uploadcsv").innerHTML =
        "Your browser does not support window.FileReader. Uploading files will not be possible.";
        return false;
    }

    document.querySelector("#groupery_class_magister").addEventListener("change", function()
    {
        var file = this.files[0];

        if(file.size > 100000) {
            new Notification("File size too large.", "warning", 4000);
            return false;
        }

        if (!file) {
            new Notification("Failed to load file.", "warning", 4000);
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        r.onload = function() {
            grouper = new Grouper(CSV.to_json_magister(this.result), [2, 3, 4]);
            grouper.set();

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            localStorage.setItem("groupery", JSON.stringify(grouper.students));
        };
    }, false);

    document.querySelector("#groupery_class").addEventListener("change", function()
    {
        var file = this.files[0];

        if(file.size > 100000) {
            new Notification("File size too large.", "warning", 4000);
            return false;
        }

        if (!file) {
            new Notification("Failed to load file.", "warning", 4000);
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        r.onload = function() {
            grouper = new Grouper(CSV.to_json(this.result), [0]);
            grouper.set();

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            localStorage.setItem("groupery", JSON.stringify(grouper.students));
        };
    }, false);

    // Can only choose one of the two options for generating groups
    document.querySelector("#n_students").onblur = function() {
        if (document.querySelector("#n_students").value.replace(" ", ""))
            document.querySelector("#n_groups").disabled = true;
        else
            document.querySelector("#n_groups").disabled = false;
    };

    document.querySelector("#n_groups").onblur = function() {
        if (document.querySelector("#n_groups").value.replace(" ", "")) {
            document.querySelector("#n_students").disabled = true;
        } else {
            document.querySelector("#n_students").disabled = false;
        }
    };

    document.querySelector("#groupery_clear_all").onclick = function() {
        grouper.clear_all();
    };

    document.querySelector("#groupery_delete_name").onclick = function() {
        grouper.remove();
    };

    document.querySelector("#generate_groups").onclick = function() {
        if (grouper)
            grouper.generate_groups();
        else
            new Notification("No CSV imported", "warning", 4000);
    };

    // Formatting options (default, json, plain)
    document.querySelector("#set_default").onclick = function() {
        grouper.set_groups();
    };

    document.querySelector("#set_json").onclick = function() {
        grouper.set_json();
    };

    document.querySelector("#set_plain").onclick = function() {
        grouper.set_plain();
    };

    document.querySelector("#groupery_fields_submit").onclick = function() {
        grouper.set();
    };
})();

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

(function()
{
    if(!Cookies.get("cookie_warn")) {
        var p = document.createElement("p");
        var i = document.createElement("i");

        p.innerHTML = "In order to function properly, this site uses cookies.";

        i.className = "icon ion-close";
        i.id        = "close-cookie";

        document.querySelector(".cookie").appendChild(p);
        document.querySelector(".cookie").appendChild(i);

        document.querySelector("#close-cookie").onclick = function() {
            Cookies.create("cookie_warn", 1);
            document.querySelector(".cookie").classList.add("hidden");
            setTimeout(function(){
                document.querySelector(".cookie").display = "none";
            }, 1000);
        };
    }
    
    function setTitle(section){
        var title = document.querySelector('title');
        var hash = section || window.location.hash;
        hash = hash.substr(1);
        var parts = title.innerHTML.split(' - ');
        title.innerHTML = parts[0]+' - '+hash;
    }
    
    // Preload
    var hash = (window.location.hash !== "") ? window.location.hash : "#home";
    if (hash === "#")
        hash = "#home";
    setTitle(hash);
    var elm = document.querySelector(hash);
    if (elm)
        elm.classList.add("show");

    var menu_item = document.querySelector(window.location.hash + "_menu");
    if (menu_item)
        menu_item.classList.add("active");

    // On button click
    window.onhashchange = function() {
        var showing = document.querySelectorAll(".page.show");
        var menu_items = document.querySelectorAll(".menu");

        for (i=0;i<showing.length;i++)
            showing[i].classList.remove("show");

        for (var i = 0; i < menu_items.length; ++i)
            menu_items[i].classList.remove("active");

        var elm = document.querySelector(window.location.hash);
        if (elm)
            elm.classList.add("show");

        var menu_item = document.querySelector(window.location.hash + "_menu");
        if (menu_item)
            menu_item.classList.add("active");
        setTitle();
    };

})();
