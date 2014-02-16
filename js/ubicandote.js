var filtros = (document.getElementById("e12").value).split(",");
var marcas = [];
var SM, SM2;
var posicionActual, posicionNueva = 140;
var markers;
var map;
var infoWindow;
var promocionesId;
var customIcons = {
  TattooYPiercing: {icon: 'http://ubicandote.com/upload/images/2013/10/01/tXEUl.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, TiendasEroticas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/RQKi0.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Restaurantes: {icon: 'http://ubicandote.com/upload/images/2013/10/01/ON9vi.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, RopaCalzadoyAccesorios: {icon: 'http://ubicandote.com/upload/images/2013/10/01/40NzT.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, SuperMercados: {icon: 'http://ubicandote.com/upload/images/2013/10/01/gMBr.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AcademiaDeAutomovilismo: {icon: 'http://ubicandote.com/upload/images/2013/10/01/fPkV7.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AcademiasDeBaile: {icon: 'http://ubicandote.com/upload/images/2013/10/01/5ritQ.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AcademiasDeSeguridad: {icon: 'http://ubicandote.com/upload/images/2013/10/01/5sQMu.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AgenciasDeViajes: {icon: 'http://ubicandote.com/upload/images/2013/10/01/2LMp.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AlquilerDeTrajes: {icon: 'http://ubicandote.com/upload/images/2013/10/01/UWIdP.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ArticulosParaFiestas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/EsTAo.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, BaresYDiscotecas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/0PDR.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, CasasDeEventos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/NzGX.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ClinicasYSalud: {icon: 'http://ubicandote.com/upload/images/2013/10/01/NzGX.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ClubsNocturnos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/vFIci.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Deportes: {icon: 'http://ubicandote.com/upload/images/2013/10/01/AE5r4.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, DisenoGraficoYPublicidad: {icon: 'http://ubicandote.com/upload/images/2013/10/01/eVvXz.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Droguerias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/C6dGn.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Educacion: {icon: 'http://ubicandote.com/upload/images/2013/10/01/FGhsr.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Floristerias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Gn2IS.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Fotografia: {icon: 'http://ubicandote.com/upload/images/2013/10/01/OQUEj.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Funerarias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/coZ53.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, GaleriasDeArte: {icon: 'http://ubicandote.com/upload/images/2013/10/01/aFAoR.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, HeladeriasyFruterias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/fZFRs.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Hoteles: {icon: 'http://ubicandote.com/upload/images/2013/10/01/iDZFH.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Licores: {icon: 'http://ubicandote.com/upload/images/2013/10/01/7Z5zF.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Mascotas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/WBo1i.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, MueblesyHogar: {icon: 'http://ubicandote.com/upload/images/2013/10/01/wToZ.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Musica: {icon: 'http://ubicandote.com/upload/images/2013/10/01/ySI0N.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, PanaderiasyPastelerias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Dfe1B.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, PeluqueriasEsteticaySpa: {icon: 'http://ubicandote.com/upload/images/2013/10/01/JxEwy.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Profesionales: {icon: 'http://ubicandote.com/upload/images/2013/10/01/kfwuI.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, TiendasNaturistas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/YTznf.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Vehiculos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Vt0Ci.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Bicicleteria: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Hrmch.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Metales: {icon: 'http://ubicandote.com/upload/images/2013/10/01/EMp6G.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, CacharreriaYVariedades: {icon: 'http://ubicandote.com/upload/images/2013/10/01/GORY4.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Gimnasios: {icon: 'http://ubicandote.com/upload/images/2013/10/01/wjLx3.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ClinicasOdontologicas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/zUmk.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ArtesMarciales: {icon: 'http://ubicandote.com/upload/images/2013/10/01/tfwxk.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, DeportesExtremos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/8Y7Ka.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Billares: {icon: 'http://ubicandote.com/upload/images/2013/10/01/sQBHu.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, InstitutosDeIngles: {icon: 'http://ubicandote.com/upload/images/2013/10/01/HzcC2.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Veterinarias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/7fKJ.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, TiendasDeMascotas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/CG0gQ.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, GruposMusicales: {icon: 'http://ubicandote.com/upload/images/2013/10/01/4KiZz.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, InstrumentosMusicales: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Pb0Vx.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AcademiasMusicales: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Uvknf.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Spa: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Fh2Xp.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Peluqueria: {icon: 'http://ubicandote.com/upload/images/2013/10/01/25Y3y.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ManicurePedicure: {icon: 'http://ubicandote.com/upload/images/2013/10/01/lyzTW.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, CentrosDeEstetica: {icon: 'http://ubicandote.com/upload/images/2013/10/01/58Nk7.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Abogados: {icon: 'http://ubicandote.com/upload/images/2013/10/01/fJNVF.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Arquitectos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/1RkH3.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Artistas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/suzOD.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Medicos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/laZXC.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidasRapidas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/9ymdH.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, PizzaYPasta: {icon: 'http://ubicandote.com/upload/images/2013/10/01/DobfB.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaTipica: {icon: 'http://ubicandote.com/upload/images/2013/10/01/7D2Qa.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaInternacional: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Tfe9.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaArabe: {icon: 'http://ubicandote.com/upload/images/2013/10/01/cMiH0.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaOriental: {icon: 'http://ubicandote.com/upload/images/2013/10/01/1d79S.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaDeMar: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Nwnxp.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Asados: {icon: 'http://ubicandote.com/upload/images/2013/10/01/MevfR.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaMexicana: {icon: 'http://ubicandote.com/upload/images/2013/10/01/D806n.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Areperias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/59wqZ.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Ropa: {icon: 'http://ubicandote.com/upload/images/2013/10/01/cI2l7.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Novias: {icon: 'http://ubicandote.com/upload/images/2013/10/01/2wkX.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Calzado: {icon: 'http://ubicandote.com/upload/images/2013/10/01/nyZgz.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Uniformes: {icon: 'http://ubicandote.com/upload/images/2013/10/01/GAoZ7.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, VestidosDeBano: {icon: 'http://ubicandote.com/upload/images/2013/10/01/1muBr.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, RopaParaBebes: {icon: 'http://ubicandote.com/upload/images/2013/10/01/WFpMi.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, RinesYLlantas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/vs7LG.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AudioVideoYPolarizados: {icon: 'http://ubicandote.com/upload/images/2013/10/01/dCV3X.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, Talleres: {icon: 'http://ubicandote.com/upload/images/2013/10/01/EIZx2.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, CompraVentas: {icon: 'http://ubicandote.com/upload/images/2013/10/01/Mfbpa.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, AccesoriosParaVehículos: {icon: 'http://ubicandote.com/upload/images/2013/10/01/qIgJz.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, ComidaGourmet: {icon: 'http://ubicandote.com/upload/images/2013/10/01/la0HF.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png'}, };
function filtraPromos(promo) {
  jQuery(function($) {
    $("div").filter(".promociones").css('display', 'none');
    $("div").filter("#" + promo).css('display', 'inline');
  });
}
jQuery(function($) {
  $('#selectpromo').change(function() {
    var val = $("#selectpromo option:selected").text();
    filtraPromos(val)
  });
  $(".lb_gallery").rlightbox();
  promocionesId = (function() {
    var promocionesId = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': 'http://ubicandote.com/2013/promociones-json.php?table=promociones',
      'dataType': "json",
      'success': function(data) {
        promocionesId = data;
      }
    });
    return promocionesId;
  })();
});
var styles = [
  {
    featureType: "all",
    stylers: [
      {saturation: -80}
    ]
  }, {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {hue: "#5CB1FF"},
      {saturation: 50}


    ]
  }, {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {hue: "#00ffee"},
      {saturation: 50}
    ]
  }, {
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      {visibility: "off"}
    ]
  }
];
function load() {

  map = new google.maps.Map(document.getElementById("mapaprincipal"), {
    center: new google.maps.LatLng(3.300832, -76.522919),
    disableDefaultUI: true,
    scrollwheel: false,
    zoom: 13,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow;
  // Change this depending on the name of your PHP file
  downloadUrl("xml_maps.php?lat=3.400832&lng=-76.522919", function(data) {
    var xml = data.responseXML;
    var center = xml.documentElement.getElementsByTagName("point");
    var pointcenter = new google.maps.LatLng(
            parseFloat(center[0].getAttribute("lat")),
            parseFloat(center[0].getAttribute("lng")));
    markers = xml.documentElement.getElementsByTagName("marker");
    if (document.getElementById("e12").value) {
      borraMarkers(marcas);
      creaMarcas(markers, map, infoWindow);
    } else {
      //creaMarcasinicial(markers,map,infoWindow);
    }
    jQuery(document).ready(function($) {
      $('#e12,#solopromo').click(function() {
        borraMarkers(marcas);
        creaMarcas(markers, map, infoWindow);
        console.log(document.getElementById("e12").value);
      });
      $('#linkcat').click(function() {
        console.log("cat_boton");
      });
    })

    map.setCenter(pointcenter);
  });
  //map.setOptions({styles: styles});         
}
function borraMarkers(marcas) {
  for (var i = 0; i < marcas.length; i++) {
    marcas[i].setMap(null);
  }
}
function creaMarcasinicial(markers, map, infoWindow) {
  for (var i = 0; i < markers.length; i++) {
    creaMarca(markers[i], map, infoWindow);
  }
}
function creaMarca(marker, map, infoWindow) {
  var id = marker.getAttribute("id");
  var type = marker.getAttribute("type");
  var name = marker.getAttribute("name");
  var address = marker.getAttribute("address");
  var slogan = marker.getAttribute("slogan");
  var telefonos = marker.getAttribute("telefonos");
  var zona = marker.getAttribute("zona");
  var imgnube = marker.getAttribute("imgnube");
  var point = new google.maps.LatLng(parseFloat(marker.getAttribute("lat")), parseFloat(marker.getAttribute("lng")));
  var html2 = "<strong>" + name + "</strong> <br/> <i>" + slogan + "</i><hr> <img id='bordeado' width='200' src='" + imgnube + "'> <br/>" + address + "<br/>" + zona + "<br/><br/> <a class='pure-button' href='perfil.php?id=" + id + "'>Ver Perfil</a>";
  var actual = document.getElementById('listaperfiles').innerHTML;
  document.getElementById('listaperfiles').innerHTML = actual + ("<li><img style='float:left;margin-right: 5px;border-radius: 5px;' id='bordeado' width='60' src='" + imgnube + "'>" + name + " <br> </i>" + address + "<br>" + telefonos + "<br><a href='perfil.php?id=" + id + "' class='read-more'>Ver Perfil » </a></li>")

  var icon = customIcons[type] || {};
  var marker = new google.maps.Marker({
    map: map,
    position: point,
    icon: icon.icon,
  });
  marcas.push(marker);
  bindInfoWindow(marker, map, infoWindow, name, address, slogan, imgnube, zona, telefonos, id, point);
  agregatales(marker, map, infoWindow, html2, name, address, slogan, imgnube, zona, telefonos, id, point);
}
function creaMarcas(markers, map, infoWindow) {
  document.getElementById("infolist").style.display = "inline";
  document.getElementById('listaperfiles').innerHTML = "";
  //alert(document.formpromo.solopromo.checked); 
  for (var i = 0; i < markers.length; i++) {
    if (document.formpromo.solopromo.checked) {
      for (var p = 0; p < promocionesId.length; p++) {
        var id = markers[i].getAttribute("id");
        if (promocionesId[p].idperfil == id) {
          for (var j = 0; j < (document.getElementById("e12").value).split(",").length; j++) {
            var type = markers[i].getAttribute("type");
            if ((document.getElementById("e12").value).split(",")[j] == type) {
              creaMarca(markers[i], map, infoWindow);
            }
          }
        }
      }
    } else {
      for (var j = 0; j < (document.getElementById("e12").value).split(",").length; j++) {
        var type = markers[i].getAttribute("type");
        if ((document.getElementById("e12").value).split(",")[j] == type) {
          creaMarca(markers[i], map, infoWindow);
        }
      }
    }
  }
}
function bindInfoWindow(marker, map, infoWindow, name, address, slogan, imgnube, zona, telefonos, id, point) {
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent("<div class='nube'><img class='nube' src='" + imgnube + "'><p><b>" + name + "</b></p>" + address + "<br> " + telefonos + "<br><br><a class='pure-button' target='_blank' href='perfil.php?id=" + id + "'>Ver Perfil</a><a class='pure-button' target='_blank' href='https://maps.google.es/maps?q=%40" + point.lat() + "," + point.lng() + "&hl=es-419&t=m&z=17&daddr=%40" + point.lat() + "," + point.lng() + "'>Cómo llegar</a></div> ");
    infoWindow.open(map, marker);
  });
  google.maps.event.addListener(marker, 'mouseout', function() {
    //infoWindow.close(map, marker);
  });
}
function agregatales(marker, map, infoWindow, html, name, address, slogan, imgnube, zona, telefonos, id) {
  google.maps.event.addListener(marker, 'click', function() { 
    infoWindow.open(map, marker);
  });
}
function downloadUrl(url, callback) {
  var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}
