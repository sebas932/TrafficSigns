<?php 
	include("config.php"); 
	if(!$_POST) { 
		header("Content-type: text/xml");  
		$registros = $DB->Execute("SELECT * FROM registros WHERE 1");  

        echo '<?xml version="1.0" encoding="utf-8"?>'; ?>
		<feed xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
		      xmlns:gml="http://www.opengis.net/gml">
		   <title>Señales de transito reglamentarias</title>
		   <subtitle>Señales de transito reglamentarias</subtitle>
		   <link href="http://guybrush.info/tesis"/>
		    
		   <author>
		      <name>Sebastian Amariles</name>
		      <email>sebastian@talessoft.co</email>
		   </author> 

		    <?php  foreach($registros as $registro) {   ?>
		    <registro>
		       
		      <id><?php echo $registro['id'] ?></id>
		      <precision><?php echo $registro['pre'] ?></precision> 
		      <tiempo><?php echo date("Y/m/d H:i:s", $registro['tiempo']) ?></tiempo>
		      <geo:lat><?php echo $registro['lat'] ?></geo:lat>
                      <geo:long><?php echo $registro['lng'] ?></geo:long>
                      <signal><?php echo $registro['id_signal'] ?></signal>
		    </registro>
         	
        	<?php  } ?>
		</feed>
<?php 		
	}else{
	$lat	= $_POST['lat'];
	$lng	= $_POST['lng']; 
	$tiempo	= $_POST['tiempo']; 
	$pre= $_POST['precision']; 
        $idSignal= $_POST['id_signal']; 
	$DB->Execute("INSERT INTO registros (lat,lng,tiempo,pre,id_signal) values ('$lat','$lng','$tiempo','$pre','$idSignal')");
        
        
	} 
?>