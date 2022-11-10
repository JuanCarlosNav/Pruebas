/*///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 1. Contenido Bloqueado
Crear una función que recorra el DOM y si encuentra la palabra "sexo", elimine el elemento y lo 
sustituya por "Contenido Bloqueado", con el texto en negrita. 

La función se tendrá la siguiente definición:
function bloquearContenido() {}
//*////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
console.log("====================================================================");
console.log("Ejercicio 1. Contenido bloqueado");
console.log("====================================================================");

function bloquearContenido(nodo, cadena) {
    var ref,newValor,texto;
    //Si el nodo es un elemento lo recorro
    if (nodo.nodeType == document.ELEMENT_NODE) {
        //Recorro el contenido del nodo buscano la cadena
        for (var i=0, len=nodo.childNodes.length; i<len; i++) {
            //Si el nodo es de tipo texto y contiene la cadena realizo el cambio
            //Observar que el if tiene una llamada recursiva a la propia función      
            if (bloquearContenido(nodo.childNodes[i], cadena) 
                    && nodo.childNodes[i].nodeType == document.TEXT_NODE)  {
                //Elimino el nodo y creo uno nuevo
                newValor = document.createTextNode("Contenido Bloqueado");
                ref = nodo.childNodes[i].parentNode
                ref.removeChild(ref.childNodes[i]);
                ref.appendChild(newValor);
                return true;
            }
        }
      return false;
    } else if (nodo.nodeType == document.TEXT_NODE) {
      return nodo.nodeValue.indexOf(cadena) > -1;//Indica si la cadena está en el texto.
    }
}
console.log(bloquearContenido(document.body,"sexo"));

console.log("====================================================================");

/*/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 2. Temporizador DOM
Siguiendo la misma idea que el ejercicio 12 del Temporizador, crear dos elementos de formulario 
que indiquen los minutos y segundos de un temporizador, de modo que al darle a comenzar, 
se muestre el temporizador por pantalla.

El código para mostrar el temporizador será el siguiente:

<h2>Temporizador</h2>
<form id="formTemporizador">
    Min: <input type="number" name="min" id="formMin"> <br />
    Seg: <input type="number" name="seg" id="formSeg"> <br />
    <input type="submit">
</form>

<br />

<div id="temporizador">
<span id="min">_</span>:<span id="seg">_</span>
</div>

//*/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
console.log("====================================================================");
console.log("Ejercicio 2. Temporizador");
console.log("====================================================================");

//Comprueba el número de parámetros que recibe, si recibe
//uno serán segundos, si recibe dos el primero serán minutos y el segundo
//segundos, el resto de parámetros será ignorado. Con estos datos
//irá mostrando en consola cada segundo un descuento desde el total de segundos
//(minutos * 60 + segundos) hasta que el contador llegue a cero.
function temporizador() {
    
    //Cada segundo
    let intervalo = 1000;
    // Si no hay argumentos, éstos son los valores por defecto
    let segundos = 10;
    let minutos = 0
    // Si sólo hay un argumento, serán los segundos, si hay más
    // el primer argumento son los minutos y el segundo los
    // segundos, el resto se ignoran.
    if (arguments.length === 1) {
        segundos = arguments[0];
    } else {
        if (arguments.length > 1 ) {
            minutos = arguments[0];
            segundos = arguments[1];
        }
    }

    //Si los parámetros que entran no son números, los valores se inician a 0
    if (isNaN(minutos)) {
        minutos = 0;
    }
    if (isNaN(segundos)) {
        segundos = 0;
    }

    //Calculo el total de segundos
    segundos = minutos * 60 + segundos;

    //Establezco el timer para que se ejecute un segundo después
    let mitimer = function() {
        console.log(segundos);
        let min = Math.trunc(segundos/60);
        let seg = segundos % 60;
        document.getElementById("min").textContent = min;
        document.getElementById("seg").textContent = seg;        
        --segundos;
        if (segundos > -1) {
            //Si quedan segundos vuelvo a llamar a la propia función para
            //continuar mostrando el contador cada segundo
            setTimeout(mitimer,intervalo);
        }
    };
    //Realizo la primera llamada a la función
    var timer = setTimeout(mitimer,intervalo);
//    console.log("fuera del timer");
}

//Manejador de los formularios, captura el envío del formulario para hacer 
//comprobaciones (u otras tareas) antes de enviarlo. Se enviará (return true)
//si las comproaciones son correctas y no se enviará si no lo son, o 
//simplemente no se pretende enviar nunca...
function manejadoresFormularios() {
    document.getElementById("formTemporizador").onsubmit = function() {
        var ok = false;
        let minutos = Number(document.getElementById("formMin").value);
        let segundos = Number(document.getElementById("formSeg").value);
        temporizador(minutos,segundos);
        // Impedimos el envío del formulario para que no se recarge
        // la página con valores iniciales.
//        return false;
        if (ok) {
            return true;  // se realiza el envío
        } else {
            return false;
        }
    };
} 

// Capturo el evento de pulsar el botón de enviar formulario
manejadoresFormularios();

console.log("====================================================================");

