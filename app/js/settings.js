/*
 * settings.js
 * Copyright (C) 2014 soud
 *
 * Distributed under terms of the MIT license.
 */

(function() {

    if (rt != 'settings') return;

    var cookie = new Cookies();

    var base_default = "821031";
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

})();
