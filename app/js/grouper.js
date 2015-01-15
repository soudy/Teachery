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
    var self = this;
    this.student_count = 0;
    this.blacklist =  [];

    if (cookie.get("pickery_blacklist"))
        this.blacklist = cookie.get("pickery_blacklist").split(",");

    // can't save that much in a cookie
    if (this.student_count > 40)
        new Notification("Due to the large number of imported names, these names won't be saved.",
                         "warning", 3000);

    // set and show student count
    for (var student in students) {
        this.student_count++;
        var fullname =
              students[student].Roepnaam + " " +
              students[student].Tussenv +
              (students[student].Tussenv === "" ? "" : " " ) +
              students[student].Achternaam;

        for (var filtered in this.blacklist) {
            if (students[student].Stamnr == this.blacklist[filtered]) {
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

    // set and show amount of names imported
    document.querySelector("#students").innerHTML = "Count: " + this.student_count;


    // delete a name
    this.delete_name = function()
    {
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

    this.clear_history = function()
    {
        cookie.remove("pickery_blacklist");
        document.querySelector("#chosen_names").innerHTML = "";
        blacklist = [];
    };

    this.clear_all = function()
    {
        this.clear_history();
        cookie.remove("pickery");
        students = [];
        document.querySelector("#all_names").innerHTML = "";
        document.querySelector("#students").innerHTML = "";
    };
}
