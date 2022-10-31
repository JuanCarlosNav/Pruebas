/*//////////////////////////////////////////////////////////////////////////////////////////
//Ejercicios de Arrays y objetos
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
A partir del siguiente objeto el cual se crea mediante una función factoría:

function crearUsuario(usu, pas) {
  return {
    login: usu,
    password: pas,
    autenticar: function(usu, pas) {
      return this.login === usu && this.password == pas;
    }
  };
}

Refactoriza el código para que el password no se pueda consultar una vez creado el objeto 
Usuario, mediante una función constructor que haga uso de descriptores de datos y acceso.
El método autenticar queda como un método del objeto, es decir, no como una propiedad get/set.
////////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////////
console.log("================================================================================");
console.log("Ejercicio 1. Propiedades private");
console.log("================================================================================");

//Objeto Usuario. Simplemente crea un usuario y devuelve el resultado de autenticar.
function crearUsuario(usu, pas) {
    return {
        login: usu,
        password: pas,
        autenticar: function(usu, pas) {
            return this.login === usu && this.password == pas;
        }
    };
};

//Crea usuarios cuyo password no es accesible una vez creado. 
var CrearUsuarioOculto = function (usu,pas) {

    var pass = pas;
    Object.defineProperties(this, {
        login : {
            value : usu,
            writable : true,
            enumerable : true
        }
    }),
    this.autenticar = function (usuario,password) {
        console.log("usuario: " + this.login + " - pass: " + pass);
        return this.login === usuario && pass == password;
    };
};

var robin = new CrearUsuarioOculto("Robin", "Hood");
console.log(robin.autenticar("Robin","Hood"));
console.log(Object.keys(robin)); // Obtenemos un array con ["nombre", "apellido1"]
console.log(robin.pass);
console.log("================================================================================");

/*//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
Crea un objeto Persona que herede de Usuario, pero que añada atributos para almacenar el 
nombre y el email.

Al recuperar el nombre de una persona, si no tiene ninguno, debe devolver el login del 
usuario.
////////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////////
console.log("================================================================================");
console.log("Ejercicio 2. Herencia. accesos");
console.log("================================================================================");

//objeto usuario
var Usuario = function (usuario, pswd) {
    var pass = pswd;
    this.login = usuario;
    this.autenticar = function (usuario,password) {
        console.log("usuario: " + this.login + " - pass: " + pass);
        return this.login === usuario && pass == password;
    };
};
// Objeto que hereda de usuario.
var Persona = function (usuario, pswd, nombre, email) {
    Usuario.call(this,usuario,pswd);
//   var nomb = nombre;
    this.nomb = nombre;
    this.email = email;
};
Persona.prototype = Object.create(Usuario.prototype, {
    nombre : {
        get:function () {
            if (this.nomb) {
                console.log("EXISTE NOMBRE");
                return this.nomb;
            } else {
                console.log("NO EXISTE NOMBRE"); 
                return this.login;
            }
        }

    },
}); 

var batman = new Persona("Batman","pass","Bruce","batcave@batman.com");
console.log(batman.autenticar("Robin","ayudante"));
console.log(batman.nombre);

var superman = new Persona ("Clark","kent");
console.log(superman.autenticar("Clark","kent"));
console.log(superman.nombre);

console.log("================================================================================");

/*//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
Crear una función que reciba un objeto con enlaces a redes sociales, genere una cadena que contenga lista desordenada con imágenes a dichos enlaces:
Por ejemplo, a partir del siguiente objeto:
var socialMedia = {
  facebook : 'http://facebook.com/viewsource',
  twitter: 'http://twitter.com/planetoftheweb',
  flickr: 'http://flickr.com/planetotheweb',
  youtube: 'http://youtube.com/planetoftheweb'
};

Obtendríamos la siguiente lista:
<ul>
  <li><a href="http://facebook.com/viewsource">facebook</a></li>
  <li><a href="http://twitter.com/planetoftheweb">twitter</a></li>
  <li><a href="http://flickr.com/planetotheweb">flickr</a></li>
  <li><a href="http://youtube.com/planetoftheweb">youtube</a></li>
</ul>
////////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////////
console.log("================================================================================");
console.log("Ejercicio 3. Enumerar propiedades objeto");
console.log("================================================================================");

var socialMedia = {
    facebook : 'http://facebook.com/viewsource',
    twitter: 'http://twitter.com/planetoftheweb',
    flickr: 'http://flickr.com/planetotheweb',
    youtube: 'http://youtube.com/planetoftheweb'
  };

function devuelvePropiedades (objeto) {
    let salida = "<ul>\n";
    let valores = Object.values(objeto);
    //Para las claves:
    //for (var prop in objeto) {
    //    salida += "     " + "<li>" + prop + "</li>\n";
    //}
    for (let i = 0; i< valores.length; i++) {
        salida += "     " + "<li>" + valores[i] + "</li>\n";
    }
    salida += "</ul>\n";

    Object.entries(objeto).forEach(([key, value]) => {
        console.log(value);
        console.log(key);
    });
    console.log("FOREACH TRADICIONAL");
    Object.entries(objeto).forEach(function([key, value]) {
        console.log(value);
        console.log(key);
    });

    return salida;
};

/*//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
Sin utilizar las instrucciones for ni while, realiza las siguientes funciones:
Función reverseCopia(array) que a partir de un array, devuelva una copia del mismo pero en 
orden inverso (no se puede utilizar el método reverse).
Función union(array1, array2 [,…arrayN]) que a partir de un número variable de arrays, 
devuelva un array con la unión de sus elementos.. Cada elemento sólo debe aparecer una 
única vez.
////////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////////
console.log("================================================================================");
console.log("Ejercicio 4.Invertir un Array");
console.log("================================================================================");

