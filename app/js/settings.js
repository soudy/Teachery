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


    var base_default = "214E98";
    var text_default = "191919";
    var background_default = "F2F2F2";
    var mute_default = 1;
    var clock_default = '00:10:00';
    var finish_default = "airhorn";

    var settings = JSON.parse(cookie.get("settings")) ||
    {
        base_color: base_default,
        text_color: text_default,
        background_color: background_default,
        auto_mute: mute_default,
        clock: clock_default,
        finish: finish_default
    };

    var base_color_hash  = document.querySelector("#base_color_hash");
    var background_color_hash  = document.querySelector("#background_color_hash");
    var text_color_hash  = document.querySelector("#text_color_hash");
    var base_color       = document.querySelector("#base_color");
    var background_color = document.querySelector("#background_color");
    var text_color       = document.querySelector("#text_color");
    var clocks           = document.querySelectorAll('.clock_default');
    var finish           = document.querySelectorAll(".finish");

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
    };

    document.querySelector("#background_reset").onclick = function() {
        settings.background_color = background_default;
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    };

    document.querySelector("#text_reset").onclick = function() {
        settings.text_color = text_default;
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    };

    document.querySelector("#time_reset").onclick = function() {
        var t = clock_default.split(':');
        clocks[0].value = t[0];
        clocks[1].value = t[1];
        clocks[2].value = t[2];
        cookie.create("settings", JSON.stringify(settings));
    };

    // default start time
    var t = settings.clock.split(':');
    for (var i = 0; i < clocks.length; i++) {
        clocks[i].value = t[i];
        clocks[i].addEventListener('blur', function(){
            settings.clock = clocks[0].value+':'+clocks[1].value+':'+clocks[2].value;
            cookie.create("settings", JSON.stringify(settings));
        });
    }

    // auto mute
    var mute_toggle = document.querySelector('.auto-mute').querySelectorAll('.bool');
    if (settings.auto_mute == 0)
        mute_toggle[0].classList.add('active');
    else
        mute_toggle[1].classList.add('active');

    mute_toggle[0].onclick = function(){
        mute_toggle[1].classList.remove('active');
        mute_toggle[0].classList.add('active');
        settings.auto_mute = 1;
        cookie.create("settings", JSON.stringify(settings));
    };
    mute_toggle[1].onclick = function(){
         mute_toggle[0].classList.remove('active');
        mute_toggle[1].classList.add('active');
        settings.auto_mute = 0;
        cookie.create("settings", JSON.stringify(settings));
    };

    // sound finish
    for (i = 0; i < finish.length; ++i) {
        finish[i].onclick = function (e) {
            settings.finish = this.id;
            for (var i = 0; i < finish.length; ++i)
                finish[i].classList.remove("active");
            this.classList.add("active");
            cookie.create("settings", JSON.stringify(settings));
        };
        //
        // set active on pageload
        if (finish[i].id == settings.finish)
            finish[i].classList.add("active");
            
    }

    base_color_hash.onchange = function() {
        base_color.value = base_color_hash.value.slice(1,7);
        settings.base_color = base_color_hash.value.slice(1,7);
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    };

    background_color_hash.onchange = function() {
        background_color.value = background_color_hash.value.slice(1,7);
        settings.background_color = background_color_hash.value.slice(1,7);
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    };

    text_color_hash.onchange = function() {
        text_color.value = text_color_hash.value.slice(1,7);
        settings.text_color = text_color_hash.value.slice(1,7);
        cookie.create("settings", JSON.stringify(settings));
        window.location.reload();
    };
    
})();
