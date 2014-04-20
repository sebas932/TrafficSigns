<?php

require 'config.php';

/* ------------------------------------------------------------------ */
/*                              POST                                  */
/* ------------------------------------------------------------------ */

if (isset($_POST['context'])) {
  //Inserta una localizacion a la base de datos
  if ($_POST['context'] == "gpsdata") {
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $tiempo = $_POST['tiempo'];
    $pre = $_POST['precision'];
    $pro = $_POST['proveedor'];
    $sessionId = $_POST['sessionId'];
    $insetaData = $DB->Execute("INSERT INTO gpsdata (lat,lng,tiempo,accuracy,proveedor,sessionId) values ('$lat','$lng','$tiempo','$pre','$pro','$sessionId')");
  }
  //Inserta un registro a la base de datos
  if ($_POST['context'] == "registro") {
    $idgps = $DB->GetOne("SELECT idgpsdata FROM gpsdata order by idgpsdata desc limit 1");
    $idSignal = $_POST['id_signal']; 
    $insetaData = $DB->Execute("INSERT INTO registros (idgpsdata,id_signal) values ('$idgps','$idSignal')");
  }
  if (!$insetaData) { echo $DB->ErrorMsg(); } else { echo "sent"; }
  exit();
}

/* ------------------------------------------------------------------ */
/*                              GET                                   */
/* ------------------------------------------------------------------ */
// Obtiene una lista de puntos dependiendo de un limite minimo y maximo
if ($_GET['sse'] == "gpsdata") {
  header('Content-Type: text/event-stream');
  header('Cache-Control: no-cache');

  $lastpoint = $DB->GetRow("SELECT * FROM gpsdata order by idgpsdata desc limit 0,1");
  echo 'data: {"count": ' . $lastpoint[idgpsdata] . ', "lat": ' . $lastpoint[lat] . ', "lng": ' . $lastpoint[lng] . '}';
  echo "\n\n";
  flush();
  exit();
}

// Obtiene una lista de puntos dependiendo de un limite minimo y maximo
if ($_GET['gpsdata'] == "range") {
  $min = $_GET['min'];
  $max = $_GET['max'];
  $sql = "SELECT * FROM guybrush_tesis.gpsdata order by idgpsdata desc limit $min,$max";
  $datas = $DB->Execute($sql);
  /* salida de datos en formato json */
  $gpsData = array();
  foreach ($datas as $data) {
    $gpsData[] = array(
        "id" => $data[idgpsdata],
        "tiempo" => date('F j, Y, g:i a', ((double) $data[tiempo])),
        "pre" => $data[accuracy],
        "proveedor" => $data[proveedor],
        "geometry" => array("type" => "Point",
            "coordinates" => [(float) $data[lng], (float) $data[lat]]
        ),
    );
  }
  print json_encode($gpsData);
  exit();
}
// Obtiene una lista de coordenadas dependiendo de el ID de session
if ($_GET['gpsdata'] == "session") {
  $session = $_GET['session'];
  $sql = "SELECT * FROM gpsdata where sessionId = $session";
  $datas = $DB->Execute($sql);
  /* salida de datos en formato json */
  $gpsData = array();
  foreach ($datas as $data) {
    $gpsData[] = array(
        "id" => $data[idgpsdata],
        "tiempo" => date('F j, Y, g:i a', ((double) $data[tiempo])),
        "pre" => $data[accuracy],
        "proveedor" => $data[proveedor],
        "geometry" => array("type" => "Point",
            "coordinates" => [(float) $data[lng], (float) $data[lat]]
        ),
    );
  }
  print json_encode($gpsData);
  exit();
}
//Obtiene la informacion y el numero total de registros que hay de la señal
if (isset($_GET['id']) && intval($_GET['id'])) {
  $id = $_GET['id'];
  $format = 'json';
  $sql = "SELECT *,(SELECT COUNT(*) FROM registros r WHERE r.id_signal = s.id ) AS cantidad 
          FROM signals s
          WHERE id='$id'
          ORDER BY cantidad DESC";
  $cantidad = $DB->Execute($sql);
  if ($format == 'json') {
    header('Content-type: application/json');
    $rows = array();
    foreach ($cantidad as $cantidad) {
      $rows[] = $cantidad;
    }
    print json_encode($rows);
  }
  exit();
}



$sessiones = $DB->Execute("SELECT sessionId FROM gpsdata group by sessionId");
$totalCoor = $DB->GetOne("SELECT max(idgpsdata) FROM gpsdata");
$lastpoint = $DB->GetOne("SELECT idgpsdata FROM gpsdata order by idgpsdata desc limit 0,1");

$smarty->assign("sessiones", $sessiones, true);
$smarty->assign("totalCoor", $totalCoor, true);
$smarty->assign("lastpoint", $lastpoint, true);
$smarty->display('api.tpl');
?>