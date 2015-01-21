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

function Grouper(students)
{
    var self           = this;
    this.student_count = 0;
    this.groups        = {};
    this.student_keys  = Object.keys(students);

    var group_container = document.querySelector("#groupery_options");
    var groupery_groups = document.querySelector("#groupery_groups");
    var groupery_title  = document.querySelector("#groupery_title");
    var generate_groups = document.querySelector("#generate_groups");
    var groupery_format = document.querySelector("#format");

    var formats = {
        "default" : document.querySelector("#set_default"),
        "json":     document.querySelector("#set_json"),
        "plain":    document.querySelector("#set_plain")
    };

    this.clear_active = function()
    {
        for (var format in formats)
            formats[format].className -= "active";
    };

    this.set_groups = function()
    {
        this.clear_active();
        formats.default.className = "active";
        groupery_groups.style.cssText -= "white-space:pre;";

        generate_groups.innerHTML = "Reset";
        groupery_title.innerHTML  = "Groups";
        groupery_groups.innerHTML = "";

        group_container.style.display = "none";
        groupery_groups.style.display = "inline";
        groupery_format.style.display = "block";

        for (var group in this.groups) {
            this.group_count++;
            var group_number = group;
            group = this.groups[group];

            groupery_groups.innerHTML += "<div class=\"group\" id=\"" +
                                          group_number + "\"><h4>" + group_number +
                                          "</h4>";
            for (var i = 0; i < group.length; ++i) {
                if (group[i]) 
                    document.getElementById(group_number).innerHTML += group[i] + "<br />";
            }
            groupery_groups.innerHTML += "</div>";
        }
    };

    this.set_json = function()
    {
        this.clear_active();
        formats.json.className = "active";
        groupery_groups.style.cssText += "white-space:pre;";
        groupery_groups.innerHTML = JSON.stringify(this.groups, null, 4);
    };

    this.set_plain = function()
    {
        this.clear_active();
        formats.plain.className = "active";
        groupery_groups.style.cssText += "white-space:pre;";
        groupery_groups.innerHTML = JSON.stringify(this.groups, null, "\0").replace(/\{|\}|\[|\]|\"|\,/g, "");
    };

    this.set_students = function()
    {
        for (var student in students) {
            this.student_count++;
            var fullname =
            students[student].Roepnaam + " " +
                students[student].Tussenv +
                (students[student].Tussenv === "" ? "" : " " ) +
                students[student].Achternaam;

            document.querySelector("#groupery_all_names").innerHTML +=
                "<option value=\"" + "student" + students[student].Stamnr +
                "\"id=\"" + "student" + students[student].Stamnr + "\">[" +
                students[student].Klas + "] " + fullname + "</option>\n";
        }

        document.querySelector("#groupery_students").innerHTML = "Count: " + this.student_count;
    };

    this.delete_name = function()
    {
        var selected    = document.querySelector("#groupery_all_names").value;
        var selected_id = document.getElementById(selected);

        if (!selected) {
            new Notification("No name selected.", "normal", 2500);
            return aalse;
        }

        delete students[selected];
        selected_id.parentElement.removeChild(selected_id);

        // update count
        this.student_count--;
        document.querySelector("#groupery_students").innerHTML = "Count: " + this.student_count;

        // update storage with deleted user
        localStorage.setItem("groupery", JSON.stringify(students));
    };

    this.clear_groups = function()
    {
        generate_groups.innerHTML     = "Generate groups";
        groupery_title.innerHTML      = "Options";
        groupery_groups.innerHTML     = "";

        group_container.style.display = "inherit";
        groupery_groups.style.display = "none";
        groupery_format.style.display = "none";

        localStorage.removeItem("groupery_groups");
        this.groups = {};
    };

    this.clear_all = function()
    {
        this.clear_groups();

        students = [];
        localStorage.removeItem("groupery");

        document.querySelector("#groupery_all_names").innerHTML = "";
        document.querySelector("#groupery_students").innerHTML = "";
    };

    this.random_name = function()
    {
        var random_key = this.student_keys[Math.floor(Math.random() * this.student_keys.length)];

        if (!random_key)
            return null;

        var fullname =
              students[random_key].Roepnaam + " " +
              students[random_key].Tussenv +
             (students[random_key].Tussenv === "" ? "" : " " ) +
              students[random_key].Achternaam;


        this.student_keys.splice(this.student_keys.indexOf(random_key), 1);

        return fullname;
    };

    this.generate_groups = function()
    {
        // resetting student keys so you can keep on generating groups
        this.student_keys = Object.keys(students);

        var n_students = document.querySelector("#n_students").value || null;
        var n_groups   = document.querySelector("#n_groups").value || null;
        var i, j;

        if (Object.keys(this.groups).length) {
            this.clear_groups();
            n_students = "";
            n_groups = "";
            return false;
        }

        if (!n_students && !n_groups) {
            new Notification("Please select an option for creating groups.",
                             "normal", 3000);
            return false;
        }

        // if the number of groups is specified
        if (n_groups) {
            var students_per_group = Math.floor(this.student_count / n_groups);

            // checking for valid input
            if (n_groups > Math.floor(this.student_count / 2)) {
                new Notification("Can't create " + n_groups + " groups. " +
                                 "Maximum amount possible to create is " +
                                 Math.floor(this.student_count / 2),
                                 "warning", 3000);
                return false;
            }

            if (n_groups <= 0) {
                new Notification("Please enter a valid number above zero.",
                                 "normal", 3000);
                return false;
            }

            // creating the groups
            for (i = 1; i < n_groups; ++i) {
                this.groups["Group" + i] = [];
                for (j = 0; j < students_per_group; ++j) {
                    this.groups["Group" + i][j] = this.random_name();
                }
            }

            if (this.student_keys) {
                this.groups["Group" + n_groups] = [];
                for (i = 0; i <= students_per_group + this.student_keys.length; ++i)
                    this.groups["Group" + n_groups][i] = this.random_name();
            }
            new Notification("Created " + n_groups + " groups.", "normal", 3000);
        // if the number of students per group is specified
        } else if (n_students) {
            n_groups = Math.floor(this.student_count / n_students);

            // checking for valid input
            if (n_students > Math.floor(this.student_count / 2)) {
                new Notification("Can't create groups with " + n_students +
                                 " students. Maximum amount students per group is " +
                                 Math.floor(this.student_count / 2),
                                 "warning", 3000);
                return false;
            }

            if (n_students <= 0) {
                new Notification("Please enter a valid number above zero.",
                                 "normal", 3000);
                return false;
            }

            // creating the groups
            for (i = 1; i < n_groups; ++i) {
                this.groups["Group" + i] = [];
                for (j = 0; j < n_students; ++j) {
                    this.groups["Group" + i][j] = this.random_name();
                }
            }

            if (this.student_keys) {
                this.groups["Group" + n_groups] = [];
                for (i = 0; i <= n_students + this.student_keys.length; ++i)
                    this.groups["Group" + n_groups][i] = this.random_name();
            }
            new Notification("Created " + n_groups + " groups.", "normal", 3000);
        }

        this.set_groups();
        localStorage.setItem("groupery_groups", JSON.stringify(this.groups));
    };

    if (localStorage.getItem("groupery_groups")) {
        this.groups = JSON.parse(localStorage.getItem("groupery_groups").split(","));
        this.set_groups();
    }

}
