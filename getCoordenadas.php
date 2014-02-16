<?php
include("config.php"); 
$xml=simplexml_load_file("http://ubicandote.com/2013/xml_maps.php"); 
foreach($xml->children() as $child)
  {
  $lat	= $child['lat'];
  $lng	= $child['lng']; 
  $tiempo = time(); 
  $pre= "30"; 
  $idSignal= rand(1,51);
  //mysql_query("INSERT INTO registros (lat,lng,tiempo,pre,id_signal) values ('$lat','$lng','$tiempo','$pre','$idSignal')");
  echo "INSERT INTO registros (lat,lng,tiempo,pre,id_signal) values ('$lat','$lng','$tiempo','$pre','$idSignal')<br>";
  }
?>