<html>
<head>
    <meta charset="UTF-8">
    <title>Teachery</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="img/favicon.ico" />
    <link rel="stylesheet" href="//code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
    <link rel="stylesheet" href="css/style.php" id="stylesheet">
    <link rel="stylesheet" href="css/shake.css">
    <script type="text/javascript" src="js/util/cookies.js"></script>
    <script type="text/javascript" src="js/util/confirm.js"></script>
    <script type="text/javascript" src="js/util/render.js"></script>
    <script type="text/javascript" src="js/util/CSV.js"></script>
    <script type="text/javascript" src="js/models/notification.js"></script>
    <script type="text/javascript" src="js/models/timer.js"></script>
    <script type="text/javascript" src="js/models/clock.js"></script>
    <script type="text/javascript" src="js/models/picker.js"></script>
    <script type="text/javascript" src="js/models/grouper.js"></script>
</head>
<body>
    <div class="nostyle">Loading stylesheet..</div>
    <div class="cookie"></div>

    <!-- This is where the navigation resires. -->
    <nav>
        <a id="home_menu" class="menu" href="#home"><i class="icon ion-home"></i></a>
        <a id="timery_menu" class="menu" href="#timery"><i class="icon ion-clock"></i></a>
        <a id="pickery_menu" class="menu" href="#pickery"><i class="icon ion-person"></i></a>
        <a id="groupery_menu" class="menu" href="#groupery"><i class="icon ion-person-stalker"></i></a>
        <a id="settings_menu" class="menu" href="#settings"><i class="icon ion-gear-b"></i></a>
    </nav>

    <div class=navlay></div>

    <noscript>
         For full functionality of this site it is necessary to enable JavaScript.
         Here are the <a href="http://www.enable-javascript.com/" target="_blank">
         instructions how to enable JavaScript in your web browser</a>.
    </noscript>

    <div id="home" class="page">
        <?php include('views/home.php'); ?>
    </div>
    <div id="timery" class="page">
        <?php include('views/time.php'); ?>
    </div>
    <div id="pickery" class="page">
        <?php include('views/picker.php'); ?>
    </div>

    <div id="groupery"  class="page">
        <?php include('views/grouper.php'); ?>
    </div>
    <div id="settings"  class="page">
        <?php include('views/settings.php'); ?>
    </div>

    <div id="notlist"></div>

    <script type="text/javascript" src="js/view/timery.js"></script>
    <script type="text/javascript" src="js/view/settings.js"></script>
    <script type="text/javascript" src="js/view/pickery.js"></script>
    <script type="text/javascript" src="js/view/groupery.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>
