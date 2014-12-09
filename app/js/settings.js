/*
 * Teachery is a web application to make the life of teacher's easier.
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

(function() {

    if (rt != 'settings') return;

    var cookie = new Cookies();

    var base_default = "214E98";
    var text_default = "191919";
    var background_default = "F2F2F2";
    
    var base_color       = document.getElementById("base_color");
    var background_color = document.getElementById("background_color");
    var text_color       = document.getElementById("text_color");

    base_color.value       = cookie.get("base_color") || base_default;
    background_color.value = cookie.get("background_color") || background_default;
    text_color.value       = cookie.get("text_color") || text_default;

    base_color.addEventListener("blur", function(e) {
        /*
         * if(!(base_color.value.length == 4 || base_color.value.length == 7)) {
         *     alert("not a valid color: " + base_color.value);
         *     return;
         * }
         */
        console.log(base_color.value);
        var regex  = new RegExp("([a-fA-F0-9]+)");
        var result = regex.exec(base_color.value);
        if (result) {
            cookie.create("base_color", result[0]);
            window.location.reload();
        }
    });

    background_color.addEventListener("blur", function(e) {
        /*
         * if(!(background_color.value.length == 4 || background_color.value.length == 7)) {
         *     alert("not a valid color: " + text_color.value);
         *     return;
         * }
         */
        var regex  = new RegExp("([a-fA-f0-9]+)");
        var result = regex.exec(background_color.value);
        if (result) {
            cookie.create("background_color", result[0]);
            window.location.reload();
        }
    });

    text_color.addEventListener("blur", function(e) {
        /*
         * if(!(text_color.value.length == 4 || text_color.value.length == 7)) {
         *     alert("not a valid color: " + text_color.value);
         *     return;
         * }
         */
        var regex  = new RegExp("([a-fA-F0-9]+)");
        var result = regex.exec(text_color.value);
        if (result) {
            cookie.create("text_color", result[0]);
            window.location.reload();
        }
    });

    document.querySelector("#base_reset").onclick = function() {
        cookie.remove("base_color");
        window.location.reload();
    }

    document.querySelector("#background_reset").onclick = function() {
        cookie.remove("background_color");
        window.location.reload();
    }

    document.querySelector("#text_reset").onclick = function() {
        cookie.remove("text_color");
        window.location.reload();
    }

})();
