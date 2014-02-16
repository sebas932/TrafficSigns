<?php
require 'config.php'; 

/* Parametros */
if(isset($_GET['id']) && intval($_GET['id'])) {

               /* recibir variables por medio de GET */ 
               $id = $_GET['id'];
               $format = 'json'; //tipo de formato que devuelve es JSON

               /* consulta a la tabla comida dependiendo del id del usuario */

               $sql = 	"SELECT *
						,(SELECT COUNT(*) FROM registros r WHERE r.id_signal = s.id ) AS cantidad 
						FROM signals s
						WHERE id='$id'
						ORDER BY cantidad DESC";

               $cantidad = $DB->Execute($sql);  
               /* salida de datos en formato json */
               if($format == 'json') {
                               	header('Content-type: application/json');
                                $rows = array();
								foreach($cantidad as $cantidad) { 
								    $rows[] = $cantidad;
								}
								  print json_encode($rows);
								
               }

}

 
$smarty->display('api.tpl');
?>