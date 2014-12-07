<?php 

$rt = isset($_GET["rt"]) ? $_GET["rt"] : 'time';

?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Teachery</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
    <script src="js/timer.js"></script>
    <script src="js/render.js"></script>
    <script src="js/clock.js"></script>
    <script src="js/main.js"></script>
</head>
<body> 
    <!-- This is where the navigation resires. -->
    <nav>
        <a class="<?php echo ($rt=="time") ? 'active' : ''; ?>" href="?rt=time"><i class="icon ion-clock"></i></a>
        <a class="<?php echo ($rt=="") ? 'active' : ''; ?>" href="#2"><i class="icon ion-person"></i></a>
        <a class="<?php echo ($rt=="") ? 'active' : ''; ?>" href="#3"><i class="icon ion-person-stalker"></i></div></a> 
        <a class="<?php echo ($rt=="") ? 'active' : ''; ?>" href="#4"><i class="icon ion-calendar"></i></a>
        <a class="<?php echo ($rt=="settings") ? 'active' : ''; ?>" href="?rt=settings"><i class="icon ion-gear-b"></i></a>
    </nav>
    <?php 
    switch($rt){
        case 'time':
            include('views/time.php');
            break;
        case 'settings':
            include('views/settings.php');
            break;
    }
    ?>
</body>
</html>
