{include file="header.tpl" title="Reconocimiento y Geo-Posicionamiento de señales de tránsito - Home " s="home"}
<div id="contenedor">
  <div id="tool-header"> Reconocimiento y Geo-Posicionamiento de señales de tránsito </div> 
  <div id="tool">
    <div id="map"></div> 
    <div id="signals"> 
      <ul>
         {foreach $signals as $signal}
        <li id="signal-{$signal.id}"><img src="templates/imagenes/signals85/{$signal.id}.png"><div> {$signal.nombre} </div></li>
         {/foreach}
      </ul>
    </div>
    <div id="ajax-loader"></div>
  </div>
</div>
<br>
<div id="contenedor" class="ultimos-registros">  
  <div id="registros" class="box">
    <h3>Ultimos registros</h3>
    <table class="pure-table pure-table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Precision</th> 
          <th>(ID) Señal</th>
          <th>Clasificacion</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        {foreach $registros as $registro}
        <tr>
          <td>{$registro.id}</td>
          <td>{$registro.lat}</td>
          <td>{$registro.lng}</td>
          <td>{$registro.pre}</td>
          <td><img src="templates/imagenes/signals25/{$registro.id_signal}.png"> ({$registro.id_signal}) {$registro.nombresignal} </td>
          <td>{$registro.clasificacion}</td>
          <td>{$registro.tiempo|date_format}</td>
        </tr>
        {/foreach}
      </tbody>
    </table>
  </div>
</div>
<br>

{include file="footer.tpl"}