/*///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 3. Tabla dinámica
A partir de una tabla con la siguiente estructura:
<input type="text" id="texto" />
<button onclick="anyadirFila()">Añadir fila</button>

<br />

<table>
	<thead>
		<tr><th>Contenido</th><th>Operación</th></tr>
	</thead>
	<tbody id="bodyTabla">
		<tr>
			<td id="fila1">Ejemplo de Contenido</td>
  			<td><button onclick="toCani('fila1')">Caniar</button></td>
		</tr>
	</tbody>
		</tr>
</table>

Añade el código necesarios para que la pulsar sobre los botones realice las siguientes acciones:
Añadir fila: Añade el contenido del campo como última fila de la tabla
Caniar: Transformar el texto de la celda mediante la función toCani de la primera sesión
Al pasar el ratón por encima de una celda, cambiará el color de fondo de la misma..
//*///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
console.log("====================================================================");
console.log("Ejercicio 3. Tabla dinámica");
console.log("====================================================================");
// Función que efectúa una modificación sobre un strig que recibe como parámetro.
// El resultado es el mismo String pero sus caracteres van alternando entre mayúsculas
// y minúsculas (empezando por mayúsculas), adicionalmente, el caracter c es sustituido
// por el caracter k y finalmente se le añaden 3 caracteres HHH al final del string
function caniar(string) {
    let result = "";
    let caracter ="";
    for (i=0;i<string.length;i++) {
        caracter = string[i];
        caracter = caracter.toLowerCase();
        if (caracter === "c" ) {
            caracter = "k";
        }
        if ( i % 2 === 0) {
            result += caracter.toUpperCase();
        } else {
            result += caracter.toLowerCase(); 
        }
    }
    result += "HHH";
    return result;
}

var filas = 2;

var filactual = document.getElementById("fila1");
filactual.addEventListener("mouseover", function(event) {
    if (event.target == filactual)
        filactual.style.backgroundColor = "darkslategrey";
}, false);

filactual.addEventListener("mouseout", function(event) {
    if (event.target == filactual)
        filactual.style.backgroundColor = "white";
}, false);

//Añade una nueva fila a la tabla.
function anyadirFila() {
    let texto = document.getElementById("texto").value;
    if (texto !==null && texto !== "") {
        let newText = document.createTextNode(texto);
        let tablabody = document.getElementById("bodyTabla");
        let tr=document.createElement("tr");
        let td=document.createElement("td");
        td.id = "fila"+filas;
        ++filas;
        td.appendChild(newText);

        td.addEventListener("mouseover", function(event) {
            if (event.target == td)
                td.style.backgroundColor = "darkslategrey";
        }, false);

        td.addEventListener("mouseout", function(event) {
            if (event.target == td)
                td.style.backgroundColor = "white";
        }, false);

        tr.appendChild(td);
        tablabody.appendChild(tr);
    }
    console.log("He pulsado en añadir fila. Hay " + (filas-1) +" filas.");
}

//Efectúa una modificación en un String
function toCani() {

//    let celda = document.getElementById("fila1");

    let celda = document.getElementById("fila" + (filas-1));

    celda.textContent = caniar(celda.textContent);
/*
    if (celda.nodeType == document.ELEMENT_NODE) {
        //Recorro el contenido del nodo buscano un nodo tipo texto
        for (var i=0, len=celda.childNodes.length; i<len; i++) {
            //Si el nodo es de tipo texto cojo el valor y lo modifico  
            if (celda.childNodes[i].nodeType == document.TEXT_NODE 
                    && celda.id == "fila1")  {
                //Elimino el nodo y creo uno nuevo
                celda.childNodes[i].textContent = caniar(celda.childNodes[i].textContent); 
            }
        }
    }
*/    
}

console.log("====================================================================");
/*///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
Ejercicio 4. Carrusel
A partir de un array de imágenes:
var imagenes = ["img/agua.jpg", "img/hieba.jpg", "img/hoja.jpg", "img/primavera.jpg"];
//*/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
console.log("====================================================================");
console.log("Ejercicio 4. Carrusel");
console.log("====================================================================");

var imagenes = ["img/agua.jpg", "img/hierba.jpg", "img/hoja.jpg", "img/primavera.jpg"];

var i = 0;
var img =  document.getElementById("imagen");

function ponerImagen(imagen) {
    var img =  document.getElementById("imagen");
    img.setAttribute("src",imagen);
console.log("Cambiando imagen: " + imagen)
}

var interval = 20000;

while (i<4) {
    setTimeout(ponerImagen(imagenes[i]),interval);
    ++i;
//Para hacerlocontínuo
//    if (i > 3) {
//        i = 0;
//    }
//una condición de salida.
//    i = 10;
}

(function() {
    var velocidad = 2000,
        img,
        i = 0;
        img =  document.getElementById("imagen");
        cambiarImagen = function() {

            img.setAttribute("src",imagenes[i]);        
            console.log("Cambiando Imagen " + i);
            i = i + 1;
            if (i > 3) {
                i = 0;
            }
            if (i < 4) {
                //Con los valores de i de 0 a 9 se ejecutará miFuncion con una 
                //separación de velocidad milisegundos
                setTimeout(cambiarImagen, velocidad);  
            } 
        };
        //Una llamada a miFuncion
        setTimeout(cambiarImagen, velocidad); 
}());

console.log("====================================================================");
