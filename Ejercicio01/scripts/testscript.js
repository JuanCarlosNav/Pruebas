//Ejercicios básicos Javascript
// suma dos números
function suma (numero1,numero2) {
    let resultado = numero1 + numero2;
    return resultado;
}

//resta dos números
function resta (numero1,numero2) {
    let resultado = numero1 - numero2;
    return resultado;
}

//multiplica 2 números
function multiplica (numero1,numero2) {
    let resultado = numero1 * numero2;
    return resultado;
}

//Divide 2 números
function divide (dividendo,divisor) {
    let resultado = 'error';
    if (divisor !== 0) {
        resultado = dividendo / divisor;
    } else {
        resultado = 'error';
    }
    return resultado;
}

//Ordena un array. Si el array es numérico lo ordena de 
//menor a mayor, si contiene algún elemento alfanumérico
//lo ordena por orden alfabético.
function ordenarArray (array) {
    if (Array.isArray(array)) {
        let isnumero = true;
        array.forEach(function(elemento) {
            if (typeof elemento !== 'number'){
                isnumero = false;
            };
        });

        if (isnumero) {
            array.sort(function (a, b){
                return a - b;
            })
        } else {
            array.sort();
        }
        
    }
    return array;
}

//Comprobacción de las funciones, muestra los resultados por consola
//Opreaciones con números
let operando1 = 25;
let operando2 = 5;
console.log("Suma de " + operando1 + " + " + operando2 + " = " + suma(operando1,operando2));
console.log("Producto de " + operando1 + " x " + operando2 + " = " + multiplica(operando1,operando2));
console.log("Resta de " + operando1 + " - " + operando2 + " = " + resta(operando1,operando2));
console.log("División de " + operando1 + " / " + operando2 + " = " + divide(operando1,operando2));

//Operaciones sobre los arrays
let array1 = [1, 10, 25, 17, 75, 3, 122];

array1=ordenarArray(array1);
console.log("Array numérico: " + array1);

let array2 = [1, 'Cuenca', 25, 'Segovia', 75, 'Alicante', 122];
array2 = ordenarArray(array2);
console.log("Array alfanumérico: " + array2);

//Coge la imagen de la página, cuyo ID sea miimagen y le añade un listener
//de tal forma que cuando el usuario iteractúa sobre ella cambia entre dos
//imágenes que se van alternando en cada iteracción
let miImage=document.querySelector('#miimagen');
miImage.onclick = function(){
    let miSrc = miImage.getAttribute('src');
//    let miImagen = miImage.getAttribute('name');
//    if (miSrc === "images/sendweb.jpg" && miImagen === "miimagen") {
    if (miSrc === "images/sendweb.jpg") {
        miImage.setAttribute('src','images/incidenciasweb.jpg');
        console.log("Nuevo atributo: images/incidenciasweb.jpg");
    } else {
        miImage.setAttribute('src',"images/sendweb.jpg");
        console.log("Nuevo atributo: images/sendweb.jpg");
    }
//    location.reload();
}

//Al botón cuyo ID es enviar, se le asigna un listener para que cuando
//sea accionado por el usuario muestre un mensaje en el navegador que 
//indique que se ha enviado una incidencia indicando el tipo de 
//incidencia y la incidencia enviada
let botonenviar = document.querySelector('#enviar');
botonenviar.onclick = function(){
    let tipoincidencia = document.getElementById("seleccion");
    let incidencia = document.getElementById("incidencia");
    alert("Incidencia enviada: " + tipoincidencia.value + " - " + incidencia.value)
}

//Aquí se inicia el comportamiento del segundo formulario de la página
//que va efectuando operaciones según los datos introducidos por el usuario
//y los botones pulsados (operaciones solicitadas)
//Los resultados se van agregando a un array vacío que se guarda como "histórico"
let miarray = [];
//resultado es una zona de la página cuyo id es resultado (al final de la página)
let resultado = document.querySelector('#resultado');

//Cojo las referencias de los dos campos que tienen los números
let elem1 = document.getElementById('num1');
let elem2 = document.querySelector('#num2');
let valor1 = 0;
let valor2 = 0;

