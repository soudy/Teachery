<?php
header("Content-type: text/css; charset: UTF-8");

$content = file_get_contents('style.css');

// BASE_COLOR: #821031;
// BACKGROUND: #F2F2F2;
// TEXT_COLOR: #000000;
$colors = array(
    array('821031', 'base_color'),
    array('F2F2F2', 'background_color'),
    array('191919', 'text_color'),
);

foreach ($colors as $value) {
    if (isset($_COOKIE[$value[1]])){
        $content = str_replace($value[0], $_COOKIE[$value[1]], $content);
    }
}

echo $content;

 ?>
