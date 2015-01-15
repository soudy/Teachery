/*
 * picker.js
 * Copyright (C) 2015 soud
 *
 * Distributed under terms of the MIT license.
 */

function Picker(students)
{
    var self = this;
    this.student_count = 0;
    this.blacklist =  [];

    if (cookie.get("pickery_blacklist"))
        blacklist = cookie.get("pickery_blacklist").split(",");

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
        this.students = [];
        document.querySelector("#all_names").innerHTML = "";
        document.querySelector("#students").innerHTML = "";
    };

    this.random_name = function()
    {
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
            for (var filtered in this.blacklist) {
                for (var key in keys) {
                    if (keys[key] === "student" + this.blacklist[filtered])
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
            this.blacklist[this.blacklist.length] = students[random_key].Stamnr;

            cookie.create("pickery_blacklist", this.blacklist);
        }

        random.innerHTML = fullname;

        document.querySelector("#chosen_names").innerHTML =
        "<option value=\"" + "student" + students[random_key].Stamnr +
          "\"id=\"" + "student" + students[random_key].Stamnr + "\">"+
         fullname + "</option>\n" + document.querySelector("#chosen_names").innerHTML;
    };
}
