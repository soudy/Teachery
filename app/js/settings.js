/*
 * settings.js
 * Copyright (C) 2014 soud
 *
 * Distributed under terms of the MIT license.
 */

(function() {

    if (rt != 'settings') return;
    
    var cookie = new Cookies();
    var base_color = document.getElementById("base_color");
    var icon_color = document.getElementById("icon_color");
    var background_color = document.getElementById("background_color");

    base_color.value = cookie.get("base_color") || "#821031";
    icon_color.value = cookie.get("icon_color") || "#F2F2F2";
    background_color.value = cookie.get("background_color") || "#F2F2F2";

    base_color.addEventListener("blur", function(e) {
        if(base_color.value.length != 4 || base_color.value.length != 7) {
            alert("not a valid color: " + base_color.value);
            return;
        }
        var regex  = new RegExp("(#[a-fA-F0-9]+)");
        var result = regex.exec(base_color.value);
        if (result) {
            cookie.create("base_color", result[0]);
            console.log(result);
            window.location.reload();
        }
    });

    icon_color.addEventListener("blur", function(e) {
        if(icon_color.value.length != 4 || icon_color.value.length != 7) {
            alert("not a valid color: " + icon_color.value);
            return;
        }
        var regex  = new RegExp("(#[a-fA-F0-9]+)");
        var result = regex.exec(icon_color.value);
        if (result) {
            cookie.create("icon_color", result[0]);
            console.log(result);
            window.location.reload();
        }
    });

    background_color.addEventListener("blur", function(e) {
        if(background_color.value.length != 4 || background_color.value.length != 7) {
            alert("not a valid color: " + icon_color.value);
            return;
        }
        var regex  = new RegExp("(#[a-fA-f0-9]+)");
        var result = regex.exec(background_color.value);
        if (result) {
            cookie.create("background_color", result[0]);
            console.log(result);
            window.location.reload();
        }
    });
})();
