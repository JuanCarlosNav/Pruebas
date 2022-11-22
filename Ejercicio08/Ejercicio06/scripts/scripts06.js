//Evento que muestra las coordenadas relativas al pulsar
//sobre una caja.
$(function() {
  $("div").click(function(evt) {
      $(this).html("pageX: " + evt.pageX + ", pageY: " + evt.pageY + ", tipo: " + evt.type + ", target: " + evt.target);
  });
});