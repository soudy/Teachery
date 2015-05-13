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

var Picker = function(students, fields)
{
    "use strict";

    this.chosen_names_elm = document.querySelector("#pickery_chosen_names");
    this.all_names_elm    = document.querySelector("#pickery_all_names");
    this.chosen_name  = document.querySelector("#chosen_name");
    this.chosen_name_elm  = document.querySelector("#chosen_name p");
    this.chosen_sound = new Audio();
    this.chosen_sound.src = "sounds/chat_tone.mp3";
    this.chosen_timeout = null;

    this.csv_overlay           = document.querySelector("#csv_overlay_pickery");
    this.all_fields_elm        = document.querySelector("#pickery_all_fields");
    this.all_fields_info_elm   = document.querySelector("#pickery_all_fields_info");
    this.all_fields_submit     = document.querySelector("#pickery_fields_submit");

    this.students     = students;
    this.blacklist    = [];
    this.chosen_names = [];
    this.fields       = fields || [];

    if (localStorage.getItem("pickery_blacklist")) {
        try {
            this.blacklist = JSON.parse(localStorage.getItem("pickery_blacklist"));
        } catch (e) {
            localStorage.clear();
            this.blacklist = JSON.parse(localStorage.getItem("pickery_blacklist"));
        }

        this.set_chosen_names();
    }
};

Picker.prototype.hide_fields = function()
{
    this.csv_overlay.classList.add("hidden");
    this.all_fields_elm.innerHTML = "";
};

Picker.prototype.show_fields = function()
{
    this.csv_overlay.classList.remove("hidden");

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

Picker.prototype.set = function()
{
    this.hide_fields();

    for (var i = 0, l = this.students.cells.length; i < l; ++i) {
        var option = document.createElement("option");

        var fullname = "";
        for (var j = 0, ll = this.fields.length; j < ll; ++j) {
            fullname += this.students.cells[i][this.fields[j]] + " ";

            option.innerHTML = fullname;
            option.id = i;

            this.all_names_elm.appendChild(option);
        }
    }

    this.update_storage();

};

Picker.prototype.update_storage = function()
{
    localStorage.setItem("pickery_blacklist", JSON.stringify(this.blacklist));
    localStorage.setItem("pickery_fields", JSON.stringify(this.fields));
    localStorage.setItem("pickery", JSON.stringify(this.students));
};

Picker.prototype.set_chosen_names = function()
{
    for (var i = 0, l = this.blacklist.length; i < l; ++i) {
        var option = document.createElement("option");
        var fullname = "";

        for (var j = 0, ll = this.fields.length; j < ll; ++j)
            fullname += this.students.cells[this.blacklist[i]][this.fields[j]] + " ";

        option.innerHTML = fullname;
        option.id = i;

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

    this.update_storage();
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

    var fullname = "";

    for (var j = 0, l = this.fields.length; j < l; ++j)
        fullname += student[this.fields[j]] + " ";

    this.chosen_names.push(fullname);

    option.innerHTML = fullname;
    option.id        = randint;

    this.chosen_name_elm.innerHTML = fullname;
    this.chosen_sound.currentTime = 0;
    this.chosen_sound.play();

    this.chosen_name.classList.add("shake");
    clearTimeout(this.chosen_timeout);
    this.chosen_timeout = setTimeout(function(){
        this.chosen_name.classList.remove("shake");
    }.bind(this), 500);

    this.chosen_names_elm.insertBefore(
        option,
        document.querySelector("#pickery_chosen_names > option:first-of-type")
    );

    this.update_storage();
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
    localStorage.removeItem("pickery_fields");

    this.students = [];
    this.all_names_elm.innerHTML = "";
    this.fields = "";
};

Picker.prototype.clear_all = function()
{
    this.clear_history();
    this.clear_students();
};