//Utilizando forEach()
function miReverseArray(array) {
    let salida = [];
    if (Array.isArray(array)) {
        array.forEach(function(valor) {
            salida.unshift(valor);
        });
    };
    return salida;
};

//Utilizando map().
function reverseCopia (valor) {
    var salida = [];
    function revertir (valorfcn) {
        salida.unshift(valorfcn);
    }
    valor.map(revertir);
    return salida;
}

var frutas = ["naranja", "pera", "manzana", "uva", "fresa", "kiwi"];

//frutas.map(revetir);
console.log("Con funcion map: ");
console.log(frutas);
arrayPruebas = reverseCopia(frutas);
console.log(arrayPruebas);
console.log("Con foreach");
console.log(frutas);
console.log(miReverseArray(frutas));
console.log("================================================================================");

console.log("================================================================================");
console.log("Ejercicio 5. Mezclar Arrays sin repeticiones");
console.log("================================================================================");


function unir (araises) {
    salida = [];
    argumentos = Array.prototype.slice.call(arguments);

    //Funcion que incluye un elemento sólo si no estaba en array.
    function mezclaArrays (arrayUno,arrayDos) {
        var mezcla = arrayUno;
        function arrayIncluido(valor) {
            if (mezcla.indexOf(valor)===-1) {
                mezcla.push(valor);
            }
//            return mezcla;
        }

        //Con el método map va enviando todos los elementos a ser evaluados por la función.
        arrayDos.map(arrayIncluido);
        return mezcla;
    };

    //Con el método reduce() va enviando todos los elementos de 2 en dos a 
    //ser procesados por la funcion; en este caso mezclaArrays que va a añadir al primer
    //array aquellos elementos del segundo que no estuviesen previamente.
    salida = argumentos.reduce(function(anterior, actual) {
        return mezclaArrays(anterior, actual);
    });
    //Devuelve el resultado final de la operación.
    return salida;
}

//console.log(unir (2,2,3,4,4,4,4));

var frutas = ["naranja", "pera", "manzana", "uva", "fresa", "kiwi"];
var zumos = ["piña", "melocotón", "manzana", "naranja"];
var batidos = ["fresa", "coco", "chocolate"];
var sabores = unir(frutas, zumos, batidos);

console.log(frutas);
console.log(zumos);
console.log(batidos);
console.log(sabores);

var nombreChicos = ["Juan", "Antonio"];
nombreChicos.push("Pedro");
var nombreChicas = ["Ana", "Laura"];
var nombres = nombreChicos.concat(nombreChicas);

console.log(nombres);

var separadoConGuiones = nombres.join("-");
nombres.reverse();

console.log(nombres);

var alfa = nombres[3];
nombres.sort();
var iguales = (alfa == nombres[2]);

console.log(iguales);
console.log(nombres);
console.log(nombreChicos);
console.log(nombreChicas);
console.log(separadoConGuiones);

console.log("================================================================================");

/*//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
Define una función repetir dentro del objeto String para que acepte un entero con el número 
de ocasiones que tiene que repetir la cadena. Por ejemplo:
console.log("Viva JavaScript ".repetir(3));
////////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////////
console.log("================================================================================");
console.log("Ejercicio 6.Añadir métodos a objeto String");
console.log("================================================================================");

//Añadimos los métodos al prototipo
String.prototype.repetir = function(cantidad) {  
    if (isNaN(cantidad)) {
      return this;
    } else {
        let cadena = "";
        for (i=0;i<cantidad;++i) {
            cadena += this
        }
      return cadena;
    }
};

var micadena="hola-";

console.log(micadena.repetir(3));
console.log("Repite esto ".repetir(3));

console.log("================================================================================");
