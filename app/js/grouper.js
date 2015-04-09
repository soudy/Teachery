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

var Grouper = function(students)
{
    this.students      = students;
    this.student_count = 0;
    this.groups        = {};
    this.student_keys  = Object.keys(students);
    this.formats = {
        "default" : document.querySelector("#set_default"),
        "json"    : document.querySelector("#set_json"),
        "plain"   : document.querySelector("#set_plain")
    };

    this.group_container_elm = document.querySelector("#groupery_options");
    this.groupery_groups_elm = document.querySelector("#groupery_groups");
    this.groupery_title_elm  = document.querySelector("#groupery_title");
    this.generate_groups_elm = document.querySelector("#generate_groups");
    this.groupery_format_elm = document.querySelector("#format");


    if (this.student_count > 1000) {
        new Notification("The maximum amount of importable names is 1000.",
                         "warning", 3000);
        return false;
    }


    if (localStorage.getItem("groupery_groups")) {
        this.groups = JSON.parse(localStorage.getItem("groupery_groups").split(","));
        this.set_groups();
    }

};


Grouper.prototype.clear_active = function()
{
    for (var format in this.formats)
        this.formats[format].classList.remove("active");
};

Grouper.prototype.set_groups = function()
{
    this.clear_active();
    this.formats.default.className = "active";
    this.groupery_groups_elm.style.cssText -= "white-space:pre;";

    this.generate_groups_elm.innerHTML = "Reset";
    this.groupery_title_elm.innerHTML  = "Groups";
    this.groupery_groups_elm.innerHTML = "";

    this.group_container_elm.style.display = "none";
    this.groupery_groups_elm.style.display = "block";
    this.groupery_format_elm.style.display = "block";

    for (var group in this.groups) {
        this.group_count++;
        var group_number = group;
        group = this.groups[group];

        var group_elm = document.createElement("div");
        var h4        = document.createElement("h4");

        h4.innerHTML = group_number;

        group_elm.className = "group";
        group_elm.id        = group_number;

        group_elm.appendChild(h4);
        this.groupery_groups_elm.appendChild(group_elm);

        for (var i = 0, l = group.length; i < l; ++i)
            if (group[i])
                document.getElementById(group_number).innerHTML += group[i] + "<br />";
    }
};

Grouper.prototype.set_json = function()
{
    this.clear_active();
    this.formats.json.className = "active";

    var pre = document.createElement("pre");

    pre.innerHTML = JSON.stringify(this.groups, null, 4);

    this.groupery_groups_elm.innerHTML = "";
    this.groupery_groups_elm.appendChild(pre);
};

Grouper.prototype.set_plain = function()
{
    this.clear_active();
    this.formats.plain.className = "active";

    var pre = document.createElement("pre");

    pre.innerHTML = JSON.stringify(this.groups, null, "\0").replace(/\{|\}|\[|\]|\"|\,/g, "");

    this.groupery_groups_elm.innerHTML = "";
    this.groupery_groups_elm.appendChild(pre);
};

Grouper.prototype.set_students = function()
{
    for (var student in this.students) {
        this.student_count++;
        var fullname = this.students[student].Roepnaam + " " +
                       this.students[student].Tussenv +
                       (this.students[student].Tussenv === "" ? "" : " " ) +
                       this.students[student].Achternaam;

        var option = document.createElement('option');

        option.value     = "student" + this.students[student].Stamnr;
        option.id        = "student" + this.students[student].Stamnr;
        option.innerHTML = fullname;

        document.querySelector("#groupery_all_names").appendChild(option);
    }

    document.querySelector("#groupery_students").innerHTML = "Count: " + this.student_count;
};

Grouper.prototype.delete_name = function()
{
    var selected    = document.querySelector("#groupery_all_names").value;
    var selected_id = document.getElementById(selected);

    if (!selected) {
        new Notification("No name selected.", "normal", 2500);
        return false;
    }

    delete this.students[selected];
    selected_id.parentElement.removeChild(selected_id);

    // update count
    this.student_count--;
    document.querySelector("#groupery_students").innerHTML = "Count: " + this.student_count;

    // update storage with deleted user
    localStorage.setItem("groupery", JSON.stringify(this.students));
};

Grouper.prototype.clear_groups = function()
{
    this.generate_groups_elm.innerHTML     = "Generate groups";
    this.groupery_title_elm.innerHTML      = "Options";
    this.groupery_groups_elm.innerHTML     = "";

    this.group_container_elm.style.display = "inherit";
    this.groupery_groups_elm.style.display = "none";
    this.groupery_format_elm.style.display = "none";

    localStorage.removeItem("groupery_groups");
    this.groups = {};
};

Grouper.prototype.clear_students = function()
{
    this.students = [];
    localStorage.removeItem("groupery");

    document.querySelector("#groupery_all_names").innerHTML = "";
    document.querySelector("#groupery_students").innerHTML = "";
};

Grouper.prototype.clear_all = function()
{
    this.clear_groups();
    this.clear_students();
};

Grouper.prototype.random_name = function()
{
    var random_key = this.student_keys[Math.floor(Math.random() * this.student_keys.length)];

    if (!random_key)
        return null;

    var fullname =
          this.students[random_key].Roepnaam + " " +
          this.students[random_key].Tussenv +
         (this.students[random_key].Tussenv === "" ? "" : " " ) +
          this.students[random_key].Achternaam;


    this.student_keys.splice(this.student_keys.indexOf(random_key), 1);

    return fullname;
};

Grouper.prototype.generate_groups = function()
{
    // resetting student keys so you can keep on generating groups
    this.student_keys = Object.keys(this.students);

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
                if(name = this.random_name())
                    this.groups["Group" + i][j] = name;
            }
        }

        if (this.student_keys) {
            this.groups["Group" + n_groups] = [];
            for (i = 0, l = students_per_group + this.student_keys.length; i <= l; ++i)
                if(name = this.random_name())
                    this.groups["Group" + n_groups][i] = name;
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
                if (name = this.random_name())
                    this.groups["Group" + i][j] = name;
            }
        }

        if (this.student_keys) {
            var last_group = "Group" + n_groups;
            this.groups[last_group] = [];
            for (i = 0, l = n_groups + this.student_keys.length; i < l; ++i)
                if (name = this.random_name())
                    this.groups[last_group][i] = name;
        }
        new Notification("Created " + n_groups + " groups.", "normal", 3000);
    }

    this.set_groups();
    localStorage.setItem("groupery_groups", JSON.stringify(this.groups));
};
