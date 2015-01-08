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

function Confirm(options){
	var self = this;
	this.element = options.element;
	this.cancelCall = options.cancel || function(){};
	this.confirmCall = options.confirm || function(){};
	this.message = options.message || 'N/A';

	this.yes = this.element.querySelector('.checkbox-confirm'),
	this.no = this.element.querySelector('.checkbox-cancel'),
	this.msg = this.element.querySelector('.checkbox-message');
    
	this.show = function(){
		this.msg.innerHTML = this.message;
		this.element.classList.add('active');
	};

	this.hide = function(){
		this.msg.innerHTML = '';
		this.element.classList.remove('active');
	};
    this.element.onclick = function(e){
        if (e.target == self.yes){
            self.hide();
            self.confirmCall();
        } else {
            if (e.target == self.msg) return;
            self.hide();
            self.cancelCall();
        }
    }
}
