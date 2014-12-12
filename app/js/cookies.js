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

function Cookies()
{
    this.create = function(name, value)
    {
        document.cookie = name+"="+value+";expires=Mon, 1 Jan 2020 00:00:00 UTC;";
    }

    this.remove = function(name)
    {
        document.cookie = name+"=;expires=Thu, 01 Jan 1990 00:00:01 GMT;";
    }

    this.get = function(name)
    {
        var regex = new RegExp("(?:^"+name+"|;\ *"+name+")=(.*?)(?:;|$)", "g");
        var result = regex.exec(document.cookie);
        return result ? result[1] : null;
    }
}
