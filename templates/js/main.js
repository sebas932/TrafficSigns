var regSeleccionados,
    registros = [],
    map,
    contador = 0,
    geocoder;

$(document).ready(function() {

  $("#signals ul li").click(function(e) {
    regSeleccionados = [];
    $(this).toggleClass("seleccionado");
    $(".seleccionado").each(function(index, value) {
      var id = value.id.split("-")[1];
      regSeleccionados.push(id);
    });

    $.ajax({
      type: "POST",
      dataType: "json",
      url: "ajax/json.php",
      data: {context: "registros",
        regs: regSeleccionados.join()},
      beforeSend: function() {
        loaderStart();
        borraMarkers(registros);
      },
      success: function(data) {
        $.each(data, function(index, value) {
          creaMarker(value);
        });
        loaderStop();
      }

    });

  });

  function loaderStop() {
    $("#ajax-loader").fadeOut(150);
  }
  function loaderStart() {
    $("#ajax-loader").show();
  }
  
});
function loadMap() {
  geocoder = new google.maps.Geocoder();
  var style = [
    {
      stylers: [
        {hue: "#00ffe6"},
        {saturation: -20}
      ]
    }, {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {lightness: 100},
        {visibility: "simplified"}
      ]
    }, {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {visibility: "off"}
      ]
    }
  ];
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(3.4180687, -76.5204083),
    zoom: 13, 
    mapTypeId: 'roadmap',
    styles: style
  }); 
}
function creaMarker(data) { 
  var html;
  var address;
  var point = new google.maps.LatLng(data.geometry.coordinates[1], data.geometry.coordinates[0]);
  var marker = new google.maps.Marker({
    map: map,
    position: point,
    icon:   'templates/imagenes/signals25/' + data.id_signal + '.png' 
  }); 
  geocoder.geocode({'latLng': point}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) { 
        address= results[0].formatted_address;
      }else{
        address= "No hay datos";
      } 
    }  
    //console.log("results[0]"+address);
    html = "<strong>" + data.nombresignal + " #"+ data.id+"</strong> <br/>"+address+" <br/>" + data.clasificacion;
    var infoWindow = new google.maps.InfoWindow;
    bindInfoWindow(marker, map, infoWindow, html);
  }); 
  registros.push(marker);
}
function borraMarkers(registros) { 
  for (var i = 0; i < registros.length; i++) { 
    //registros[i].infoWindow.setMap(null);
    registros[i].infoWindow = null; //this one is not necessary I think nut won't hurt
    registros[i].setMap(null);
  }
  registros.length=0; 
}
function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}



