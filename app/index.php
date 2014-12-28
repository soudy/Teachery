<?php

$rt = isset($_GET["rt"]) ? $_GET["rt"] : 'home';

?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Teachery</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.php">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
    <script type="text/javascript" src="js/cookies.js"></script>
    <script type="text/javascript" >
        var rt = "<?php echo $rt ?>";
        var cookie = new Cookies();
    </script>
    <script type="text/javascript" src="js/confirm.js"></script>
    <script type="text/javascript" src="js/timer.js"></script>
    <script type="text/javascript" src="js/render.js"></script>
    <script type="text/javascript" src="js/clock.js"></script>
<body>
    <!-- This is where the navigation resires. -->
    <nav>
        <a class="<?= ($rt=="home") ? 'active' : ''; ?>" href="home"><i class="icon ion-home"></i></a>
        <a class="<?= ($rt=="time") ? 'active' : ''; ?>" href="time"><i class="icon ion-clock"></i></a>
        <a class="<?= ($rt=="picker") ? 'active' : ''; ?>" href="picker"><i class="icon ion-person"></i></a>
        <a class="<?= ($rt=="settings") ? 'active' : ''; ?>" href="settings"><i class="icon ion-gear-b"></i></a>
    </nav>

    <div class="cookie"></div>

    <noscript>
         For full functionality of this site it is necessary to enable JavaScript.
         Here are the <a href="http://www.enable-javascript.com/" target="_blank">
         instructions how to enable JavaScript in your web browser</a>.
    </noscript>
    <?php
    switch($rt){
        case 'home':
            include('views/home.php');
            break;
        case 'time':
            include('views/time.php');
            break;
        case 'picker':
            include('views/picker.php');
            break;
        case 'settings':
            include('views/settings.php');
            break;
    }
    ?>

    <script type="text/javascript" src="js/timery.js"></script>
    <script type="text/javascript" src="js/settings.js"></script>
    <script type="text/javascript" src="js/pickery.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>
