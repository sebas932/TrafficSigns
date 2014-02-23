<?php include("../config.php");
$context = isset($_POST["context"]) ? $_POST["context"] : null;
if ($context == "registros") {
  $regs = $_POST["regs"];
  $rows = array();
  if (!$regs == "") {
    $registros = $DB->Execute("SELECT r.*, s.nombre as nombresignal, c.nombre as clasificacion
                                FROM registros r
                                INNER JOIN signals s ON r.id_signal = s.id
                                INNER JOIN clasificacion c ON s.clasificacion = c.idclasificacion 
                                WHERE r.id_signal IN ($regs)
                                ORDER BY id DESC");
    
    foreach ($registros as $registro) {
      $rows[] = $registro;
    } 
  }
  print json_encode($rows);
}
?>