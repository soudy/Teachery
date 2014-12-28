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

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	})();
}

function Render(settings){
	var self = this;
	this.call = settings.callback || function(){};
	this.timeout = settings.timeout || 10;
	this.started = false;
	this.break = false;

	this.start = function(){
		if (this.started) return false;

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
