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

function Timer(settings){

	this.name = settings.name;
	this.direction = settings.direction || 'up';
	this.mute = settings.mute || false;
	this.callback = settings.callback || function(){};

	this.time = false;

	this.duration = 0;
	this.lastTick = false;
	this.pauseBool = false;

	this.start = function(){
		this.lastTick = new Date();
		this.pauseBool = false;
		return this;
	};

	this.reset = function(){
		this.duration = 0;
		this.time = false;
		this.pauseBool = false;
		this.lastTick = false;
		return this;
	};

	this.pause = function(){
		this.pauseBool = true;
		return this;
	};

	this.setName = function(name){
		this.name = name;
		return this;
	};

	this.setTime = function(time){
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

	this.setDirection = function(direction){
		if (direction == 'up' || direction == 'down'){
			this.direction = direction;
			if (this.direction == 'down')
				this.time = null;
		}
		return this;
	};

	this.getDirection = function(){
		return this.direction;
	};

	this.getName = function(){
		return this.name;
	};

	this.getTime = function(){
		if (!this.lastTick) return this.timeLeft();
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

	this.isPaused = function(){
		if (!this.pauseBool)
			return false;
		return true;
	};

	this.timeLeft = function(){
		var display = this.duration;
		if (this.time && this.direction == 'down')
			display = this.time - this.duration;

		if (display < 0){
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

	if (settings.time){
		this.setTime(settings.time);
	}
}
