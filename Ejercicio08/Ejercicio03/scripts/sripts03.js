/////////////////////////////////////////////////////////////////
/*////////////////////////////////////////////////////////////////
- Añadir a cada fila de manera alterna los siguientes estilos:
.par {
	background-color:#0f0;
}
.impar {
	background-color:#afa;
}

Resalta la fila sobre la que está el ratón con el siguiente estilo:
.resaltado {  
	font-weight:bold;
}

Al clickar sobre una fila, mostrará una alerta con el producto y su precio
//*///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//var pdfs = $("li a[href $=pdf]");

var cssPar = {'background-color':'#0f0'};
var cssImpar = {'background-color':'#afa'};

$("tr").hover(function(){
  $(this).css({'background-color':'ffcc00','font-weight':'bold'});
  }, function(){
    $(this).css({'background-color':'ffcc00','font-weight':'normal'});
    }
); 

var impares = $('tr:odd'); 
impares.each(function(indice, elem) {
  $(elem).css(cssImpar);
  console.log("Elemento: " + $(elem).text() + " -> " + $(elem).find("td").text());
});

$("tr").on("click", function() {
   var producto = $(this).find("td:first");
  var precio = $(this).find("td:last")
//  alert($(this).find("td").append("-").text());
  alert("Producto : " + producto.text() + "\nPrecio: " + precio.text());
})

console.log("===============================================");
