var registros = [],
    map,
    geocoder;
    
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

function creaTrayecto(data,color) { 
  var Path = new google.maps.Polyline({
    path: data,
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 0.9,
    strokeWeight: 3
  });
  Path.setMap(map);
   
}


