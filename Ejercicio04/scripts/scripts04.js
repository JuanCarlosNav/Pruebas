///////////////////////////////////////////////////////
/*////////////////////////////////////////////////////
Ejercicio 1. Canificador
Realizar un módulo denominado Canificador que ofrezca la funcionalidad del 
método toCani, permitiendo configurar el final, el cual por defecto es "HHH".
Para ello, podremos realizar una llamada al módulo así:

Canificador.toCani({"texto": "Texto a canificar", "final":"ARGH"});

Haciendo uso de expresiones regulares, vamos a mejorar la funcionalidad para que 
sustituya las "ca", "co", "cu" por "ka", "ko", "ku", pero no así las "ce", "ci". 
Además, todas las ocurrencias de "qu" también se sustiuirán por "k", y 
las "ch" por "x".

También queremos almacenar el número de ocasiones que se ha invocado el método 
toCani, el cual se podrá consultar mediante Canificador.getTotal().

El módulo a su vez debe permitir descanificar una cadena mediante el 
método unCani, la cual pasará toda la cadena a minúsculas, sustituirá las 
letras k por c y eliminirá el final que haya introducido el Canificador. 
Esta operación reducirá en una unidad el número total de invocaciones del módulo.

Para comprobar que el módulo funciona correctamente, hay que desarrollar un 
suite de pruebas mediante QUnit que valide todas estas operaciones, usando las 
aserciones adecuadas así como indicando mediante expectativas el número de 
aserciones a probar, y creando un módulo tanto para toCani como para unCani.

Además, debéis utilizar la siguiente plantilla para visualizar el funcionamiento:
<textarea id="texto">Cecilia me ha dicho que este es el texto a canificar</textarea>
<button id="caniar">Caniar</button>
<button id="descaniar">Descaniar</button>
<br />
Resultado: <div id="resultado"> </div>
<br />
Total: <div id="total"></div>
///////////////////////////////////////////////////////
//*////////////////////////////////////////////////////
console.log("====================================================================");
console.log("Ejercicio 1. Modulo con 3 metodos. Prueas QUnit");
console.log("====================================================================");
// Función que efectúa una modificación sobre un strig que recibe como parámetro.
// El resultado es el mismo String pero sus caracteres van alternando entre mayúsculas
// y minúsculas (empezando por mayúsculas), adicionalmente, el caracter c es sustituido
// por el caracter k y finalmente se le añaden 3 caracteres HHH al final del string
var Canificador = (function () {

    var contadorUsos = 0;
    var endString = "";
    var ultCadena = "";

    return {

        //sustituya las "ca", "co", "cu" por "ka", "ko", "ku", pero no así las "ce", "ci". 
        //Además, todas las ocurrencias de "qu" también se sustiuirán por "k", y 
        //las "ch" por "x". guarde el número de usos en contadorUsos
        toCani : function() {

            //compruebo si recibo un parámetro
            let misArgs = arguments[0] || ''; 
            //Compruebo si el parámetro recibido contiene las propiedades texto y final
            //si no es así les asigno un valor vacío
            let string = misArgs.texto || '';  
            let finString = misArgs.final || '';  

            string = string.replace(/(ca|co|cu)/ig, function(str) {
                return str.replace ("c","k");
            })

            string = string.replace(/(qu)/ig, "k");
            string = string.replace(/(ch)/ig, "x");

            let result = "";
            let caracter ="";
            for (i=0;i<string.length;i++) {
                caracter = string[i];
                caracter = caracter.toLowerCase();   
                //Los caracteres impares los paso a mayúsculas (el array comienza por 0)        
                if ( i % 2 === 0) {
                    result += caracter.toUpperCase();
                } else {
                    result += caracter.toLowerCase(); 
                }
            }
            result += finString;
            endString = finString;
            ultCadena = result;
            ++contadorUsos;
            return result;
        },

        //pasa toda la cadena a minúsculas, sustituirá las letras k por c y elimina 
        //el final que haya introducido el Canificador. Reduce el contador de Usos. 
        unCani : function () {
            //compruebo si recibo un parámetro
            let misArgs = arguments[0] || ''; 
            //Compruebo si el parámetro recibido contiene las propiedades texto y final
            //si no es así les asigno un valor vacío al texto y al final le asigno 
            //el último final que ha aplicado el módulo.
            let string = misArgs.texto || ultCadena;  
            let finString = misArgs.final || endString;  
            //Genero una expresion regular basada en el último final asignado
            let varFiltro = new RegExp( endString + "$");

            //Añado las ku, pero hay que tener en cuenta que puede haber alguna
            //palabra válida que tenga ku (kung-fu, kurdo, kuwaití, arresku ...)
            //es por lo mismo que no se sustituye la x por ch.
//            result = string.replace(/ku/ig,"qu");
 //           result = string.replace(/ke/ig,"que");
//            result = result.replace(/ki/ig,"qui");
//            result = result.replace(/que/ig,"que");


            result = string.replace(/k/ig,"c");
            result = result.replace(varFiltro,"");
            result = result.toLowerCase();

            --contadorUsos;
            return result;
        },

        getTotal : function () {
            return contadorUsos;
        } 
    }
})();

