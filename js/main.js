var regSeleccionados;
var registros = [];
var map;

$(document).ready(function() {

  $("#signals ul li").click(function(e) {
    regSeleccionados = [];
    $(this).toggleClass("seleccionado");
    $(".seleccionado").each(function(index, value) {
      var id = $(value).attr("id").split("-")[1];
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
    zoom: 14,
    mapTypeId: 'roadmap',
    styles: style
  });
}
function creaMarker(data) {
  var html = "<b>" + data.nombresignal + " #"+ data.id+"</b> <br/>" + data.clasificacion;
  var point = new google.maps.LatLng(parseFloat(data.lat), parseFloat(data.lng));
  var marker = new google.maps.Marker({
    map: map,
    position: point,
    icon:   'imagenes/signals25/' + data.id_signal + '.png',
    shadow: 'imagenes/signals25/sh.png'
  });
  var infoWindow = new google.maps.InfoWindow;
  bindInfoWindow(marker, map, infoWindow, html);
  registros.push(marker);
}
function borraMarkers(registros) {
  for (var i = 0; i < registros.length; i++) {
    registros[i].setMap(null);
  }
  registros = []; 
}
function bindInfoWindow(marker, map, infoWindow, html) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}

