<?php
header("Content-type: text/css; charset: UTF-8");

$content = file_get_contents('style.css');

// ICON_COLOR: #F2F2F2;
// BACKGROUND: #821031;
// TEXT_COLOR: #191919;
$colors = array(
    array('821031', 'base_color'),
    array('F2F2F2', 'icon_color'),
    array('F2F2F2', 'background_color'),
);

foreach ($colors as $value) {
    if (isset($_COOKIE[$value[1]])){
        $content = str_replace($value[0], $_COOKIE[$value[1]], $content);
    }
}

echo $content;

 ?>
