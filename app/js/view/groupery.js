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

    var grouper;

    if (localStorage.getItem("groupery") && localStorage.getItem("groupery_fields")) {
        grouper = new Grouper(JSON.parse(localStorage.getItem("groupery")),
                              JSON.parse(localStorage.getItem("groupery_fields")));
        grouper.set();
    }

    if (!window.FileReader) {
        document.querySelector("#uploadcsv").innerHTML =
        "Your browser does not support window.FileReader. Uploading files will not be possible.";
        return false;
    }

    document.querySelector("#groupery_class_magister").addEventListener("change", function()
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

        r.onload = function() {
            grouper = new Grouper(CSV.to_json_magister(this.result), [2, 3, 4]);
            grouper.set();

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            localStorage.setItem("groupery", JSON.stringify(grouper.students));
        };
    }, false);

    document.querySelector("#groupery_class").addEventListener("change", function()
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

        r.onload = function() {
            grouper = new Grouper(CSV.to_json(this.result));
            grouper.set(false);

            new Notification("Imported " + file.name.replace(".csv", ""),
                             "normal", 4000);

            localStorage.setItem("groupery", JSON.stringify(grouper.students));
        };
    }, false);

    // Can only choose one of the two options for generating groups
    document.querySelector("#n_students").onblur = function() {
        if (document.querySelector("#n_students").value.replace(" ", ""))
            document.querySelector("#n_groups").disabled = true;
        else
            document.querySelector("#n_groups").disabled = false;
    };

    document.querySelector("#n_groups").onblur = function() {
        if (document.querySelector("#n_groups").value.replace(" ", "")) {
            document.querySelector("#n_students").disabled = true;
        } else {
            document.querySelector("#n_students").disabled = false;
        }
    };

    document.querySelector("#groupery_clear_all").onclick = function() {
        grouper.clear_all();
    };

    document.querySelector("#groupery_delete_name").onclick = function() {
        grouper.remove();
    };

    document.querySelector("#generate_groups").onclick = function() {
        if (grouper)
            grouper.generate_groups();
        else
            new Notification("No CSV imported", "warning", 4000);
    };

    // Formatting options (default, json, plain)
    document.querySelector("#set_default").onclick = function() {
        grouper.set_groups();
    };

    document.querySelector("#set_json").onclick = function() {
        grouper.set_json();
    };

    document.querySelector("#set_plain").onclick = function() {
        grouper.set_plain();
    };

    document.querySelector("#groupery_fields_submit").onclick = function() {
        grouper.set();
    };
})();
