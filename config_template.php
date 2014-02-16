<?php
setlocale(LC_ALL,"es_ES");
error_reporting(E_ALL & ~ E_NOTICE); 
if ($_SERVER['HTTP_HOST']=='localhost')
  $server = 'guybrush.info';
else
  $server = 'localhost';

$user = 'root';
$pwd = '';
$db = 'database'; 

include('libs/adodb5/adodb.inc.php');
$DB = NewADOConnection('mysqli');
$DB->Connect($server, $user, $pwd, $db);
 	

?>