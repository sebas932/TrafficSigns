var regSeleccionados,
        contador = 0;
var trayecto = [];
var source;

$(document).ready(function() {

  if (typeof (EventSource) !== "undefined") {
    initServerSentEvents();
  } else {
    $("#text").append("Las funciones en tiempo real no son soportadas por su navegador. </br>Recomendamos usar la ultima version de Google Chrome");
  }
  // Event for server sent events (SSE) is enable/disable
  $("input[name=realtime]:radio").change(function() {
    if ($(this).val() == "on") {
      initServerSentEvents();
      console.log("on");
    } else {
      source.close();
      source = null;
      console.log("off");
    }
  });
  // Event when select a range
  $("#tbutton").click(function(e) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "api.php",
      data: {gpsdata: "range",
        min: $("#tmin").val(),
        max: $("#tmax").val()},
      success: function(data) {
        var tr = [];
        $.each(data, function(index, value) {
          tr.push(new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]));
        });
        creaTrayecto(tr, '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
      }
    });
  });
  // Event when de select box with sessions IDs change
  $("select#sessiones").change(function() { 
    $("select option:selected").each(function() { 
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "api.php",
        data: {gpsdata: "session",
          session: $(this).val()},
        success: function(data) {
          var tr = [];
          $.each(data, function(index, value) {
            tr.push(new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]));
          });
          creaTrayecto(tr, '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
        }
      });
    });
  });
  
});

function initServerSentEvents() {
  source = new EventSource("api.php?sse=gpsdata");
  source.onmessage = function(event) {
    var data = jQuery.parseJSON(event.data);
    if (data.count != lastpoint) {
      console.log("Hay cambio " + data.count);
      $("#text").append(data.count + "<br>").show(500);
      borraMarkers(registros);
      centerMap(data.lat,data.lng);
      creaMarker({
        "id_signal": "location",
        "geometry": {
          type: "Point",
          coordinates: [
            data.lng,
            data.lat
          ]
        }
      });
      lastpoint = data.count;
    } else {
      console.log("No cambia");
    }
  };
}

/**
 * LatLngControl class displays the LatLng and pixel coordinates
 * underneath the mouse within a container anchored to it.
 * @param {google.maps.Map} map Map to add custom control to.
 */
function LatLngControl(map) {
  /**
   * Offset the control container from the mouse by this amount.
   */
  this.ANCHOR_OFFSET_ = new google.maps.Point(8, 8);
  /**
   * Pointer to the HTML container.
   */
  this.node_ = this.createHtmlNode_();
  // Add control to the map. Position is irrelevant.
  map.controls[google.maps.ControlPosition.TOP].push(this.node_);
  // Bind this OverlayView to the map so we can access MapCanvasProjection
  // to convert LatLng to Point coordinates.
  this.setMap(map);
  // Register an MVC property to indicate whether this custom control
  // is visible or hidden. Initially hide control until mouse is over map.
  this.set('visible', false);
}
// Extend OverlayView so we can access MapCanvasProjection.
LatLngControl.prototype = new google.maps.OverlayView();
LatLngControl.prototype.draw = function() {
};
LatLngControl.prototype.createHtmlNode_ = function() {
  var divNode = document.createElement('div');
  divNode.id = 'latlng-control';
  divNode.index = 100;
  return divNode;
};


LatLngControl.prototype.visible_changed = function() {
  this.node_.style.display = this.get('visible') ? '' : 'none';
};

/**
 * Specified LatLng value is used to calculate pixel coordinates and
 * update the control display. Container is also repositioned.
 * @param {google.maps.LatLng} latLng Position to display
 */
LatLngControl.prototype.updatePosition = function(latLng) {
  var projection = this.getProjection();
  var point = projection.fromLatLngToContainerPixel(latLng);
  // Update control position to be anchored next to mouse position.
  this.node_.style.left = point.x + this.ANCHOR_OFFSET_.x + 'px';
  this.node_.style.top = point.y + this.ANCHOR_OFFSET_.y + 'px';
  // Update control to display latlng and coordinates.
  this.node_.innerHTML = [
    latLng.toUrlValue(4),
    '<br/>',
    point.x,
    'px, ',
    point.y,
    'px'
  ].join('');
};

/**
 * Called on the intiial pageload.
 */
function init() {
  // Create new control to display latlng and coordinates under mouse.
  var latLngControl = new LatLngControl(map);
  // Register event listeners
  google.maps.event.addListener(map, 'mouseover', function(mEvent) {
    latLngControl.set('visible', true);
  });
  google.maps.event.addListener(map, 'mouseout', function(mEvent) {
    latLngControl.set('visible', false);
  });
  google.maps.event.addListener(map, 'mousemove', function(mEvent) {
    latLngControl.updatePosition(mEvent.latLng);
  });

  google.maps.event.addListener(map, 'click', function(mEvent) {
    $("#text").hide().html("<coordinates>" + mEvent.latLng.A + ", " + mEvent.latLng.k + ",0</coordinates>").fadeIn(500);
    trayecto.push(mEvent.latLng);
    creaTrayecto(trayecto, '00ff00'); 
  });
}
// Register an event listener to fire when the page finishes loading.
google.maps.event.addDomListener(window, 'load', init);   