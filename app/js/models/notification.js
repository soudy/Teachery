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
