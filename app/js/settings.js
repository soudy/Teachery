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
    base_default       : "214E98",
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
