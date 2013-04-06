<!doctype html>
<html ng-app="app">
<head>
  <meta charset="utf-8">
  <title>Spike</title>

    <script src="lib/angular/angular.js"></script>
    <script src="lib/angular/angular-resource.js"></script>
    <script src="lib/angular/angular-ui.min.js"></script>
    <script src="lib/ui-bootstrap/ui-bootstrap-tpls-0.2.0.js"></script>

    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/app.css"/>
<!--    <link rel="stylesheet" href="css/appp.css"/>-->
    <link rel="stylesheet" href="css/basic-elements.css"/>

    <!-- jQuery -->
    <script src="lib/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="lib/jquery/jquery-ui.min.js" type="text/javascript"></script>
    <!-- Wijmo CSS and script -->
    <link href="lib/wijmo/themes/cobalt/jquery-wijmo.css" rel="stylesheet" title="metro-jqueryui" type="text/css" />
    <link href="lib/wijmo/jquery.wijmo-complete.all.2.3.2.min.css" rel="stylesheet" type="text/css" />

    <script src="lib/wijmo/jquery.wijmo-open.all.2.3.2.min.js" type="text/javascript"></script>
    <script src="lib/wijmo/jquery.wijmo-complete.all.2.3.2.min.js" type="text/javascript"></script>

    <script src="lib/wijmo/angular.wijmo.js" type="text/javascript"></script>

</head>
<body ng-controller="trainTron">


<?php

include_once('php/templates/traintron.php');

?>


  <script src="js/app.js"></script>

  <script src="js/services.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/filters.js"></script>
  <script src="js/directives.js"></script>


</body>
</html>
