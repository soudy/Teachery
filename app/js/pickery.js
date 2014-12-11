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

    var inputFile = document.querySelector("#class");

    function CSVtoJSON(csv)
    {
        var lines  = csv.split("\n");
          // MediaCollege Amsterdam uses the same table name twice, so I'm
          // removing the last one (which is useless anyway)
        var values = lines[0].split(",").splice(0, 7);
        var obj = {};
        var i;

        for (var item in lines) {

            lines[item] = lines[item].split(",").splice(0, 7);

            for (i = 0; i <= lines[item].length; ++i) {
                if(lines[item][i] == 0)
                    continue;
                obj[lines[item][0]] = {};
                for (i = 0; i <= values.length; ++i) {
                    if(!lines[item][i])
                        continue;
                    obj[lines[item][0]][values[i]] = lines[item][i];
                }
            }
        }
        return obj;
    }

    if (!window.FileReader) {
        document.querySelector("#uploadcsv").innerHTML =
        "Your browser does not support window.FileReader. Uploading files will not be possible.";
        return false;
    }

    // get the contents of the uploaded csv
    inputFile.addEventListener("change", function (e) {
        var file = this.files[0];
        var contents;

        if(file.size > 100000) {
            alert("File size too large.");
            return false;
        }

        if (!file) {
            alert("Please select a file.");
            return false;
        }

        var r = new FileReader();

        r.readAsText(file);

        r.onload = function(e) {
            console.log(CSVtoJSON(this.result));
        };
    }, false);
})();
