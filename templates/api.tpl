{include file="header.tpl" title="Reconocimiento y Geo-Posicionamiento de señales de tránsito - Estadisticas " s="api"}

<br>
<div id="contenedor">  

  API
  <br>
  <br>
  <strong>GPS DATA SHARED</strong>  <br>
  <input  type="text" id="tmin" value="0"> a <input  type="text" id="tmax" value="{$totalCoor}"> : <input  type="button" id="tbutton" value="Cargar"> 
   
  <select id="sessiones"> 
    {foreach $sessiones as $session} 
    <option value="{$session.sessionId} ">{$session.sessionId} </option>
    {/foreach}
  </select>
  <div id="map"></div> 
  
  <div id="text"></div>  

</div>
<br>

{include file="footer.tpl"}
