<?php
require 'config.php'; 

$signals = $DB->Execute("SELECT *
                        ,(SELECT COUNT(*) FROM registros r WHERE r.id_signal = s.id ) AS cantidad 
                        FROM signals s
                        ORDER BY cantidad DESC"); 
$registros = $DB->Execute("SELECT r.*, s.nombre as nombresignal, c.nombre as clasificacion
                          FROM registros r
                          INNER JOIN signals s ON r.id_signal = s.id
                          INNER JOIN clasificacion c ON s.clasificacion = c.idclasificacion
                          ORDER BY id DESC LIMIT 0,10"); 

$smarty->assign("signals",$signals,true);
$smarty->assign("registros",$registros,true);
$smarty->display('sobre.tpl');
