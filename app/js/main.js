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

var cookie = new Cookies();

(function()
{
    if(!cookie.get("cookie_warn")) {
        document.querySelector(".cookie").innerHTML = 
        '<p>In order to function properly, this site uses cookies.</p> \
         <i class="icon ion-close" id="close-cookie"></i>';
        document.querySelector("#close-cookie").onclick = function(e) {
            cookie.create("cookie_warn", 1);
            document.querySelector(".cookie").classList.add('hidden');
            setTimeout(function(){
                document.querySelector(".cookie").display = 'none';
            }, 1000);
        };
    }

    // Preload
    var hash = (window.location.hash !== "") ? window.location.hash : '#home';
    if (hash == "#")
        hash = "#home";
    var elm = document.querySelector(hash);
    if (elm)
        elm.classList.add('show');

    var menu_item = document.querySelector(window.location.hash + "_menu");
    if (menu_item)
        menu_item.classList.add("active");
    
    // On button click
    window.onhashchange = function() {
        var showing = document.querySelectorAll('.page.show');
        var menu_items = document.querySelectorAll(".menu");

        for (i=0;i<showing.length;i++) 
            showing[i].classList.remove('show');

        for (var i = 0; i < menu_items.length; ++i)
            menu_items[i].classList.remove("active");

        var elm = document.querySelector(window.location.hash);
        if (elm)
            elm.classList.add('show');

        var menu_item = document.querySelector(window.location.hash + "_menu");
        if (menu_item)
            menu_item.classList.add("active");
    };

})();

function CSVtoJSON(csv)
{
    var lines  = csv.split("\n");
    // Removing some useless space by trimming the last 2 rows.
    var values = lines[0].split(",").splice(0, 5);
    var obj = {};
    var i;
    var classes = [];

    for (var item in lines) {
        lines[item] = lines[item].split(",").splice(0, 5);

        // You can get all the classes of the students in the CSV file by
        // uncommenting this
        classes[lines[item][1]] = lines[item][1]; 

        if (lines[item][0] == "Stamnr" || !lines[item][0])
            continue;

        for (i = 0; i <= lines[item].length - 1; ++i) {
            obj["student" + lines[item][0]] = {};
            for (i = 0; i <= values.length - 1; ++i) {
                obj["student"+lines[item][0]][values[i]] = lines[item][i] || "";
            }
        }
    }

    return obj;
}