//Listener del botón cuya id es sumar
let sumar=document.querySelector('#sumar');
sumar.onclick = function(){
    valor1 = Number(elem1.value);
    valor2 = Number(elem2.value);
    if (valor1 === NaN) {
        valor1 = 0;
    }
    if (valor2 === NaN) {
        valor2 = 0;
    }
    //En la zona de resultados muestro el resultado de la operación
    resultado.textContent = "Resultado: " + suma(valor1,valor2);
    //lo añado al Array
    miarray.push(suma(valor1,valor2));
}

//Listener del botón cuyo id es restar
let restar=document.querySelector('#restar');
restar.onclick = function(){
    valor1 = Number(elem1.value);
    valor2 = Number(elem2.value);
    if (valor1 === NaN) {
        valor1 = 0;
    }
    if (valor2 === NaN) {
        valor2 = 0;
    }
    //muestro el resultado en la zona de resultados
    resultado.textContent = "Resultado: " + resta(valor1,valor2);
    //Añado el resultado al Array
    miarray.push(resta(valor1,valor2));
}

//Listener del botón cuya id es multiplicar
let multiplicar=document.querySelector('#multiplicar');
multiplicar.onclick = function(){
    valor1 = Number(elem1.value);
    valor2 = Number(elem2.value);
    if (valor1 === NaN) {
        valor1 = 0;
    }
    if (valor2 === NaN) {
        valor2 = 0;
    }
    //Muestro el resultado en la zona de resultados
    resultado.textContent = "Resultado: " + multiplica(valor1,valor2);
    //Añado el resultado al Array
    miarray.push(multiplica(valor1,valor2));
}

//Listener del botón cuyo id es dividir
let dividir=document.querySelector('#dividir');
dividir.onclick = function(){
    valor1 = Number(elem1.value);
    valor2 = Number(elem2.value);
    if (valor1 === NaN) {
        valor1 = 0;
    }
    if (valor2 === NaN) {
        valor2 = 0;
    }
    //Muestro el resultado de la operación
    resultado.textContent = "Resultado: " + divide(valor1,valor2);
    //Añado el resultado al Array
    miarray.push(divide(valor1,valor2));
}

//Listener del botón cuyo id es array
//Muestra el contenido del Array convenientemente ordenado
let verarray=document.querySelector('#array');
verarray.onclick = function(){
    resultado.textContent = "Resultados obtenidos: " + ordenarArray(miarray);
}


//Otros tipos de variables/Funciones
//Fechas: objeto Date, se pasa, año número del mes (empezando por el 0=enero), día, hora, minuto, segundo
var cenaNochevieja = new Date(2014, 11, 31, 22, 30, 0);
console.log(cenaNochevieja);
//Obtiene un número con el año
var anyo = cenaNochevieja.getFullYear();
console.log(anyo);
//Obtiene el número del mes (0=enero, 11=diciembre)
var mes = cenaNochevieja.getMonth();
console.log(mes);
//Número que representa el día
var diaMes  = cenaNochevieja.getDate();
console.log(diaMes);

//A la fecha anterior le añado un día (setDate fija el día, así que paso al día siguiente, día 32)
//Después obtengo un nuevo objeto con la fecha que le paso.
//El resultado son 2 objetos que contienen la misma fecha (el día siguiente a la fecha introducida)
var fechafutura = new Date(cenaNochevieja.setDate(diaMes + 1));
console.log(fechafutura);
console.log(cenaNochevieja);

