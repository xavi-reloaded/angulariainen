<!doctype html>
<html ng-app="app">
<head>
  <meta charset="utf-8">
  <title>Spike</title>

    <script src="lib/angular/angular.js"></script>
    <script src="lib/angular/angular-resource.js"></script>
    <script src="lib/angular/angular-ui.min.js"></script>
    <script src="lib/ui-bootstrap/ui-bootstrap-tpls-0.2.0.js"></script>
    <script src="lib/ui-bootstrap/ui-bootstrap-apium.js"></script>

    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link rel="stylesheet" href="css/aula.css"/>

    <!-- jQuery -->
    <script src="lib/jquery/jquery.min.js" type="text/javascript"></script>
    <script src="lib/jquery/jquery-ui.min.js" type="text/javascript"></script>

    <link href="css/video-js.css" rel="stylesheet" type="text/css">

    <!-- LOAD VIDEO.JS SOURCE FILES IN ORDER -->
    <script type="text/javascript" src="lib/video-js/source-loader.js"></script>
    <script type="text/javascript" src="lib/pdfjs/pdf.js"></script>

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

  <script src="js/pdf_spike.js"></script>

<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>


</body>
</html>
