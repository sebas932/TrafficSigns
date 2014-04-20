{include file="header.tpl" title="Reconocimiento y Geo-Posicionamiento de señales de tránsito - Estadisticas " s="api"}
<script>
  var lastpoint = {$lastpoint}; 
</script>
<br>
<div id="contenedor">  

  API
  <br>
  <br>
  <strong>GPS DATA SHARED</strong>  <br>
  Rangos :<input  type="text" id="tmin" value="0"> a <input  type="text" id="tmax" value="{$totalCoor}"> : <input  type="button" id="tbutton" value="Cargar"> <br>
  SessionID :  
  <select id="sessiones"> 
    {foreach $sessiones as $session} 
    <option value="{$session.sessionId} ">{$session.sessionId} </option>
    {/foreach}
  </select>
  <div id="map"></div> 
  Notificaciones en tiempo real: ON <input type="radio" id="on" name="realtime" value="on" checked="true"/> OFF <input type="radio" id="off" name="realtime" value="off"/>
  <div id="text"></div>  

</div>
<br>

{include file="footer.tpl"}
