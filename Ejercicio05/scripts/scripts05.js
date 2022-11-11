/*//////////////////////////////////////////////////////////////////////////////////
/////////////// /EJERCICIO 5.1 ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

Vamos a crear una aplicación que muestre información sobre Star Wars. Para ello, 
vamos a utilizar el API REST que ofrece 'The Star Wars API' en https://swapi.dev

Para ello, al cargar la página, vamos a mostrar un listado con las películas de Star Wars.

Al pulsar sobre el título de una película, se mostrará la sinopsis de la misma y un 
listado con un máximo de 10 personajes que aparecen en la misma.

Para ello, nos basaremos en la siguiente página:

<!DOCTYPE html>
<html>
<head>
<title>Ejercicio 51</title>
<meta charset="utf-8" />
</head>
<body>
  <h1>Star War API</h1>
  <h2>Películas - <span id="total"></span></h2>
  <ul id="peliculas"></ul>

  <h2>Sinopsis</h2>
  <div id="sinopsis"></div>

  <h2>Personajes</h2>
  <ul id="personajes"></ul>
  <script src="ej51.js"></script>
</body>
</html>

Y haciendo uso de AJAX y JSON, obtendremos el resultado 

//*/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


//Esta función no se utiliza. Sirve para recorrer un JSON y mostrar todos
//sus pares clave -> valor.
function recorreJSONorg(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === "object") {
                console.log("---------------------------------------> " + property) 
                recorreJSON(obj[property]);
            }
            else {
                console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
            }
        }
    }
}


//Esta función tampoco se utiliza. contiene la mejora de que 
//obtiene el valor de la clave qeu se pasa como parámetro.
//Si el objeto tiene Hijos sólo recorre aquellos que se pasa
//en el parámetro comp (compuesto).
//Recorre el JSON que se pasa como parámetro. Si se añada una
//clave, obtiene sólo el dato de esa clave.
//Si se añade un parametro comp (compuesto), obtiene todos los 
//hijos de la clave que se recibe. Hay que declarar la 
//variable global filtro.
let filtro;
function recorreJSON(obj,clave,comp) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === "object") {
                filtro = property;
                if (filtro === comp) {
//                    console.log("---------------------------------------> " + property);
                }
                recorreJSON(obj[property],clave,comp);
            }
            else {
                if (filtro === comp || property === clave) {
//                    console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
                    return obj[property];
                }
            }
        }
    }
}


//Recorre el JSON que se pasa como parámetro. 
//Guarda la información de los títulos de las películas
//en el array titulos, las id el array ids 
//y las url en el array urls.
var titulos = [];
var ids= [];
var urls=[];
function obtenPelis(obj) {
//    let salida = document.createElement(ul);
 //   var salida = [];

    for (var property in obj) {

        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === "object") {
 //               console.log("---------------------------------------> " + property) 
                obtenPelis(obj[property]);
            }
            else {
                
                if (property === "episode_id") {
                    ids.push(obj[property]);
//                    console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
                }
                if (property === "title") {
                    titulos.push(obj[property]);
//                    console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
                } 
                if (property === "url") {
                    urls.push(obj[property]);
//                    console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
                } 

//                console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
            }

        }
    }
//    return salida;
}


//Recorre el JSON que se pasa como parámetro. para obtener
//los sumarios de las películas y los persoajes.
//el sumario lo guarda en la primera posició del array
//perso y los personajes en las diez siguientes posiciones.
var perso=[];
function listarPersonajes(obj) {
//    let salida = document.createElement(ul);
 //   var salida = [];
    let li;
    let texto = "";
    let personajes = document.getElementById("personajes");
    for (var property in obj) {

        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === "object") {
                    console.log("---------------------------------------> " + property);
                listarPersonajes(obj[property]);
//                obtenPersonajes(obj[property]);
            }
            else {
                
                if (property === "name") {
                    texto = document.createTextNode(obj[property]);
                    li = document.createElement("li");
                    li.appendChild(texto);
                    personajes.appendChild(li);
                } 
                console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
            }

        }
    }
//    return salida;
}

//Función que ejecuta la consulta AJAX al servidor con la url que se 
//pasa como parámetro.
//En su respuesta recoge el personaje.
function obtenerPersonaje(urlpersonaje) {

    console.log("Personaje: " + urlpersonaje);
    let personajes = document.getElementById("personajes");
    while (personajes.firstChild) {
        personajes.firstChild.remove()
    }
//  Recorrer personajes y borrarlos
//    removeChild(nodoABorrar)
    var xhr = new XMLHttpRequest();
    xhr.open("GET",urlpersonaje, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            //Con el texto recibido, lo deserializamos en un objeto respuesta
            let respuesta = JSON.parse(xhr.responseText);

            console.log("================================================================");

            listarPersonajes(respuesta);


            for (var i = 0; i<perso.length;i++) {
                console.log("Personaje: -> " + perso[i]);                
            }
            perso = [];
        
//            console.log("----------------------------------------------------------------");
//            recorreJSON(respuesta,"title");
            console.log("================================================================");
        }
    };
    xhr.send(null);
}

