<?php
require 'config.php'; 

$signals = $DB->Execute("SELECT s.*
                        ,(SELECT COUNT(*) FROM registros r WHERE r.id_signal = s.id ) AS cantidad 
                        ,c.nombre as nclasificacion
                        FROM signals s
                        INNER JOIN clasificacion c ON s.clasificacion = c.idclasificacion 
                        ORDER BY cantidad DESC"); 
 
$smarty->assign("signals",$signals,true); 
$smarty->display('estadisticas.tpl');
