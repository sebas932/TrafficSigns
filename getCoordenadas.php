<?php
include("config.php"); 
$idgps = 1;
$xml=simplexml_load_file("http://ubicandote.com/2013/xml_maps.php"); 
foreach($xml->children() as $child)
  {
  $lat	= $child['lat'];
  $lng	= $child['lng']; 
  $tiempo = time(); 
  $pre= "30"; 
  $idSignal= rand(1,51);
  $idgps = $idgps+15;
  //$DB->Execute("INSERT INTO registros (id_signal,idgpsdata) values ('$idSignal','$idgps')");
  echo "INSERT INTO registros (id_signal,idgpsdata) values ('$idSignal','$idgps')<br>";
  }
?>

    
