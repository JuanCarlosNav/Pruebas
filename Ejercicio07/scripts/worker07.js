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


//Función que ejecuta la consulta AJAX al servidor con la url que se 
//pasa como parámetro.
//En su respuesta recoge las sinopsis de las películas y los personajes.
function getInfoUrl(url) {

console.log("Url solicitada: " + url);
    let resultado = "";
    let peliculas = document.getElementById("peliculas");
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            //Con el texto recibido, lo deserializamos en un objeto respuesta
            let respuesta = JSON.parse(xhr.responseText);

            console.log("================================================================");

            resultado = recorreJSON(respuesta,"count");


            //Devolver el resultado:
            return resultado;

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

/*//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// onmessage = (evt) => { postMessage(+evt.data.a + +evt.data.b); };

self.addEventListener('message', function(evt) {  
    var mensaje = evt.data; 
  
    self.postMessage("Hola " + mensaje);  
});
//*//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// Waits for any activity from the page
self.onmessage = function(entrada) {
    let texto = "";
    if(entrada.data !== undefined) {
        // Do work 
        texto = getInfoUrl(entrada.data);
        // Posting back to the page
        self.postMessage(texto);

        self.close();
    }
}