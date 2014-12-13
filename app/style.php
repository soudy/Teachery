<?php
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

header("Content-type: text/css; charset: UTF-8");

$content = file_get_contents('style.css');

// BASE_COLOR: #821031;
// BACKGROUND: #F2F2F2;
// TEXT_COLOR: #000000;
$colors = array(
    /* array('821031', 'base_color'), */
    array('214E96', 'base_color'),
    array('F2F2F2', 'background_color'),
    array('191919', 'text_color'),
);

$json = isset($_COOKIE['settings']) ? $_COOKIE['settings'] : null;
$settings = json_decode($json);

foreach ($colors as $value) {
    if(isset($settings->{$value[1]}))
        $content = str_replace($value[0], $settings->{$value[1]}, $content);
}

echo $content;

 ?>
