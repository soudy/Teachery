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
    this.students      = students;
    this.student_count = 0;
    this.blacklist     = [];

    this.chosen_names = document.querySelector("#pickery_chosen_names");
    this.all_names    = document.querySelector("#pickery_all_names");

    if (localStorage.getItem("pickery_blacklist"))
        this.blacklist = localStorage.getItem("pickery_blacklist");

    if (this.student_count > 1000) {
        new Notification("The maximum amount of importable names is 1000.",
                         "warning", 3000);
        return false;
    }
};

Picker.prototype.set_students = function ()
{
    for (var student in this.students) {
        this.student_count++;

        var option       = document.createElement('option');
        var fullname     = this.students[student].Roepnaam + " " +
                           this.students[student].Tussenv +
                           (this.students[student].Tussenv === "" ? "" : " " ) +
                           this.students[student].Achternaam;

        for (var filtered in this.blacklist) {
            if (this.students[student].Stamnr == this.blacklist[filtered]) {

                option.value = 'student' + this.students[student].Stamnr;
                option.id    = 'student' + this.students[student].Stamnr;
                option.innerHTML = fullname;

                this.chosen_names.appendChild(option);

                continue;
            }
        }

        option.value = 'students' + this.students[student].Stamnr;
        option.id    = 'students' + this.students[student].Stamnr;
        option.innerHTML = fullname;

        this.all_names.appendChild(option);
    }

    document.querySelector("#pickery_students").innerHTML = "Count: " + this.student_count;
};


Picker.prototype.delete_name = function()
{
    var selected    = this.all_names.value;
    var selected_id = document.getElementById(selected);

    if (!selected) {
        new Notification("No name selected.", "normal", 2500);
        return false;
    }

    delete this.students[selected];
    selected_id.parentElement.removeChild(selected_id);

    // update count
    this.student_count--;
    document.querySelector("#pickery_students").innerHTML = "Count: " + this.student_count;

    // update storage with deleted user
    localStorage.setItem("pickery", JSON.stringify(this.students));
};

Picker.prototype.clear_history = function()
{
    localStorage.removeItem("pickery_blacklist");
    this.chosen_names.innerHTML = "";
    this.blacklist = [];
};

Picker.prototype.clear_students = function()
{
    localStorage.removeItem("pickery");
    this.students = [];
    document.querySelector("#pickery_random").innerHTML = "";
    document.querySelector("#pickery_all_names").innerHTML = "";
    document.querySelector("#pickery_students").innerHTML = "";
};

Picker.prototype.clear_all = function()
{
    this.clear_history();
    this.clear_students();
};

Picker.prototype.random_name = function()
{
    var allow_duplicates = document.querySelector("#allow_duplicates");
    var random = document.querySelector("#pickery_random");
    var keys = Object.keys(this.students);
    var random_key;

    if (!allow_duplicates.checked)
        for (var filtered in this.blacklist)
            for (var key in keys)
                if (keys[key] === "student" + this.blacklist[filtered])
                    keys.splice(key, 1);

    random_key = keys[Math.floor(Math.random() * keys.length)];

    if (!this.students[random_key]) {
        new Notification("You've looped through all names.", "normal", 2000);
        return false;
    }

    var fullname =
          this.students[random_key].Roepnaam + " " +
          this.students[random_key].Tussenv +
         (this.students[random_key].Tussenv === "" ? "" : " " ) +
          this.students[random_key].Achternaam;

    if (!allow_duplicates.checked) {
        this.blacklist[this.blacklist.length] = this.students[random_key].Stamnr;

        localStorage.setItem("pickery_blacklist", this.blacklist);
    }

    random.innerHTML = fullname;

    var option = document.createElement('option');

    option.value = this.students[random_key].Stamnr;
    option.id = this.students[random_key].Stamnr;
    option.innerHTML = fullname;

    this.chosen_names.appendChild(option);
};
