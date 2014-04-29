{include file="header.tpl" title="Reconocimiento y Geo-Posicionamiento de señales de tránsito - Estadisticas " s="estadisticas"}

<br>
<div id="contenedor">  

  <h2>Estadisticas</h2>
  <div id="signals-stats"> 
    <h3>Señales de transito</h3>
    <table class="pure-table pure-table-bordered">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>ID</th>
          <th>Nombre</th>
          <th>Clasificacion</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {foreach $signals as $signal}
        <tr>
          <td><img src="templates/imagenes/signals25/{$signal.id}.png"></td>
          <td>{$signal.id}</td>
          <td>{$signal.nombre}</td>
          <td>{$signal.nclasificacion}</td>
          <td>{$signal.cantidad}</td>
        </tr>
        {/foreach}
      </tbody>
    </table> 
    <div class="clear"></div>
  </div>

</div>
<br>

{include file="footer.tpl"}