// Función que efectúa una modificación sobre un strig que recibe como parámetro.
// El resultado es el mismo String pero sus caracteres van alternando entre mayúsculas
// y minúsculas (empezando por mayúsculas), adicionalmente, el caracter c es sustituido
// por el caracter k y finalmente se le añaden 3 caracteres HHH al final del string
function ejercicio1(string) {
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

console.log(ejercicio1("La salida de esta frase estará manipulada"));

//Funcion timer. Comprueba el número de parámetros que recibe, si recibe
//uno serán segundos, si recibe dos el primero serán minutos y el segundo
//segundos, el resto de parámetros será ignorado. Con estos datos
//irá mostrando en consola cada segundo un descuento desde el total de segundos
//(minutos * 60 + segundos) hasta que el contador llegue a cero.
function ejercicio2() {
    
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

    //Si losparámetros que entran no son números, los valores se inician a 0
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

//ejercicio2();
//ejercicio2("error",5);
//ejercicio2(1,"error");
//ejercicio2("error","error");
//ejercicio2(1,5);
ejercicio2(0,5);

function creaPersona(nom, ape1) {
    var persona = {};
  
    Object.defineProperties(persona, {
        nombre: {
            value: nom,
            writable: true
        },
        apellido1: {
            value: ape1,
            writable: false
        },
        nombreCompleto: {
            get: function() { 
    //          return this.nombre + " " + this.apellido1;
            return this.nombre;
            },
            //En este caso hemos definido apellido1 como de no escritura, 
            //así que no cambiará su valor.
            set: function(valor) {  
            this.nombre = valor;
            this.apellido1 = valor;
            }
        }
    });
  
    return persona;
}

var batman = creaPersona("Bruce", "Wayne");
console.log(batman.nombreCompleto); // Bruce Wayne (llama al “get”)
batman.nombreCompleto = "Bruno Díaz"; //llama a la función set
console.log("COMPROBANDO" + batman.nombreCompleto); // Bruno Díaz Wayne (el apellido1 no cambia, 

var nombre = "Bruce Wayne";
console.log(nombre.slice(6,9)); // "Way" (desde el carácter 6 hasta el ANTERIOR al 9.

var heroe = {
    nombre: "Superheroe",
    saludar: function() {
      return "Hola " + this.nombre;
    },
    despedirse: function(enemigo1, enemigo2) {
      var malos = enemigo2 ? (enemigo1 + " y " + enemigo2) : enemigo1;
      return "Adios " + malos + ", firmado:" + this.nombre;
    }
};
  
//Crear un objeto con sólo un nombre
var batman = { nombre: "Batman" };
var spiderman = { nombre: "Spiderman" };
  
//llamar al método despedirse del objeto heroe
console.log(heroe.despedirse()); // Adios undefined, firmado:Superheroe
//Le asigno el método despedirse() al objeto batman y lo llamo, los parámetros necesarios
//hay que pasárselos con un array.
console.log(heroe.despedirse("Prueba1","heroica1"));

console.log(heroe.despedirse.apply(batman, ["Joker", "Dos caras"])); // Adios Joker y Dos caras, firmado:Batman
//En este caso le paso los dos parámetros de forma tradicional.
console.log(heroe.despedirse.call(spiderman, "Duende Verde", "Dr Octopus")); // Adios Duende Verde y Dr Octopus, firmado:Spiderman

console.log(heroe.despedirse("Prueba2","heroica2"));
// console.log(spiderman.despedirse("Joker","Dos caras"));

var nombre = 'Bruce Wayne';
var obj = {
    nombre: 'Bruno Díaz',
    prop: {
        nombre: 'Aitor Medrano',
        getNombre: function() {
        return this.nombre;
        }
    }
};
console.log(obj.prop.getNombre());
var test = obj.prop.getNombre;
console.log(test());

var heroes = ["Batman", "Superman", "Ironman", "Thor"];

//function mayus(valor, indice, array) {
function mayus(valor) {
    return valor.toUpperCase();
}

var heroesMayus = heroes.map(mayus);
console.log(heroesMayus); // ["BATMAN", "SUPERMAN", "IRONMAN", "THOR"]

var varGlobal = "Esta es una variable global.";

var funcionGlobal = function(alfa) {
	var varLocal = "Esta es una variable local";

	var funcionLocal = function() {
		var varLocal = "¡Hola Mundo!";
		console.log(varLocal);
		console.log(alfa);
	};

	funcionLocal();
	console.log(varLocal);
};

// console.log(varLocal)
funcionGlobal(2);