function doNothing() {
}
function linkcat(cat) {
  jQuery(document).ready(function($) {
    document.getElementById('e12').value = cat;
    console.log(document.getElementById("e12").value);
    SM.hide();
    borraMarkers(marcas);
    creaMarcas(markers, map, infoWindow);
    $("#e12").select2("val", cat);
    $("#e12").select2("data", [{id: cat, text: cat}]);
  });
}
jQuery(document).ready(function($) {


  $("#e12").select2({tags: [
      "TattooYPiercing", "TiendasEroticas", "Restaurantes", "RopaCalzadoyAccesorios", "SuperMercados", "AcademiaDeAutomovilismo", "AcademiasDeBaile", "AcademiasDeSeguridad", "AgenciasDeViajes", "AlquilerDeTrajes", "ArticulosParaFiestas", "BaresYDiscotecas", "CasasDeEventos", "ClinicasYSalud", "ClubsNocturnos", "Deportes", "DisenoGraficoYPublicidad", "Droguerias", "Educacion", "Floristerias", "Fotografia", "Funerarias", "GaleriasDeArte", "HeladeriasyFruterias", "Hoteles", "Licores", "Mascotas", "MueblesyHogar", "Musica", "PanaderiasyPastelerias", "PeluqueriasEsteticaySpa", "Profesionales", "TiendasNaturistas", "Vehiculos", "Bicicleteria", "Metales", "CacharreriaYVariedades", "Gimnasios", "ClinicasOdontologicas", "ArtesMarciales", "DeportesExtremos", "Billares", "InstitutosDeIngles", "Veterinarias", "TiendasDeMascotas", "GruposMusicales", "InstrumentosMusicales", "AcademiasMusicales", "Spa", "Peluqueria", "ManicurePedicure", "CentrosDeEstetica", "Abogados", "Arquitectos", "Artistas", "Medicos", "ComidasRapidas", "PizzaYPasta", "ComidaTipica", "ComidaInternacional", "ComidaArabe", "ComidaOriental", "ComidaDeMar", "Asados", "ComidaMexicana", "Areperias", "Ropa", "Novias", "Calzado", "Uniformes", "VestidosDeBano", "RopaParaBebes", "RinesYLlantas", "AudioVideoYPolarizados", "Talleres", "CompraVentas", "AccesoriosParaVehículos", "ComidaGourmet", ]});
  $("#e12_open").click(function() {
    $("#e12").select2("open");
  });
  $("#e12_close").click(function() {
    $("#e12").select2("val", "");
    borraMarkers(marcas);
  });
  if ($(this).scrollTop() < 140) {

    if (screen.availWidth > 479) {
      SM = new SimpleModal({"hideHeader": true, "closeButton": false, "btn_ok": "Cerrar Ventana", "width": 840, "offsetTop:": 140});
      SM.show({"model": "alert",
        "contents": "<a id='linkcat' href='#' onClick='linkcat(\"AcademiaDeAutomovilismo\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/fPkV7.png' border='0'/> AcademiaDeAutomovilismo </div></a><a id='linkcat' href='#' onClick='linkcat(\"AcademiasDeBaile\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/5ritQ.png' border='0'/> AcademiasDeBaile </div></a><a id='linkcat' href='#' onClick='linkcat(\"AcademiasDeSeguridad\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/5sQMu.png' border='0'/> AcademiasDeSeguridad </div></a><a id='linkcat' href='#' onClick='linkcat(\"AgenciasDeViajes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/2LMp.png' border='0'/> AgenciasDeViajes </div></a><a id='linkcat' href='#' onClick='linkcat(\"AlquilerDeTrajes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/UWIdP.png' border='0'/> AlquilerDeTrajes </div></a><a id='linkcat' href='#' onClick='linkcat(\"ArticulosParaFiestas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/EsTAo.png' border='0'/> ArticulosParaFiestas </div></a><a id='linkcat' href='#' onClick='linkcat(\"BaresYDiscotecas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/0PDR.png' border='0'/> BaresYDiscotecas </div></a><a id='linkcat' href='#' onClick='linkcat(\"Bicicleteria\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Hrmch.png' border='0'/> Bicicleteria </div></a><a id='linkcat' href='#' onClick='linkcat(\"CacharreriaYVariedades\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/GORY4.png' border='0'/> CacharreriaYVariedades </div></a><a id='linkcat' href='#' onClick='linkcat(\"CasasDeEventos\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/NzGX.png' border='0'/> CasasDeEventos </div></a><a id='linkcat' href='#' onClick='linkcat(\"ClinicasYSalud\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/NzGX.png' border='0'/> ClinicasYSalud </div></a><a id='linkcat' href='#' onClick='linkcat(\"ClubsNocturnos\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/vFIci.png' border='0'/> ClubsNocturnos </div></a><a id='linkcat' href='#' onClick='linkcat(\"Deportes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/AE5r4.png' border='0'/> Deportes </div></a><a id='linkcat' href='#' onClick='linkcat(\"DisenoGraficoYPublicidad\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/eVvXz.png' border='0'/> DisenoGraficoYPublicidad </div></a><a id='linkcat' href='#' onClick='linkcat(\"Droguerias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/C6dGn.png' border='0'/> Droguerias </div></a><a id='linkcat' href='#' onClick='linkcat(\"Educacion\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/FGhsr.png' border='0'/> Educacion </div></a><a id='linkcat' href='#' onClick='linkcat(\"Floristerias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Gn2IS.png' border='0'/> Floristerias </div></a><a id='linkcat' href='#' onClick='linkcat(\"Fotografia\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/OQUEj.png' border='0'/> Fotografia </div></a><a id='linkcat' href='#' onClick='linkcat(\"Funerarias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/coZ53.png' border='0'/> Funerarias </div></a><a id='linkcat' href='#' onClick='linkcat(\"GaleriasDeArte\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/aFAoR.png' border='0'/> GaleriasDeArte </div></a><a id='linkcat' href='#' onClick='linkcat(\"HeladeriasyFruterias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/fZFRs.png' border='0'/> HeladeriasyFruterias </div></a><a id='linkcat' href='#' onClick='linkcat(\"Hoteles\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/iDZFH.png' border='0'/> Hoteles </div></a><a id='linkcat' href='#' onClick='linkcat(\"Licores\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/7Z5zF.png' border='0'/> Licores </div></a><a id='linkcat' href='#' onClick='linkcat(\"Mascotas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/WBo1i.png' border='0'/> Mascotas </div></a><a id='linkcat' href='#' onClick='linkcat(\"Metales\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/EMp6G.png' border='0'/> Metales </div></a><a id='linkcat' href='#' onClick='linkcat(\"MueblesyHogar\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/wToZ.png' border='0'/> MueblesyHogar </div></a><a id='linkcat' href='#' onClick='linkcat(\"Musica\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/ySI0N.png' border='0'/> Musica </div></a><a id='linkcat' href='#' onClick='linkcat(\"PanaderiasyPastelerias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Dfe1B.png' border='0'/> PanaderiasyPastelerias </div></a><a id='linkcat' href='#' onClick='linkcat(\"PeluqueriasEsteticaySpa\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/JxEwy.png' border='0'/> PeluqueriasEsteticaySpa </div></a><a id='linkcat' href='#' onClick='linkcat(\"Profesionales\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/kfwuI.png' border='0'/> Profesionales </div></a><a id='linkcat' href='#' onClick='linkcat(\"Restaurantes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/ON9vi.png' border='0'/> Restaurantes </div></a><a id='linkcat' href='#' onClick='linkcat(\"RopaCalzadoyAccesorios\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/40NzT.png' border='0'/> RopaCalzadoyAccesorios </div></a><a id='linkcat' href='#' onClick='linkcat(\"SuperMercados\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/gMBr.png' border='0'/> SuperMercados </div></a><a id='linkcat' href='#' onClick='linkcat(\"TattooYPiercing\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/tXEUl.png' border='0'/> TattooYPiercing </div></a><a id='linkcat' href='#' onClick='linkcat(\"TiendasEroticas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/RQKi0.png' border='0'/> TiendasEroticas </div></a><a id='linkcat' href='#' onClick='linkcat(\"TiendasNaturistas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/YTznf.png' border='0'/> TiendasNaturistas </div></a><a id='linkcat' href='#' onClick='linkcat(\"Vehiculos\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Vt0Ci.png' border='0'/> Vehiculos </div></a>"});
    }
  }
  $('#categorias').click(function() {
    SM = new SimpleModal({"hideHeader": true, "closeButton": false, "btn_ok": "Cerrar Ventana", "width": 840, "offsetTop:": 140});
    SM.show({
      "model": "alert",
      "contents": "<a id='linkcat' href='#' onClick='linkcat(\"AcademiaDeAutomovilismo\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/fPkV7.png' border='0'/> AcademiaDeAutomovilismo </div></a><a id='linkcat' href='#' onClick='linkcat(\"AcademiasDeBaile\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/5ritQ.png' border='0'/> AcademiasDeBaile </div></a><a id='linkcat' href='#' onClick='linkcat(\"AcademiasDeSeguridad\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/5sQMu.png' border='0'/> AcademiasDeSeguridad </div></a><a id='linkcat' href='#' onClick='linkcat(\"AgenciasDeViajes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/2LMp.png' border='0'/> AgenciasDeViajes </div></a><a id='linkcat' href='#' onClick='linkcat(\"AlquilerDeTrajes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/UWIdP.png' border='0'/> AlquilerDeTrajes </div></a><a id='linkcat' href='#' onClick='linkcat(\"ArticulosParaFiestas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/EsTAo.png' border='0'/> ArticulosParaFiestas </div></a><a id='linkcat' href='#' onClick='linkcat(\"BaresYDiscotecas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/0PDR.png' border='0'/> BaresYDiscotecas </div></a><a id='linkcat' href='#' onClick='linkcat(\"Bicicleteria\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Hrmch.png' border='0'/> Bicicleteria </div></a><a id='linkcat' href='#' onClick='linkcat(\"CacharreriaYVariedades\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/GORY4.png' border='0'/> CacharreriaYVariedades </div></a><a id='linkcat' href='#' onClick='linkcat(\"CasasDeEventos\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/NzGX.png' border='0'/> CasasDeEventos </div></a><a id='linkcat' href='#' onClick='linkcat(\"ClinicasYSalud\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/NzGX.png' border='0'/> ClinicasYSalud </div></a><a id='linkcat' href='#' onClick='linkcat(\"ClubsNocturnos\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/vFIci.png' border='0'/> ClubsNocturnos </div></a><a id='linkcat' href='#' onClick='linkcat(\"Deportes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/AE5r4.png' border='0'/> Deportes </div></a><a id='linkcat' href='#' onClick='linkcat(\"DisenoGraficoYPublicidad\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/eVvXz.png' border='0'/> DisenoGraficoYPublicidad </div></a><a id='linkcat' href='#' onClick='linkcat(\"Droguerias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/C6dGn.png' border='0'/> Droguerias </div></a><a id='linkcat' href='#' onClick='linkcat(\"Educacion\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/FGhsr.png' border='0'/> Educacion </div></a><a id='linkcat' href='#' onClick='linkcat(\"Floristerias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Gn2IS.png' border='0'/> Floristerias </div></a><a id='linkcat' href='#' onClick='linkcat(\"Fotografia\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/OQUEj.png' border='0'/> Fotografia </div></a><a id='linkcat' href='#' onClick='linkcat(\"Funerarias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/coZ53.png' border='0'/> Funerarias </div></a><a id='linkcat' href='#' onClick='linkcat(\"GaleriasDeArte\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/aFAoR.png' border='0'/> GaleriasDeArte </div></a><a id='linkcat' href='#' onClick='linkcat(\"HeladeriasyFruterias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/fZFRs.png' border='0'/> HeladeriasyFruterias </div></a><a id='linkcat' href='#' onClick='linkcat(\"Hoteles\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/iDZFH.png' border='0'/> Hoteles </div></a><a id='linkcat' href='#' onClick='linkcat(\"Licores\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/7Z5zF.png' border='0'/> Licores </div></a><a id='linkcat' href='#' onClick='linkcat(\"Mascotas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/WBo1i.png' border='0'/> Mascotas </div></a><a id='linkcat' href='#' onClick='linkcat(\"Metales\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/EMp6G.png' border='0'/> Metales </div></a><a id='linkcat' href='#' onClick='linkcat(\"MueblesyHogar\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/wToZ.png' border='0'/> MueblesyHogar </div></a><a id='linkcat' href='#' onClick='linkcat(\"Musica\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/ySI0N.png' border='0'/> Musica </div></a><a id='linkcat' href='#' onClick='linkcat(\"PanaderiasyPastelerias\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Dfe1B.png' border='0'/> PanaderiasyPastelerias </div></a><a id='linkcat' href='#' onClick='linkcat(\"PeluqueriasEsteticaySpa\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/JxEwy.png' border='0'/> PeluqueriasEsteticaySpa </div></a><a id='linkcat' href='#' onClick='linkcat(\"Profesionales\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/kfwuI.png' border='0'/> Profesionales </div></a><a id='linkcat' href='#' onClick='linkcat(\"Restaurantes\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/ON9vi.png' border='0'/> Restaurantes </div></a><a id='linkcat' href='#' onClick='linkcat(\"RopaCalzadoyAccesorios\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/40NzT.png' border='0'/> RopaCalzadoyAccesorios </div></a><a id='linkcat' href='#' onClick='linkcat(\"SuperMercados\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/gMBr.png' border='0'/> SuperMercados </div></a><a id='linkcat' href='#' onClick='linkcat(\"TattooYPiercing\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/tXEUl.png' border='0'/> TattooYPiercing </div></a><a id='linkcat' href='#' onClick='linkcat(\"TiendasEroticas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/RQKi0.png' border='0'/> TiendasEroticas </div></a><a id='linkcat' href='#' onClick='linkcat(\"TiendasNaturistas\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/YTznf.png' border='0'/> TiendasNaturistas </div></a><a id='linkcat' href='#' onClick='linkcat(\"Vehiculos\");'><div id='linkcat'><img src='http://ubicandote.com/upload/images/2013/10/01/Vt0Ci.png' border='0'/> Vehiculos </div></a>"});
  });
  $(window).scroll(function() {
    posicionNueva = $(this).scrollTop();
    console.log($(this).scrollTop());
    if (posicionNueva > 140) {
      //$('#slider').fadeOut();
      //$('#slider2').fadeOut();
    } else if (posicionNueva < 140) {
      //$('#slider').fadeIn();
      //$('#slider2').fadeIn();
    }
    posicionActual = posicionNueva;
  });
})