//Recorre el JSON que se pasa como parámetro. para obtener
//los sumarios de las películas y los persoajes.
//el sumario lo guarda en la primera posició del array
//perso y los personajes en las diez siguientes posiciones.
//Los sumarios son una propiedad directa, pero los
//personajes hay que pasarlos de nuevo para volver a
//buscarlos uno a uno
var perso=[];
function obtenSumario(obj) {
//    let salida = document.createElement(ul);
 //   var salida = [];
    let contador = 0;
    let texto = "";

    for (var property in obj) {

        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] === "object") {
                filtro = property;
                if (filtro === "characters") {
                    console.log("---------------------------------------> " + property);
                    obtenSumario(obj[property]);
                }
//                obtenPersonajes(obj[property]);
            }
            else {
                
                if (property === "opening_crawl") {
                    sinopsis = document.getElementById("sinopsis");
                    texto = document.createTextNode(obj[property]);
                    sinopsis.appendChild(texto);
                    perso.push(obj[property]);
//                    console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
                } else {
                    if (contador < 10) {
                        ++contador;
                        obtenerPersonaje(obj[property]);
                    }
                }
                console.log("Clave: " + property + " - Valor: ---> " + obj[property]);
            }

        }
    }
//    return salida;
}

//Función que ejecuta la consulta AJAX al servidor con la url que se 
//pasa como parámetro.
//En su respuesta recoge las sinopsis de las películas y los personajes.
function getInfoPeli(urlpeli) {

    console.log("Película: " + urlpeli);
    var peliculas = document.getElementById("peliculas");
    var xhr = new XMLHttpRequest();
    xhr.open("GET",urlpeli, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            //Con el texto recibido, lo deserializamos en un objeto respuesta
            let respuesta = JSON.parse(xhr.responseText);

            console.log("================================================================");

            obtenSumario(respuesta);

            for (var i = 0; i<perso.length;i++) {
                console.log("Personaje: -> " + perso[i]);                
            }
            perso = [];
        
//            console.log("----------------------------------------------------------------");
//            recorreJSON(respuesta,"title");
            console.log("================================================================");
        }
    };
    xhr.send(null);
}

//Factoría de callback creada para asignar los callback a cada una de las 
//líneas utilizando una variable en la llamada a la función
function crearCallback(param) {
    return function() {
      getInfoPeli(param);
    };
  }

var resultado;

//Realiza la consulta AJAX al servidor y actualiza el DOM con la información
//de las películas.
function getData(url) {

    var xhr = new XMLHttpRequest();
    xhr.open("GET",url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            //Con el texto recibido, lo deserializamos en un objeto respuesta
            let respuesta = JSON.parse(xhr.responseText);

            console.log("================================================================");

            obtenPelis(respuesta);

            let peliculas = document.getElementById("peliculas");
            let li;
            let textTitulo;
            let textId;
            let a;

            for (var i = 0; i<titulos.length;i++) {
                
                li = document.createElement("li");
                a = document.createElement("a");

                textTitulo = document.createTextNode(titulos[i]);
                textId =document.createTextNode("(" + ids[i] + ") "); 

                a.setAttribute("href", "#");
                a.onclick = crearCallback(urls[i]);  

                a.appendChild(textTitulo);
                li.appendChild(textId);
                li.appendChild(a);
                peliculas.appendChild(li);
            }

            let total = document.getElementById("total");
            total.appendChild(document.createTextNode(titulos.length));

            titulos=[];
            ids=[];

//            titulos.forEach(function(valor, indice) {
//                console.log("["+indice+ "]="+ valor);
//            });
//            ids.forEach(function(valor, indice) {
//                console.log("[", indice, "]=", valor);
//            });
//            console.log(titulos);
//            console.log(ids);
//            console.log("----------------------------------------------------------------");
//            recorreJSON(respuesta,"title");
            console.log("================================================================");
        }
    };
    xhr.send(null);
}

getData('https://swapi.dev/api/films/');

let peliculas = document.getElementById("peliculas");
console.log(titulos);
console.log(ids);
//peliculas.innerHTML = resultado;
//elem.id = "conInner";

//pTres.parentNode.replaceChild(elem, pTres);
