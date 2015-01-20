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
    "use strict";

    var picker;

    if (localStorage.getItem("pickery")) {
        picker = new Picker(JSON.parse(localStorage.getItem("pickery")));
        picker.set_students();
    }

    if (!window.FileReader) {
        document.querySelector("#uploadcsv").innerHTML =
        "Your browser does not support window.FileReader. Uploading files will not be possible.";
        return false;
    }

    document.querySelector("#pickery_class").addEventListener("change", function(e)
    {
        var file = this.files[0];

        if(file.size > 100000) {
            new Notification("File size too large.", "warning", 4000);
            return false;
        }

        if (!file) {
            new Notification("Failed to load file.", "warning", 4000);
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        // what happens when a file gets selected
        r.onload = function(e) {
            var students = new CSVtoJSON(this.result);

            picker = new Picker(students);
            picker.set_students();

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            // save all students to local storage
            localStorage.setItem("pickery", JSON.stringify(students));
        };
    }, false);

    document.querySelector("#pickery_delete_name").onclick = function() {
        picker.delete_name();
    };

    document.querySelector("#pickery_clear_history").onclick = function() {
        if (!document.querySelector("#pickery_chosen_names").children.length) {
            new Notification("Nothing to clear", "normal", 4000);
            return false;
        }

        picker.clear_history();
    };

    document.querySelector("#pickery_clear_all").onclick = function() {
        picker.clear_all();
    };

    document.querySelector("#pickery_post_random").onclick = function() {
        picker.random_name();
    };
})();
