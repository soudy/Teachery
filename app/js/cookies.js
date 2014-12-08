/*
 * cookies.js
 * Copyright (C) 2014 soud
 *
 * Distributed under terms of the MIT license.
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
