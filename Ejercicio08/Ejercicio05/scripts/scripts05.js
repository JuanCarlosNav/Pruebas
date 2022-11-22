//Evento que cambia los estilos de una caja. Si pulsamos 
//Sobre la caja, cambiamos su contenido y eliminamos los 
//Eventos (ya no vuelve a cambiar...)
$(document).ready(function() {
    //Guardamos el destino del enlace en una variable para evitar repetir la búsqueda
    var dest = $("#destinoEvento");	
    //Capturamos los eventos de mouseover y mouseleave sobre la caja y le cambiamos 
    //la clase del estilo dentro del manejador
    dest.on("mouseover mouseleave", function(evt) {	
      dest.toggleClass("resaltado");
    });
    //Dentro de la captura del evento click, eliminamos los manejadores de los 
    //eventos mouseover y mouseleave e informamos al usuario del cambio. Si el 
    //destino tuviese más manejadores sobre estos eventos, también se eliminarían.
    dest.on("click", function(evt) {
      dest.off("mouseover mouseleave");	
      $("#destinoEvento").text("Manejadores eliminados");
    });
  });
  