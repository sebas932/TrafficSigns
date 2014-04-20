var regSeleccionados,
    contador = 0;
$(document).ready(function() {
  $("#signals ul li").click(function(e) {
    regSeleccionados = [];
    $(this).toggleClass("seleccionado");
    $(".seleccionado").each(function(index, value) {
      var id = value.id.split("-")[1];
      regSeleccionados.push(id);
    });
    $.ajax({
      type: "GET",
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




