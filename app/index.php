<html>
<head>
    <meta charset="UTF-8">
    <title>Teachery</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.php" id="stylesheet">
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
    <script type="text/javascript" src="js/cookies.js"></script>
    <script type="text/javascript" src="js/notification.js"></script>
    <script type="text/javascript" src="js/confirm.js"></script>
    <script type="text/javascript" src="js/timer.js"></script>
    <script type="text/javascript" src="js/render.js"></script>
    <script type="text/javascript" src="js/clock.js"></script>
    <script type="text/javascript" src="js/picker.js"></script>
    <style type="text/css" media="all">
        @-webkit-keyframes shake {
          0%, 100% {
            -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
          }

          10%, 30%, 50%, 70%, 90% {
            -webkit-transform: translate3d(-3px, 0, 0);
                    transform: translate3d(-3px, 0, 0);
          }

          20%, 40%, 60%, 80% {
            -webkit-transform: translate3d(3px, 0, 0);
                    transform: translate3d(3px, 0, 0);
          }
        }

        @keyframes shake {
          0%, 100% {
            -webkit-transform: translate3d(0, 0, 0);
                    transform: translate3d(0, 0, 0);
          }

          10%, 30%, 50%, 70%, 90% {
            -webkit-transform: translate3d(-3px, 0, 0);
                    transform: translate3d(-3px, 0, 0);
          }

          20%, 40%, 60%, 80% {
            -webkit-transform: translate3d(3px, 0, 0);
                    transform: translate3d(3px, 0, 0);
          }
        }

        .shake {
          -webkit-animation: shake .5s;
                  animation: shake .5s;
        }
    </style>
</head>
<body>
    <div class="cookie"></div>

    <!-- This is where the navigation resires. -->
    <nav>
        <a id="home_menu" class="menu" href="#home"><i class="icon ion-home"></i></a>
        <a id="timery_menu" class="menu" href="#timery"><i class="icon ion-clock"></i></a>
        <a id="pickery_menu" class="menu" href="#pickery"><i class="icon ion-person"></i></a>
        <!--<a id="groupery_menu" class="menu" href="#groupery"><i class="icon ion-group"></i></a>-->
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

    <script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/timery.js"></script>
    <script type="text/javascript" src="js/settings.js"></script>
    <script type="text/javascript" src="js/pickery.js"></script>
    <!--<script type="text/javascript" src="js/groupery.js"></script>-->
</body>
</html>
