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

window.onload = function() {

    var cookie = new Cookies();

    var base_default = "214E98";
    var text_default = "191919";
    var background_default = "F2F2F2";

    var settings = JSON.parse(cookie.get("settings")) || 
    {
        base_color: base_default,
        text_color: text_default,
        background_color: background_default
    };

    var base_color       = document.querySelector("#base_color");
    var background_color = document.querySelector("#background_color");
    var text_color       = document.querySelector("#text_color");

    base_color.value       = settings.base_color;
    background_color.value = settings.background_color;
    text_color.value       = settings.text_color;

    base_color.addEventListener("blur", function(e) {
        if(!(base_color.value.length == 3 || base_color.value.length == 6)) {
            alert("not a valid color: " + base_color.value);
            return;
        }

        var regex  = new RegExp("([a-fA-F0-9]+)");
        var result = regex.exec(base_color.value);
        if (result) {
            settings.base_color = result[0];
            cookie.create("settings", JSON.stringify(settings));
            window.location.reload();
        }
    });

    background_color.addEventListener("blur", function(e) {
        if(!(background_color.value.length == 3 || background_color.value.length == 6)) {
            alert("not a valid color: " + text_color.value);
            return;
        }

        var regex  = new RegExp("([a-fA-f0-9]+)");
        var result = regex.exec(background_color.value);
        if (result) {
            settings.background_color = result[0];
            cookie.create("settings", JSON.stringify(settings));
            window.location.reload();
        }
    });

    text_color.addEventListener("blur", function(e) {
        if(!(text_color.value.length == 3 || text_color.value.length == 6)) {
            alert("not a valid color: " + text_color.value);
            return;
        }

        var regex  = new RegExp("([a-fA-F0-9]+)");
        var result = regex.exec(text_color.value);
        if (result) {
            settings.text_color = result[0];
            cookie.create("settings", JSON.stringify(settings));
            window.location.reload();
        }
    });

    document.querySelector("#base_reset").onclick = function() {
        settings.base_color = base_default;
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    }

    document.querySelector("#background_reset").onclick = function() {
        settings.background_color = background_default;
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    }

    document.querySelector("#text_reset").onclick = function() {
        settings.text_color = text_default;
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    }
}

