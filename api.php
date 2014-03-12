<?php

require 'config.php';

/* Parametros */
if (isset($_GET['id']) && intval($_GET['id'])) {
  /* recibir variables por medio de GET */
  $id = $_GET['id'];
  $format = 'json'; //tipo de formato que devuelve es JSON
  /* consulta a la tabla comida dependiendo del id del usuario */
  $sql = "SELECT *,(SELECT COUNT(*) FROM registros r WHERE r.id_signal = s.id ) AS cantidad 
          FROM signals s
          WHERE id='$id'
          ORDER BY cantidad DESC";

  $cantidad = $DB->Execute($sql);
  /* salida de datos en formato json */
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

if (isset($_POST['context'])) {

  if ($_POST['context'] == "gpsdata") {

    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $tiempo = $_POST['tiempo'];
    $pre = $_POST['precision'];
    $pro = $_POST['proveedor'];
    $sessionId = $_POST['sessionId'];
    $insetaData = $DB->Execute("INSERT INTO gpsdata (lat,lng,tiempo,accuracy,proveedor,sessionId) values ('$lat','$lng','$tiempo','$pre','$pro','$sessionId')");

    if (!$insetaData) {
      echo $DB->ErrorMsg();
    } else {
      echo "sent";
    }
  }
  exit();
}
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

$sessiones = $DB->Execute("SELECT sessionId FROM gpsdata group by sessionId");
$totalCoor = $DB->GetOne("SELECT max(idgpsdata) FROM gpsdata");


$smarty->assign("sessiones",$sessiones,true);
$smarty->assign("totalCoor",$totalCoor,true);
$smarty->display('api.tpl');
?>