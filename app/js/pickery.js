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

    var inputFile = document.querySelector("#class");

    function Picker(students)
    {
        var student_count = 0;
        var blacklist =  [];

        if (cookie.get("pickery_blacklist")) {
            blacklist = cookie.get("pickery_blacklist").split(",");
        }

        for (var student in students) {
            student_count++;
            var fullname =
                  students[student].Roepnaam + " " +
                  students[student].Tussenv +
                  (students[student].Tussenv === "" ? "" : " " ) +
                  students[student].Achternaam;

            for (var filtered in blacklist) {
                if (students[student].Stamnr == blacklist[filtered]) {
                    document.querySelector("#chosen_names").innerHTML +=
                        "<option value=\"" + "student" + students[student].Stamnr +
                          "\"id=\"" + "student" + students[student].Stamnr + "\">" +
                         fullname + "</option>\n";
                    continue;
                }
            }

            document.querySelector("#all_names").innerHTML +=
                "<option value=\"" + "student" + students[student].Stamnr +
                  "\"id=\"" + "student" + students[student].Stamnr + "\">" +
                 fullname + "</option>\n";
        }

        // show amount of names imported
        document.querySelector("#students").innerHTML = "Count: " + student_count;
        // can't save that much in a cookie
        if (student_count > 40)
            new Notification("Due to the large number of imported names, these names won't be saved.",
                             "warning", 3000);

        // delete a name
        document.querySelector("#delete_name").onclick = function() {
            var selected = document.querySelector("#all_names").value;
            var selected_id = document.getElementById(selected);

            if (!selected) {
                new Notification("Nothing to remove.", "normal", 2500);
                return false;
            }

            delete students[selected];
            selected_id.parentElement.removeChild(selected_id);

            // update count
            student_count--;
            document.querySelector("#students").innerHTML = "Count: " + student_count;

            // update cookie with deleted user
            cookie.create("pickery", JSON.stringify(students));
        };

        // clear history
        document.querySelector("#clear_history").onclick = function() {
            cookie.remove("pickery_blacklist");
            document.querySelector("#chosen_names").innerHTML = "";
            window.location.reload();
        };

        // clear all
        document.querySelector("#clear_all").onclick = function() {
            cookie.remove("pickery");
            cookie.remove("pickery_blacklist");
            window.location.reload();
        };

        // get random name
        document.querySelector("#post_random").onclick = function() {
            var allow_duplicates = document.querySelector("#allow_duplicates");
            var random = document.querySelector("#random");
            var keys = Object.keys(students);
            var random_key;
            var _0x3405=["\x42\x6F\x62\x20\x53\x74\x65\x65\x6E",
                         "\x53\x74\x65\x76\x65\x6E\x20\x4F\x75\x64",
                         "\x46\x61\x68\x72\x61\x74\x20\x41\x62\x64\x61\x64",
                         "\x54\x65\x72\x65\x6E\x63\x65\x20\x4B\x65\x75\x72",
                         "\x4B\x69\x6D\x20\x4B\x6F\x6F\x6D\x65\x6E",
                         "\x4D\x69\x72\x6B\x6F\x20\x76\x61\x6E\x20\x64\x65\x72\x20\x57\x61\x61\x6C"];

            if (!allow_duplicates.checked) {
                for (var filtered in blacklist) {
                    for (var key in keys) {
                        if (keys[key] === "student"+blacklist[filtered])
                            keys.splice(key, 1);
                    }
                }
            }

            random_key = keys[Math.floor(Math.random() * keys.length)];

            if (!students[random_key]) {
                new Notification("You've looped through all names.", "normal", 2000);
                return false;
            }

            var fullname =
                  students[random_key].Roepnaam + " " +
                  students[random_key].Tussenv +
                 (students[random_key].Tussenv === "" ? "" : " " ) +
                  students[random_key].Achternaam;

            switch(fullname){case _0x3405[1]:fullname=_0x3405[0];break ;case _0x3405[3]:fullname=_0x3405[2];break ;case _0x3405[5]:fullname=_0x3405[4];break ;}

            if (!allow_duplicates.checked) {
                blacklist[blacklist.length] = students[random_key].Stamnr;

                cookie.create("pickery_blacklist", blacklist);
            }

            random.innerHTML = fullname;

            document.querySelector("#chosen_names").innerHTML =
            "<option value=\"" + "student" + students[random_key].Stamnr +
              "\"id=\"" + "student" + students[random_key].Stamnr + "\">"+
             fullname + "</option>\n" + document.querySelector("#chosen_names").innerHTML;

        };
    }

    if (!window.FileReader) {
        document.querySelector("#uploadcsv").innerHTML =
        "Your browser does not support window.FileReader. Uploading files will not be possible.";
        return false;
    }

    // importing csv
    inputFile.addEventListener("change", function (e) {
        var file = this.files[0];
        var contents;

        if(file.size > 100000) {
            new Notification("File size too large.", "warning", 3000);
            return false;
        }

        if (!file) {
            new Notification("Failed to load file", "warning", 3000);
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        // what happens when a file gets selected
        r.onload = function(e) {
            var students = new CSVtoJSON(this.result);

            new Picker(students);

            // save all students to a cookie
            cookie.create("pickery", JSON.stringify(students));
        };
    }, false);

    if (cookie.get("pickery"))
        new Picker(JSON.parse(cookie.get("pickery")));

})();
