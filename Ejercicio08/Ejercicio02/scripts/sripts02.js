/////////////////////////////////////////////////////////////////
/*////////////////////////////////////////////////////////////////
A partir del siguiente documento con enlaces, añadir el código 
jQuery necesario para que al lado de cada enlace muestre mediante 
una imagen el formato del archivo (pdf, html) o el tipo de enlace 
(sólo para email).
//*///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

var pdfs = $("li a[href $=pdf]");
pdfs.each(function(indice, elem) {
  console.log("Elemento: " + $(elem).text() + " -> " + $(elem).hasClass("a"));
  $(elem).append("<img class='icono' src='images/pdf.png'/>");
});

var htmls = $("li a[href $=html]");
htmls.each(function(indice, elem) {
  console.log("Elemento: " + $(elem).text() + " -> " + $(elem).hasClass("a"));
  $(elem).append("<img class='icono' src='images/web.png'/>");
});

var mails = $("li a[href ^=mailto]");
mails.each(function(indice, elem) {
  console.log("Elemento: " + $(elem).text() + " -> " + $(elem).hasClass("a"));
  $(elem).append("<img class='icono' src='images/email.png'/>");
});

console.log("===============================================");
