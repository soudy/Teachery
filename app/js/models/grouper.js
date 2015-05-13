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

var Grouper = function(students, fields)
{
    "use strict";

    this.students       = students;
    this.student_count  = students.cells.length;
    this.fields         = fields || [];
    this.blacklist      = [];
    this.groups         = {};

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

    this.all_names_elm         = document.querySelector("#groupery_all_names");
    this.csv_overlay           = document.querySelector("#csv_overlay_groupery");
    this.all_fields_elm        = document.querySelector("#groupery_all_fields");
    this.all_fields_info_elm   = document.querySelector("#groupery_all_fields_info");
    this.all_fields_submit     = document.querySelector("#groupery_fields_submit");

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

Grouper.prototype.remove = function()
{
    var element  = this.all_names_elm;
    var selected = element.options[element.selectedIndex];

    if (!selected) {
        new Notification("No name selected.", "warning");
        return false;
    }

    var selected_id = parseInt(selected.id);

    this.students.cells.splice(selected_id, 1);
    this.all_names_elm.removeChild(document.getElementById(selected_id));

    this.update_storage();
};

Grouper.prototype.hide_fields = function()
{
    this.csv_overlay.classList.add('hidden');
    this.all_fields_elm.innerHTML = "";
};

Grouper.prototype.show_fields = function()
{
    this.csv_overlay.classList.remove('hidden');

    for (var i = 0, l = this.students.titles.length; i < l; ++i) {
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = i;

        input.onchange = function(e) {

            if (this.fields.indexOf(e.target.id) >= 0)
                this.fields.splice(this.fields.indexOf(e.target.id), 1);
            else
                this.fields.push(e.target.id);
        }.bind(this);

        var li = document.createElement("li");
        var span = document.createElement("span");
        span.innerHTML += this.students.titles[i];
        li.appendChild(input);
        li.appendChild(span);
        this.all_fields_elm.appendChild(li);
    }
};

Grouper.prototype.set = function()
{
    this.hide_fields();

    for (var i = 0, l = this.students.cells.length; i < l; ++i) {
        var option = document.createElement("option");
        var fullname = "";

        if (this.fields === '*')
            fullname = this.students.cells[i];
        else
            for (var j = 0, ll = this.fields.length; j < ll; ++j)
                fullname += this.students.cells[i][this.fields[j]] + " ";

        option.innerHTML = fullname;
        option.id = i;

        this.all_names_elm.appendChild(option);
    }

    this.update_storage();
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
        var group_number = group;

        var group_elm = document.createElement("div");
        var h4        = document.createElement("h4");

        h4.innerHTML = group_number;

        group_elm.className = "group";
        group_elm.id        = group_number;

        group_elm.appendChild(h4);
        this.groupery_groups_elm.appendChild(group_elm);

        for (var key in this.groups[group]) {
            var fields = this.groups[group][key];
            var name = "";

            for (var field in fields)
                name += " " + fields[field];

            document.getElementById(group_number).innerHTML += name + "<br>";
        }

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

    var div = document.createElement("p");

    for (var group in this.groups) {
        var group_number = group;
        div.innerHTML += "<p>" + group_number + "</p>";

        var group_elm = document.createElement("div");
        var h4        = document.createElement("h4");

        h4.innerHTML = group_number;

        group_elm.className = "group";
        group_elm.id        = group_number;

        group_elm.appendChild(h4);
        this.groupery_groups_elm.appendChild(group_elm);

        for (var key in this.groups[group]) {
            var fields = this.groups[group][key];
            var name = "";

            for (var field in fields)
                name += " " + fields[field];

            div.innerHTML += name + "<br>";
        }

    }

    this.groupery_groups_elm.innerHTML = "";
    this.groupery_groups_elm.appendChild(div);
};

Grouper.prototype.clear_active = function()
{
    for (var format in this.formats)
        this.formats[format].classList.remove("active");
};

Grouper.prototype.update_storage = function()
{

    localStorage.setItem("groupery_fields", JSON.stringify(this.fields));
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
    this.blacklist = [];
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

Grouper.prototype.random = function()
{
    var randint;

    if (this.blacklist.length >= this.students.cells.length)
        return false;

    randint = Math.floor(Math.random() * (this.students.cells.length - 0));

    while (this.blacklist.indexOf(randint) >= 0)
        randint = Math.floor(Math.random() * (this.students.cells.length - 0));

    this.blacklist.push(randint);

    var student = this.students.cells[randint];
    var result  = [];

    if (this.fields === '*')
        result.push(student);
    else
        for (var j = 0, l = this.fields.length; j < l; ++j)
            result.push(student[this.fields[j]]);

    return result;
};

Grouper.prototype.generate_groups = function()
{
    var n_students = document.querySelector("#n_students").value || null;
    var n_groups   = document.querySelector("#n_groups").value || null;

    if (!this.students.titles)
        this.students.titles = ['Name'];


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

    if (n_groups) {
        if (n_groups > Math.floor(this.student_count / 2)) {
            new Notification("Can't create " + n_groups + " groups. " +
                             "Maximum amount possible to create is " +
                             Math.floor(this.student_count / 2),
                             "warning", 3000);
            return false;
        }

        this.make_groups(parseInt(n_groups), null);
    } else if (n_students) {
        if (n_students > Math.floor(this.student_count / 2)) {
            new Notification("Can't create groups with " + n_students +
                             " students. Maximum amount students per group is " +
                             Math.floor(this.student_count / 2),
                             "warning", 3000);
            return false;
        }

        this.make_groups(null, parseInt(n_students));
    } else {
        new Notification("Something went wrong. Please try again.",
        "normal", 3000);
        return false;
    }

    this.set_groups();
    localStorage.setItem("groupery_groups", JSON.stringify(this.groups));
};

Grouper.prototype.make_groups = function(n_groups, n_students)
{
    var names      = [];
    var used_names = 0;
    var i, j, k, h, l, count;

    // Generate an array with names in random order
    while ((name = this.random())) {
        names.push(name.split(","));
    }

    if (n_groups) {
        var students_per_group = Math.floor(this.student_count / n_groups);

        if (n_groups <= 1) {
            new Notification("Please enter a valid number above one.",
            "normal", 3000);
            return false;
        }

        for (i = 1, count = 0; i <= n_groups; ++i, count += students_per_group) {
            this.groups["Group " + i] = {};

            for (j = count, k = 0; j < count + students_per_group; ++j, ++k) {
                this.groups["Group " + i][k] = {};

                for (h = 0, l = names[j].length; h < l; ++h) {
                    var title;

                    if (this.fields === '*')
                        title = this.students.titles[h];
                    else
                        title = this.students.titles[this.fields[h]];

                    this.groups["Group " + i][k][title] = names[j][h];
                }

                used_names++;
            }
        }

    } else if (n_students) {
        n_groups = Math.ceil(this.student_count / n_students);

        if (n_groups <= 1) {
            new Notification("Please enter a valid number above one.",
            "normal", 3000);
            return false;
        }

        for (i = 1, count = 0; i <= n_groups; ++i, count += n_students) {
            this.groups["Group " + i] = {};

            for (j = count, k = 0; j < count + n_students; ++j, ++k) {
                if (!names[j])
                    continue;

                this.groups["Group " + i][k] = {};

                for (h = 0, l = names[j].length; h < l; ++h) {
                    var title;

                    if (this.fields === '*')
                        title = this.students.titles[h];
                    else
                        title = this.students.titles[this.fields[h]];

                    this.groups["Group " + i][k][title] = names[j][h];
                }

                used_names++;
            }
        }
    }

    names.splice(0, used_names);

    /*
     * If there are leftover names, try to divide them over the groups if
     * possible, else append them to the last group.
     *
     * TODO: Evenly divide if possible
     */
    if (names) {
        var last_group_length = Object.keys(this.groups["Group " + n_groups]).length;

        for (j = 0, i = last_group_length; i < last_group_length + names.length; ++j, ++i) {
            if (!names[j])
                continue;

            this.groups["Group " + n_groups][i] = {};

            for (h = 0, l = names[j].length; h < l; ++h) {
                var title;

                if (this.fields === '*')
                    title = this.students.titles[h];
                else
                    title = this.students.titles[this.fields[h]];
                this.groups["Group " + n_groups][i][title] = names[j][h];
            }
        }
    }

    new Notification("Created " + n_groups + " groups.", "normal", 3000);
};