//]]> 


function scrollTo(target) {
  var myArray = target.split('#');
  var targetPosition = jQuery('#' + myArray[1]).offset().top;
  jQuery('html,body').animate({scrollTop: targetPosition}, 'slow');
}

jQuery(document).ready(function($) {

  $.extend($.fn.select2.defaults, {
    formatNoMatches: function() {
      return "No se encontraron resultados";
    },
    formatInputTooShort: function(input, min) {
      var n = min - input.length;
      return "Por favor adicione " + n + " caracter" + (n == 1 ? "" : "es");
    },
    formatInputTooLong: function(input, max) {
      var n = input.length - max;
      return "Por favor elimine " + n + " caracter" + (n == 1 ? "" : "es");
    },
    formatSelectionTooBig: function(limit) {
      return "Solo puede seleccionar " + limit + " elemento" + (limit == 1 ? "" : "s");
    },
    formatLoadMore: function(pageNumber) {
      return "Cargando más resultados...";
    },
    formatSearching: function() {
      return "Buscando...";
    }
  });
  $("#e6").on("select2-selecting", function(e) {
    //alert("selecting val="+ e.val+" choice="+ JSON.stringify(e.choice));
    window.open('./perfil.php?id=' + e.val, '_blank');
  });
  $("#e6").select2({
    placeholder: "Buscar ...",
    minimumInputLength: 1,
    ajax: {
      url: "http://ubicandote.com/2013/json.php",
      dataType: 'json',
      quietMillis: 100,
      data: function(term, page) {
        return {
          q: term, // search term 
        };
      },
      results: function(data) { // parse the results into the format expected by Select2.
        // since we are using custom formatting functions we do not need to alter remote JSON data
        console.log(data);
        return {results: data};
      }
    },
    formatResult: movieFormatResult, // omitted for brevity, see the source of this page
    formatSelection: movieFormatSelection, // omitted for brevity, see the source of this page
    dropdownCssClass: "bigdrop", // apply css that makes the dropdown taller
    escapeMarkup: function(m) {
      return m;
    } // we do not want to escape markup since we are displaying html in results
  });
});
function movieFormatResult(movie) {
  var markup = "<table class='movie-result'><tr>";
  if (movie.imgnube !== undefined && movie.posters.thumbnail !== undefined) {
    markup += "<td class='movie-image'></td>";
  }
  markup += "<td class='movie-info'><div class='movie-title'>" + movie.nombreperfil + "</div>";
  if (movie.categoria !== undefined) {
    markup += "<div class='movie-info'><img src='" + movie.icono + "'/>" + movie.categoria + "</div>";
  }
  else if (movie.descripcion !== undefined) {
    markup += "<div class='movie-synopsis'>" + movie.descripcion + "</div>";
  }
  markup += "</td></tr></table>"
  return markup;
}
function movieFormatSelection(movie) {
  return movie.nombreperfil;
  console.log("movie.nombreperfil: " + movie.nombreperfil);
}
