<?php 

//setcookie("BASECOLOR", '#ff00ff', time()+60);

$content = file_get_contents('style.css');

// ICON_COLOR: #F2F2F2;
// BACKGROUND: #821031;
// TEXT_COLOR: #191919; 
$colors = array(
    array('#821031', 'BASECOLOR'),
    array('#F2F2F2', 'ICON_COLOR'),
    array('#191919', 'TEXT_COLOR'),
);

foreach ($colors as $value) {
    if (isset($_COOKIE[$value[1]])){
        $content = str_replace($value[0], $_COOKIE[$value[1]], $content);
    }
}

echo $content;

 ?>