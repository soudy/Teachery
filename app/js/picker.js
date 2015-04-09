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

var Picker = function(students)
{
    "use strict";

    this.chosen_names_elm = document.querySelector("#pickery_chosen_names");
    this.all_names_elm    = document.querySelector("#pickery_all_names");
    this.chosen_name_elm  = document.querySelector("#chosen_name p");

    this.students     = students;
    this.blacklist    = [];
    this.chosen_names = [];

    if (localStorage.getItem("pickery_blacklist")) {
        this.blacklist = JSON.parse(localStorage.getItem("pickery_blacklist"));
        this.set_chosen_names();
    }
};

Picker.prototype.set = function()
{
    /*
     * This show method is fit for Magister's CSV structure and will most likely
     * not work on other CSV files because it will grab the wrong fields.
     */

    for (var i = 0, l = this.students.cells.length; i < l; ++i) {
        var student  = this.students.cells[i];
        var option   = document.createElement("option");
        var fullname = student[2] + " " +
                       student[3] + " " +
                       student[4];

        option.innerHTML = fullname;
        option.id        = i;

        this.all_names_elm.appendChild(option);
    }
};

Picker.prototype.set_chosen_names = function()
{
    for (var i = 0, l = this.blacklist.length; i < l; ++i) {
        var student = this.students.cells[this.blacklist[i]];
        var option  = document.createElement("option");
        var fullname = student[2] + " " +
                       student[3] + " " +
                       student[4];

        this.chosen_names.push(fullname);

        option.innerHTML = fullname;
        option.id        = i;

        this.chosen_names_elm.insertBefore(
            option,
            document.querySelector("#pickery_chosen_names > option:first-of-type")
        );
    }
};

Picker.prototype.remove = function()
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

    localStorage.setItem("pickery", JSON.stringify(this.students));
};

Picker.prototype.random = function()
{
    var allow_duplicates = document.querySelector("#allow_duplicates").checked;
    var randint;

    if (!allow_duplicates) {
        if (this.blacklist.length >= this.students.cells.length) {
            new Notification("You've looped through all names.");
            return false;
        }
    }

    randint = Math.floor(Math.random() * (this.students.cells.length - 0));

    if (!allow_duplicates) {
        // No duplicates allowed
        while (this.blacklist.indexOf(randint) >= 0)
            randint = Math.floor(Math.random() * (this.students.cells.length - 0));

        this.blacklist.push(randint);
    }

    var student = this.students.cells[randint];
    var option  = document.createElement("option");
    var fullname = student[2] + " " +
                   student[3] + " " +
                   student[4];

    this.chosen_names.push(fullname);

    option.innerHTML = fullname;
    option.id        = randint;

    this.chosen_name_elm.innerHTML = fullname;

    this.chosen_names_elm.insertBefore(
        option,
        document.querySelector("#pickery_chosen_names > option:first-of-type")
    );

    localStorage.setItem("pickery_blacklist", JSON.stringify(this.blacklist));
};

Picker.prototype.clear_history = function()
{
    localStorage.removeItem("pickery_blacklist");
    this.blacklist = [];
    this.chosen_names_elm.innerHTML = "";
    this.chosen_name_elm.innerHTML = "";
};

Picker.prototype.clear_students = function()
{
    localStorage.removeItem("pickery");

    this.students = [];
    this.all_names_elm.innerHTML = "";
};

Picker.prototype.clear_all = function()
{
    this.clear_history();
    this.clear_students();
};
