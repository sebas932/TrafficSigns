<?php

include("../config.php");
$context = isset($_POST["context"]) ? $_POST["context"] : null;
if ($context == "registros") {
  $regs = $_POST["regs"];
  $rows = array();
  if (!$regs == "") {
    $registros = $DB->Execute("SELECT r.*, gps.lat, gps.lng , s.nombre as nombresignal, c.nombre as clasificacion
                                FROM registros r
                                INNER JOIN signals s ON r.id_signal = s.id
				INNER JOIN gpsdata gps ON r.idgpsdata = gps.idgpsdata
                                INNER JOIN clasificacion c ON s.clasificacion = c.idclasificacion 
                                WHERE r.id_signal IN ($regs)
                                ORDER BY id DESC");

    foreach ($registros as $registro) {
      //$rows[] = $registro;
      $rows[] = array(
          "id" => $registro[id], 
          "tiempo" => (double)$registro[tiempo],
          "pre" => $registro[pre],
          "id_signal" => $registro[id_signal],
          "nombresignal" => $registro[nombresignal],
          "clasificacion" => $registro[clasificacion],
          "geometry" => array("type" => "Point",
              "coordinates" => [(float)$registro[lng], (float)$registro[lat]]
          ),
      );
    }
  }
  print json_encode($rows);
}
?>