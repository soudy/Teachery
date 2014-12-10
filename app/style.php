<?php
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
