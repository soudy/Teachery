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
    this.groups = [];

    if (store.get("groupery_groups"))
        this.groups = store.get("groupery_groups").split(",");

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

    // don't want to save too much
    if (this.student_count > 200) {
        new Notification("Due to the large number of imported names, these names won't be saved.",
                "warning", 3000);
        return false;
    }


    // set and show amount of names imported
    document.querySelector("#groupery_students").innerHTML = "Count: " + this.student_count;

    // delete a name
    this.delete_name = function()
    {
        var selected = document.querySelector("#groupery_all_names").value;
        var selected_id = document.getElementById(selected);

        if (!selected) {
            new Notification("Nothing to remove.", "normal", 2500);
            return false;
        }

        delete students[selected];
        selected_id.parentElement.removeChild(selected_id);

        // update count
        this.student_count--;
        document.querySelector("#groupery_students").innerHTML = "Count: " + this.student_count;

        // update storage with deleted user
        store.set("groupery", JSON.stringify(students));
    };

    this.clear_all = function()
    {
        store.remove("groupery");
        students = [];
        document.querySelector("#groupery_all_names").innerHTML = "";
        document.querySelector("#groupery_students").innerHTML = "";
    };

    this.generate_groups = function()
    {
    };
}
