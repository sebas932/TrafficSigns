var regSeleccionados,
        contador = 0;

var flightPlanCoordinates = [
  new google.maps.LatLng(37.772323, -122.214897),
  new google.maps.LatLng(21.291982, -157.821856),
  new google.maps.LatLng(-18.142599, 178.431),
  new google.maps.LatLng(-27.46758, 153.027892)
];

$(document).ready(function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "api.php",
    data: {gpsdata: "true",
      min: 0,
      max: 100},
    success: function(data) {
      var tr = [];
      $.each(data, function(index, value) { 
         tr.push(new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]));
      });
      creaTrayecto(tr, 'ffcc00');
    }
  });
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "api.php",
    data: {gpsdata: "true",
      min: 100,
      max: 200},
    success: function(data) {
      var tr = [];
      $.each(data, function(index, value) { 
         tr.push(new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]));
      });
      creaTrayecto(tr, 'ff0000');
    }
  });
});

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
}
// Register an event listener to fire when the page finishes loading.
google.maps.event.addDomListener(window, 'load', init);