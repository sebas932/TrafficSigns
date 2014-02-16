<?php
setlocale(LC_ALL,"es_ES");
error_reporting(E_ALL & ~ E_NOTICE);
//error_reporting(E_ALL);
//
//database variables
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
$smarty->debugging = false;
$smarty->caching = true;
$smarty->cache_lifetime = 120;
?>