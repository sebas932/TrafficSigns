<?php
setlocale(LC_ALL,"es_ES");
error_reporting(E_ALL & ~ E_NOTICE);
//error_reporting(E_ALL);
//
//database variables
if ($_SERVER['HTTP_HOST']=='localhost')
  $server = 'guybrush.info';
else
  $server = 'localhost';

$user = 'admin';
$pwd = '';
$db = 'database'; 

include('libs/adodb5/adodb.inc.php');
$DB = NewADOConnection('mysqli');
$DB->Connect($server, $user, $pwd, $db);
 	
require 'libs/Smarty-3.1.16/Smarty.class.php'; 
$smarty = new Smarty; 
//$smarty->force_compile = true;
$smarty->debugging = true;
$smarty->caching = true;
$smarty->cache_lifetime = 120;
?>