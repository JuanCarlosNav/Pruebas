console.log("===============================================");

console.log("Todos los párrafos");
console.log($("p"));

console.log("Etiqueta cuyo id es listado");
console.log($("#listado"));

console.log("Etiquetas li de la clase .a");
console.log($("li.a"));

console.log("párrafos y los elementos de lista cuya clase sea b");
console.log($("p, li.b"));

console.log("elementos de lista cuya clase sea a y que sean descendientes de una lista desordenada");
console.log($("ul li.a"));

console.log("primer párrafo que está tras una lista desordenada");
console.log($("ul + p"));	// párrafo 0

console.log("párrafos que son hermanos posteriores del id listado:");
console.log($("#listado ~ p"));	// párrafo 0

console.log("primer párrafo");
console.log($("p:first"));

console.log("último elemento cuya clase sea a");
console.log($(".a:last"));

console.log("párrafos pares (el primer párrafo es el 0, con lo cual es par");
console.log($("p:even"));

console.log("todos los párrafos menos los dos primeros");
console.log($("p:gt(1)"));

console.log("todos los párrafos menos el segundo");
console.log($("p:not(p:eq(1))"));

console.log("párrafos que tienen alguna clase");
console.log($("p[class]"));

console.log("párrafo cuyo id sea pa2");
console.log($("p[id=pa2]"));

console.log("párrafos cuyo id comience por pa");
console.log($("p[id^=pa]"));

console.log("párrafos que contienen el número 3");
console.log($("p:contains(3)"));

console.log("párrafos que son padres");
console.log($("p:parent"));

console.log("lista desordenada donde haya algún elemento que sea de la clase b");
console.log($("ul:has(li[class=b])"));

console.log("tercer elemento de lista de una lista desordenada");
console.log($("ul li:nth-child(3)"));

console.log("cantidad de párrafos del documento");
var numParrafos = $("p").length;
console.log(numParrafos);

//Ponerles un borde a los párrafos
$("p").each(function() {
    $(this).css("border","3px solid red");
});

console.log("segundo elemento");
console.log($("li").eq(1));

console.log("los que no tienen clase");
console.log($("p").not("[class]"));

console.log("los que la tienen");
console.log($("p").filter("[class]"));

console.log("===============================================");
console.log("Recorrer los hijos del selector:");
var numHijos = $("ul").children().each(
    function(indice, elem) {
      console.log(elem.tagName + " - " + elem.className);
    }
).length;

console.log("Padres de los enlaces que tienen el atributo lang");
console.log($("a").parent("[lang]"));

console.log("Padres de los elementos que tengan clase a y que tengan el atributo lang con valor es hasta la etiqueta form");
console.log($(".a").parentsUntil('form','[lang*=es]'));

console.log("Contenido de la etiquieta con id = 'listado'");
console.log($("#listado").html());
console.log($("#listado").text());

console.log("Sustituir los elementos de la etiquta con id = 'listado'");
$("#listado").html("<li>Nuevo elemento mediante jQuery</li>");

console.log($("#listado").html());

//Envuelve cada párrafo con una capa de color rojo (tantas capas como párrafos)
$("p").wrap("<div style='color:red' />");

//Añade la clase a los párrafos
$("p").addClass("a");

//A los párrafos pares, eliminarles la clase b y añadirle la clase a
$("p:even").removeClass("b").addClass("a");
console.log("En algún elemento:" + $("p").hasClass("a"));

//Recorrer los elementos de todos los párrafos
$("p").each(function(indice, elem) {
  console.log("Elemento: " + $(elem).text() + " -> " + $(elem).hasClass("a"));
});

//cambiar la clase de los párrafos por la clase a
$("p").toggleClass("a")