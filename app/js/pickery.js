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

(function()
{
    "use strict";

    if(rt != "picker") return;

    var cookie = new Cookies();
    var inputFile = document.querySelector("#class");

    var classes = [];
    function CSVtoJSON(csv)
    {
        var lines  = csv.split("\n");
        // Removing some useless space by trimming the last 2 rows.
        var values = lines[0].split(",").splice(0, 5);
        var obj = {};
        var i;

        for (var item in lines) {
            lines[item] = lines[item].split(",").splice(0, 5);

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

    function loadInfo(students)
    {
        var student_count = 0;
        var blacklist =  [];

        if (cookie.get("pickery_blacklist")) {
            blacklist = cookie.get("pickery_blacklist").split(",");
        }

        for (var student in students) {
            student_count++;
            var fullname =
                  students[student].Roepnaam + " "
                + students[student].Tussenv
                + (students[student].Tussenv == "" ? "" : " " )
                + students[student].Achternaam;

            for (var filtered in blacklist) {
                if (students[student].Stamnr == blacklist[filtered]) {
                    document.querySelector("#chosen_names").innerHTML +=
                        "<option value=\"" + "student" + students[student].Stamnr
                        + "\"id=\"" + "student" + students[student].Stamnr + "\">"
                        +fullname + "</option>\n";
                    continue;
                }
            }

            document.querySelector("#all_names").innerHTML +=
                "<option value=\"" + "student" + students[student].Stamnr
                + "\"id=\"" + "student" + students[student].Stamnr + "\">"
                +fullname + "</option>\n";
        }

        // show amount of names imported
        document.querySelector("#students").innerHTML = "Count: " + student_count;
        // can't save that much in a cookie
        if (student_count > 35) {
            alert("Due to the large number of imported names, these names won't be saved.")
        }

        // delete a name
        document.querySelector("#delete_name").onclick = function() {
            var selected = document.querySelector("#all_names").value;
            var selected_id = document.getElementById(selected);

            if (!selected) {
                alert("Nothing to remove.");
                return false
            }

            delete students[selected];
            selected_id.parentElement.removeChild(selected_id);

            // update count
            student_count--;
            document.querySelector("#students").innerHTML = "Count: " + student_count;

            // update cookie with deleted user
            cookie.create("pickery", JSON.stringify(students));
        }

        // clear history
        document.querySelector("#clear_history").onclick = function() {
            cookie.remove("pickery_blacklist");
            document.querySelector("#chosen_names").innerHTML = "";
            window.location.reload();
        }

        // clear all
        document.querySelector("#clear_all").onclick = function() {
            cookie.remove("pickery");
            cookie.remove("pickery_blacklist");
            document.querySelector("#all_names").innerHTML = "";
            document.querySelector("#chosen_names").innerHTML = "";
            window.location.reload();
        }

        // get random name
        document.querySelector("#post_random").onclick = function() {
            var allow_duplicates = document.querySelector("#allow_duplicates");
            var random = document.querySelector("#random");
            var keys = Object.keys(students);
            var random_key = keys[Math.floor(Math.random() * keys.length)];
            var fullname =
                  students[random_key].Roepnaam + " "
                + students[random_key].Tussenv
                + (students[random_key].Tussenv == "" ? "" : " " )
                + students[random_key].Achternaam;

            // :)
            if (fullname === "Steven Oud") fullname = "Mirko van der Waal";

            random.innerHTML = fullname;

            if (!allow_duplicates.checked) {
                blacklist[blacklist.length] = students[random_key].Stamnr;
                document.querySelector("#chosen_names").innerHTML +=
                    "<option value=\"" + "student" + students[random_key].Stamnr
                    + "\"id=\"" + "student" + students[random_key].Stamnr + "\">"
                    +fullname + "</option>\n";

                cookie.create("pickery_blacklist", blacklist);
            }
        }
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
            alert("File size too large.");
            return false;
        }

        if(file.type != "text/csv") {
            alert("File isn't a csv file.");
            return false;
        }

        if (!file) {
            alert("Failed to load file.");
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        // what happens when a file gets selected
        r.onload = function(e) {
            var students = CSVtoJSON(this.result);

            loadInfo(students);

            // save all students to a cookie
            cookie.create("pickery", JSON.stringify(students));
        };
    }, false);

    if (cookie.get("pickery")) {
        loadInfo(JSON.parse(cookie.get("pickery")));
    }

})();
