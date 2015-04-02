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
        if (e.target == this.yes){
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
        if (e.keyCode == 27){
            this.hide();
            this.cancelCall();
        }
        if (e.keyCode == 13){
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
