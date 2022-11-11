// Chrome limita la ejecución de workers desde su fuunción
//--allow-file-access-from-files, desde firefox tampoco he 
//podido cargarlo por el mismo motivo: No se permite ejercutar
//archivos javascript desde otros archivos en modo local.
//así que no he podido testar
//este script :(

let total = document.getElementById("total");
let texto = "No se puede ejecutar este test en modo local debido a restricciones de seguridad en el navegador."
while (total.firstChild) {
    total.firstChild.remove();
}
texto = document.createTextNode(texto);
total.appendChild(texto);


let workerpeople = new Worker("scripts/worker07.js");

let numElementos = 0;
workerpeople.onmessage = function(evt) {  

console.log("El worker me ha contestado!");
console.log("Y me ha enviado " + evt.data);
console.log("La salida será algo así como:");
console.log("<li>people="+evt.data+"</li>")

    let peliculas = document.getElementById("elementos");
    let li;
    let texto;
    li = document.createElement("li");
    texto =document.createTextNode("people=" + evt.data); 
    li.appendChild(texto);
    ++numElementos;
    peliculas.appendChild(li);
    let total = document.getElementById("total");
    while (total.firstChild) {
        total.firstChild.remove();
    }
    texto = document.createTextNode(numElementos);
    total.appendChild(texto);
};
  
let url = "https://swapi.dev/api/people";
workerpeople.postMessage(url);

//La técnica a partir de aqui es la misma: se crea un webworker para cada una
//de las url (let workerplanets = new Worker("scripts/worker07.js"))
//y en el onmessage se carga el nuevo dato a la vez que se 
//actualiza el total, por último se envía el mensaje con la nueva url
//workerplanets.postMessage(url);

//Los planetas
workerplanets = new Worker("scripts/worker07.js");

workerplanets.onmessage = function(evt) {  

    let peliculas = document.getElementById("elementos");
    let li;
    let texto;
    li = document.createElement("li");
    texto =document.createTextNode("people=" + evt.data); 
    li.appendChild(texto);
    ++numElementos;
    peliculas.appendChild(li);
    let total = document.getElementById("total");
    while (total.firstChild) {
        total.firstChild.remove();
    }
    texto = document.createTextNode(numElementos);
    total.appendChild(texto);
};
  
url = "https://swapi.dev/api/planets";
workerplanets.postMessage(url);

//Los films
workerfilms = new Worker("scripts/worker07.js");

workerfilms.onmessage = function(evt) {  

    let peliculas = document.getElementById("elementos");
    let li;
    let texto;
    li = document.createElement("li");
    texto =document.createTextNode("people=" + evt.data); 
    li.appendChild(texto);
    ++numElementos;
    peliculas.appendChild(li);
    let total = document.getElementById("total");
    while (total.firstChild) {
        total.firstChild.remove();
    }
    texto = document.createTextNode(numElementos);
    total.appendChild(texto);
};
  
url = "https://swapi.dev/api/films";
workerfilms.postMessage(url);

//las especies
workerspecies = new Worker("scripts/worker07.js");

workerspecies.onmessage = function(evt) {  

    let peliculas = document.getElementById("elementos");
    let li;
    let texto;
    li = document.createElement("li");
    texto =document.createTextNode("people=" + evt.data); 
    li.appendChild(texto);
    ++numElementos;
    peliculas.appendChild(li);
    let total = document.getElementById("total");
    while (total.firstChild) {
        total.firstChild.remove();
    }
    texto = document.createTextNode(numElementos);
    total.appendChild(texto);
};
  
url = "https://swapi.dev/api/species";
workerspecies.postMessage(url);

//Los vehículos
workervehiculos = new Worker("scripts/worker07.js");

workervehiculos.onmessage = function(evt) {  

    let peliculas = document.getElementById("elementos");
    let li;
    let texto;
    li = document.createElement("li");
    texto =document.createTextNode("people=" + evt.data); 
    li.appendChild(texto);
    ++numElementos;
    peliculas.appendChild(li);
    let total = document.getElementById("total");
    while (total.firstChild) {
        total.firstChild.remove();
    }
    texto = document.createTextNode(numElementos);
    total.appendChild(texto);
};

url = "https://swapi.dev/api/vehicles";
workerspecies.postMessage(url);

//Y las naves
workernaves = new Worker("scripts/worker07.js");

workernaves.onmessage = function(evt) {  

    let peliculas = document.getElementById("elementos");
    let li;
    let texto;
    li = document.createElement("li");
    texto =document.createTextNode("people=" + evt.data); 
    li.appendChild(texto);
    ++numElementos;
    peliculas.appendChild(li);
    let total = document.getElementById("total");
    while (total.firstChild) {
        total.firstChild.remove();
    }
    texto = document.createTextNode(numElementos);
    total.appendChild(texto);
};

url = "https://swapi.dev/api/starships";
workernaves.postMessage(url);

