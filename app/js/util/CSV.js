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

var CSV = {
    to_json_magister: function(csv)
    {
        csv = csv.replace("\r", "");

        var cells   = [];
        var columns = csv.split("\n");
        var titles  = columns[0].split(",");

        for (var i = 1, l = columns.length - 1; i < l; ++i) {
            var student = [];
            var row     = columns[i].split(",");

            for (var j = 0, ll = row.length; j < ll; ++j)
                student.push(row[j]);

            cells.push(student);
        }

        return {
            titles : titles,
            cells  : cells
        };
    },

    to_json: function(csv)
    {
        csv = csv.replace("\r", "");
        csv = csv.split("\n");

        var entries = csv.join(",").split(",");

        // Remove last element as it will always be an empty string becausse of
        // joining with ","
        entries.splice((entries.length - 1), 1);

        return {
            cells: entries
        };
    }
};
