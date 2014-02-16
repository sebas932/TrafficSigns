<?php
include("config.php");
$signals = $DB->Execute("SELECT *
                        ,(SELECT COUNT(*) FROM registros r WHERE r.id_signal = s.id ) AS cantidad 
                        FROM signals s
                        ORDER BY cantidad DESC"); 
$registros = $DB->Execute("SELECT r.*, s.nombre as nombresignal, c.nombre as clasificacion
                          FROM registros r
                          INNER JOIN signals s ON r.id_signal = s.id
                          INNER JOIN clasificacion c ON s.clasificacion = c.idclasificacion
                          ORDER BY id DESC LIMIT 0,20"); 
?>
<!DOCTYPE html >
<head>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
  <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
  <title>Tesis</title>
  <script type="text/javascript" src="libs/Jquery/jquery-1.11.0.min.js"></script>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJ_Q0f4faF6uFawMDmQxmH83Y9Y57JgMU&sensor=false"></script>
  <script type="text/javascript" src="js/main.js"></script>
  <link href="css/main.css" rel="stylesheet">

</head>

<body onload="loadMap()">
  <div id="contenedor">
    <header> Reconocimiento y Geo-Posicionamiento de señales de tránsito =)</header>
    <div id="tool">
      <div id="map"></div> 
      <div id="signals"> 
        <ul>
          <?php foreach($signals as $signal) { ?>
          <li id="signal-<?php echo $signal['id'] ?>"><img src="imagenes/signals85/<?php echo $signal['id'] ?>.png"><div> <?php echo $signal['nombre'] ?> </div></li>
          <?php  } ?>
        </ul>
      </div>
      <div id="ajax-loader"></div>
    </div>
    <div id="registros" class="box">
      <h3>Ultimos registros</h3>
      <table class="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Precision</th> 
            <th>(ID) Señal</th>
            <th>Clasificacion</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <?php  foreach($registros as $registro) { ?>
          <tr>
            <td><?php echo $registro['id'] ?></td>
            <td><?php echo $registro['lat'] ?></td>
            <td><?php echo $registro['lng'] ?></td>
            <td><?php echo $registro['pre'] ?></td>
            <td><img src="imagenes/signals25/<?php echo $registro['id_signal'] ?>.png"> ( <?php echo $registro['id_signal'] ?> )  <?php echo $registro['nombresignal'] ?></td>
            <td><?php echo $registro['clasificacion'] ?></td>
            <td><?php echo date("Y-m-d H:i:s", $registro['tiempo']) ?></td>
          </tr>
          <?php  } ?>
        </tbody>
      </table>
    </div>
    <footer> </footer> 
  </div>


</body> 
</html>