///////////////////////////////////////////////////////
///// PRUEBAS DE FUNCIONAMIENTO DE LAS FUNCIONES //////
/*////////////////////////////////////////////////////
var pruebas = "En mi casita tengo una cerca para que los caballos no me llenen el cesped de charcos"
console.log(Canificador.toCani({"texto": pruebas, "final":"ARGH"}));
console.log(Canificador.getTotal());
pruebas = "Cecilia me ha dicho que este es el texto a canificar";
console.log(Canificador.toCani({"texto": pruebas, "final":"ORGGG"}));
console.log(Canificador.getTotal());
console.log(Canificador.unCani());
console.log(Canificador.getTotal());
console.log(Canificador.unCani());
console.log(Canificador.getTotal());
///////////////////////////////////////////////////////
//*////////////////////////////////////////////////////


var textArea = document.getElementById('texto');
var texto = textArea.value;
var btnCaniar=document.getElementById('caniar');
var resultado = document.getElementById('resultado');
var total = document.getElementById('total');
btnCaniar.onclick = function(){ 
    texto = textArea.value;
    let textoResult = Canificador.toCani({"texto": texto, "final":"ARGH"});
    let result = document.getElementById("result");
    let contador = document.getElementById("contador");

    let newText = document.createTextNode(textoResult);
    let newTotal = document.createTextNode(Canificador.getTotal());

    if (result === undefined || result == null) {
        result=document.createElement("p");
        result.id="result";
        result.appendChild(newText);
        resultado.appendChild(result);
    } else {
        result.textContent = textoResult;
    }

    if (contador === undefined || contador == null) {
        contador=document.createElement("p");
        contador.id="contador";
        contador.appendChild(newTotal);
        total.appendChild(contador);
    } else {
        contador.textContent = Canificador.getTotal();
    }
};

let btnDesCaniar=document.getElementById('descaniar');
btnDesCaniar.onclick = function(){ 
//    let textoResult = Canificador.unCani({"texto": texto, "final":"ARGH"});
    let textoResult = Canificador.unCani();
//    let resultado = document.getElementById('resultado');
    let result=document.getElementById("result");
    let contador = document.getElementById("contador");

    let newText = document.createTextNode(textoResult);
    let newTotal = document.createTextNode(Canificador.getTotal());

    if (result === undefined || result === null) {
        result=document.createElement("p");
        result.id="result";
        result.appendChild(newText);
        resultado.appendChild(result);
    } else {
        result.textContent = textoResult;
    }

    if (contador === undefined || contador == null) {
        contador=document.createElement("p");
        contador.id="contador";
        contador.appendChild(newTotal);
        total.appendChild(contador);
    } else {
        contador.textContent = Canificador.getTotal();
    }
};


console.log("====================================================================");

///////////////////////////////////////////////////////
///// PRUEBAS DE FUNCIONAMIENTO DE LAS FUNCIONES //////
/*////////////////////////////////////////////////////
Haciendo uso de LightBox (http://lokeshdhakar.com/projects/lightbox2/), 
implementa un carrusel de fotos.
///////////////////////////////////////////////////////
//*////////////////////////////////////////////////////

console.log("====================================================================");
console.log("Ejercicio 2. Incluir librerias de terceros. Pruebas ligthbox");
console.log("====================================================================");

console.log("====================================================================");
