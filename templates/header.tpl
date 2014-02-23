<!DOCTYPE html >
<head>
  <title>{$title} - {$Name}</title> 
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
  <meta name="description" content="{$desc}">
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJ_Q0f4faF6uFawMDmQxmH83Y9Y57JgMU&sensor=false"></script>
  <script type="text/javascript" async src="libs/Jquery/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" async src="templates/js/main.js"></script>
  <link href="templates/css/main.css" rel="stylesheet"> 
</head> 
<body onload="loadMap()"> 
  <header>
    <nav>
      <ul>
        <a {if $s eq "home"}class="selected"{/if} href="./"><li>Home</li></a>
        <a {if $s eq "estadisticas"}class="selected"{/if} href="./estadisticas"><li>Estadisticas</li></a>
        <a {if $s eq "api"}class="selected"{/if} href="./api"><li>API</li></a>
        <a {if $s eq "sobre"}class="selected"{/if} href="./sobre"><li>Sobre</li></a>
        <a {if $s eq "contacto"}class="selected"{/if} href="./contacto"><li>Contacto</li></a>
      </ul>
    </nav>
  </header>