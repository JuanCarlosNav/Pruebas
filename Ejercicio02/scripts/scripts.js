//Comprobación de que las entradas de datos de un formulario son correctas
//La mayoría de estas comprobaciones se pueden hacer directamente con 
//HTML 5. Esto se raliza a modo de ejercicio.

//Comprueba que una cadena tiene un formato correcto 
//(letras mayúsculas y minúsculas, espacios, números, comas y guiones)
function validarCampo (entrada,len) {
    //Longitud por defecto 10
    if (len === NaN) {
        len = 10;
    }
    entrada = entrada.substring(0,len);

    let patron = /[^0-9A-Za-zÑñ, -]/
    return !patron.test(entrada);

}

console.log(/[0123456789]/.test("en 2015")); //true
var expresion = /\d{1,2}-\d{1,2}-\d{4}/;
console.log(expresion.test("31-01-2015"));	// true
console.log(expresion.test("31-01-2015asf"));	// true

var expresionvalida = /(\d|\w){15}/g;
expresionvalida  = /[^0-9A-Za-zÑñ, -]/;
var entrada = "añlfjsa-, %df lasjfaf fjds fj lñajfddfñafdj afdj ";

console.log("===================================================");
var primeravalidacion = entrada.substring(0,15);
console.log(primeravalidacion);
console.log(expresionvalida.test(primeravalidacion));
console.log(expresionvalida.exec(primeravalidacion));
console.log(expresionvalida.exec(primeravalidacion)[0]);

console.log("===================================================");
entrada = "añlfjsa-, %df lasjfaf fjds fj lñajfddfñafdj afdj ";
console.log(validarCampo(entrada,16));
console.log(entrada);
console.log(typeof entrada);
console.log("===================================================");
console.log("===================================================");
console.log("===================================================");

//Constructor del objeto formulario, sus campos son los mismos que el 
//formulario.
var Formulario = function (dnient,nombreent,calleent,numeroent,cpostalent,munent,provinciaent) {

/*
    dni = dnient.substring(0,lenDni);
    calle = calleent.substring(0,lenCalle);
    numero = numeroent.substring(0,lenNumero);
    cpostal = cpostalent.substring(0,lenCpostal);
    municipio = munent.substring(0,lenMunicipio);
    provincia = provinciaent.substring(0,lenProvincia);
*/
    this.errores = []; 
    //Comprobar los tipos de los parámetros
    if ( (!(typeof nombreent) === 'string') || (nombreent === undefined)) {
        nombreent = "";
        this.errores.push("Hay un error en el formato del Nombre");
    }
    if ( (!(typeof dnient) === 'string') || (dnient === undefined)) {
        dnient = "";
        this.errores.push("Hay un error en el formato del DNI");
    }
    if ( (!(typeof calleent) === 'string')  || (calleent === undefined) ) {
        calleent = "";
        this.errores.push("Hay un error en el formato de la calle");
    }
    //Número puede tener el literal "s/n"
    if (( !(typeof numeroent) === 'string') || (numeroent === undefined) ) {
        numeroent = "";
        this.errores.push("Hay un error en el formato del número"); 
    }
    if ( (!(typeof cpostalent) === 'string') || (cpostalent === undefined) ){
        cpostalent = "";
        this.errores.push("Hay un error en el formato del código postal");
    }
    if ( (!(typeof munent) === 'string') || (munent === undefined) ) {
        munent = "";
        this.errores.push("Hay un error en el formato del municipio");
    }
    if ( (!(typeof provinciaent) === 'string') || (provinciaent === undefined) ) {
        provinciaent = "";
        this.errores.push("Hay un error en el formato de la provincia");
    }

    this.nombre = nombreent;
    this.dni = dnient;
    this.calle = calleent;
    this.numero = numeroent;
    this.cpostal = cpostalent;
    this.municipio = munent;
    this.provincia = provinciaent;

//    this.checkDni();
//    this.checkCampos();
};

//Chequea si el DNI tiene un formato correcto
Formulario.prototype.checkDni = function() {
    let lenDni = 9;
    this.dni = this.dni.substring(0,lenDni);
    //Patrón para un CIF/NIF válido
    let patroncif = new RegExp(/^[A-Z0-9]{1}[0-9]{7}[A-Z0-9]{1}$/);
    //Si el DNI no es válido se deja vacío
    if (!patroncif.test(this.dni)) {
        this.dni = "";
        this.errores.push("Hay un error en el DNI");
    }
    enumerable : false;
}

//Chequea que los campos son correctos. Los errores los almacena en
//un array. Si el array está vacío es que los campos son correctos.
Formulario.prototype.checkCampos = function () {
    let lenNombre = 40,
        lenCalle = 40,
        lenNumero = 4,
        lenCpostal = 5,
        lenMunicipio = 40,
        lenProvincia = 25;
    
    this.errores = []; 

    //La expresion indica que NO contiene los caracteres
//    let expresion = /[^0-9A-Za-zÑñ, -\/]/;

    const expresion = new RegExp('^[A-Z0-9\/ ]+$', 'i');

    //Compruebo que los campos tinen caracteres válidos
    //Si no son válidos los dejo vacíos.
    if (expresion.test(this.nombre)) {
        this.nombre = this.nombre.substring(0,lenNombre);
    } else {
        this.nombre = "";
        this.errores.push("Hay un error en el Nombre");
    }
    if (expresion.test(this.calle)) {
        this.calle = this.calle.substring(0,lenCalle);
    } else {
        this.calle = "";
        this.errores.push("Hay un error en la calle");
    }
    if (expresion.test(this.numero)) {
        this.numero = this.numero.substring(0,lenNumero);
    } else {
        this.numero = "";
        this.errores.push("Hay un error en el número de la dirección");
    }
    if (expresion.test(this.cpostal)) {
        this.cpostal = this.cpostal.substring(0,lenCpostal);
    } else {
        this.cpostal = "";
        this.errores.push("Hay un error en el Código Postal");
    }
    if (expresion.test(this.municipio)) {
        this.municipio = this.municipio.substring(0,lenMunicipio);
    } else {
        this.municipio = "";
        this.errores.push("Hay un error en el Municipio");
    }
    if (expresion.test(this.provincia)) {
        this.provincia = this.provincia.substring(0,lenProvincia);
    } else {
        this.provincia = "";
        this.errores.push("Hay un error en la Provincia");
    }

    this.validarcif();
}

//*///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//Validar NIF, CIF Y NIE
//Devuelve el dígito correcto. 
Formulario.prototype.validarcif = function(cif) {
    if (cif === undefined) {
        if (this.dni === undefined) {
            this.dni = "";
        }
        cif = this.dni;
    }
    cif = cif.toUpperCase();
    let num = cif.split("");
    let dc = num[8];
    let patroncif = new RegExp(/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/);
    let patronnif = new RegExp(/^[0-9]{8}[A-Z]{1}$/);
    let modulo = 0;
    let suma = 0;
    let ctrl = 0;
    //si no tiene un formato valido devuelve error
    if (!patroncif.test(cif) && !patronnif.test(cif)) {
        this.errores.push("Hay un error en el CIF");
		return -1;
    }
    //NIF que empiezan por XYZ
    if (num[0] === "X"){
        num[0] = "0";
    } else {
        if (num[0] === "Y") {
            num[0] = "1";
        } else {
            if (num[0] === "Z") {
                num[0] = "2";
            }
        }
    }
    cif=num.join('');

//comprobacion de NIFs estandar
    if ( patronnif.test(cif) ) {
        modulo = parseInt(cif.substring(0, 8)) % 23;
        dc = 'TRWAGMYFPDXBNJZSQVHLCKE'.substring(modulo, modulo+1);
        if (dc !== num[8]) {
            this.errores.push("El dígito de control del DNI es erróneo");
        }
        return dc;
    }

//algoritmo para comprobacion de codigos tipo CIF
    suma = parseInt(num[2]) + parseInt(num[4]) + parseInt(num[6]);
    for (var i = 1; i < 8; i += 2) {
        suma += Math.trunc(parseInt(num[i]) * 2/10);
        suma += parseInt(num[i]) * 2 % 10;
    }
    ctrl = 10 - (suma % 10);

//comprobacion de NIFs especiales (se calculan como NIFs)
    if (  /^[KLM]{1}/.test(cif) ) {
//   	    if ( /^[A-Z]{1}/.test(num[8]) ) {
//   		    dc = String.fromCharCode(64+ctrl).toUpperCase();
//   	    }else{ 
//            modulo = parseInt(cif.substring(1, 8)) % 23;
//            dc = 'TRWAGMYFPDXBNJZSQVHLCKE'.substring(modulo, modulo+1);
//        }
        modulo = parseInt(cif.substring(1, 8)) % 23;
        dc = 'TRWAGMYFPDXBNJZSQVHLCKE'.substring(modulo, modulo+1);
        if (dc !== num[8]) {
            this.errores.push("El dígito de control del DNI es erróneo");
        }
        return dc;
    }

//comprobacion de CIFs.
    //Si el dígito de control es una letra.
    if (/^[NPQRSW]{1}/.test(cif)) {
        dc = String.fromCharCode(64+ctrl).toUpperCase();
    }else{
        if (ctrl === 10) {
            ctrl = 0;
        }
        dc = String(ctrl);
    }
    if (dc !== num[8]) {
        this.errores.push("El dígito de control del CIF es erróneo");
    }
    return dc;
}
//*///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

console.log ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
console.log ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

let formDni = document.querySelector('#dni');
let formNombre = document.querySelector('#nombre');
let formCalle = document.querySelector('#calle');
let formNumero = document.querySelector('#numero');
let formMun = document.querySelector('#mun');
let formCpostal = document.querySelector('#cpostal');
let formProvincia = document.querySelector('#prov');
let botonEnviar = document.querySelector('#enviar');
let estado = document.querySelector('#estado');

let formLogo = document.querySelector('#logo');


var comprobarFormulario = function () {

    let ul,li,newText,estado;
    let dni = formDni.value;
    let nombre = formNombre.value;
    let calle = formCalle.value;
    let numero = formNumero.value;
    let mun = formMun.value;
    let cPostal = formCpostal.value;
    let provincia = formProvincia.value;
    
    let salida = false;

    var formulario = new Formulario(dni,nombre,calle,numero,cPostal,mun,provincia);
//    formulario.checkDni();
    formulario.checkCampos();

    if (formulario.errores.length > 0) {
        estado = document.getElementById("estado");

        ul = document.getElementById("resultado");

        if (ul !== undefined && ul !== null) {
            estado.removeChild(ul);
        }

        ul=document.createElement("ul");
        ul.id="resultado";
        li=document.createElement("li");

//        let salida = "";
        for (let i = 0; i< formulario.errores.length; i++) {
            newText = document.createTextNode(formulario.errores[i]);
            li=document.createElement("li");
            li.appendChild(newText);
            ul.appendChild(li);
//            salida += formulario.errores[i] + "<br/>\n";
        }

        estado.appendChild(ul);
/*
        let salida = "<ul>\n";

        for (let i = 0; i< formulario.errores.length; i++) {
            salida += "     " + "<li>" + formulario.errores[i] + "</li>\n";
        }
        salida += "</ul>\n";
*/
//        estado.textContent = salida;
    } else {
        salida = true;
    }
    console.log("funcionComprobar");
    return salida;
}

// Asigna la función al envío de información del formulario.
function manejadoresFormularios() {
    document.getElementById("formDatos").onsubmit = function() {
        var ok = false;
        if (comprobarFormulario()) {
            ok = true;
        }
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
manejadoresFormularios();

//pruebas (Todos los datos son aleatorios).
let dniForm = "A16251209";
let calleForm = "calle Pruebas";
let numeroForm = "S/N";
let cpostalForm = "16000";
let munForm = "El Municipal";
let provForm = "mUNICIPOIa";
var formularioTest = new Formulario(dniForm,calleForm,numeroForm,cpostalForm,munForm,provForm);
console.log ("------------------------CHEQUEO CAMPOS");
formularioTest.checkCampos();

Object.entries(formularioTest).forEach(function([key, value]) {
	console.log("Propiedad: " + key + " - Valor: " + value);
});

console.log("***=======================================================================");

dniForm = "98765432A";
calleForm = "Obj Err Cale Pruas$%''dfebas";
numeroForm = "ObjS/N";
cpostalForm = "28000";
munForm = "Obj Err El Municipal";
provForm = "Obj Err Provincia";

var formularioErr = new Formulario(dniForm,calleForm,numeroForm,cpostalForm,provForm);

formularioErr.checkCampos();

Object.entries(formularioErr).forEach(function([key, value]) {
	console.log("Propiedad: " + key + " - Valor: " + value);
});

console.log ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

//Uso de la función comprobar DNI (si tiene formato válido)
function compruebaDni (dni) {
    if (formularioTest.checkDni(dni)) {
        console.log("El Dni " + formularioTest.dni + " es válido.");
    } else {
        console.log("El DNI " + formularioTest.dni + " NO es válido.");
    }
}

formularioTest.dni = "alfsjflñadsañdfjla";

compruebaDni(formularioTest.dni);

console.log ("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

let patroncif = new RegExp(/^[A-Z0-9]{1}[0-9]{7}[A-Z0-9]{1}$/);

cif = "12345678A";
console.log(cif +" es un CIF ->" + patroncif.test(cif));
cif = "B1345678A";
console.log(cif +" es un CIF ->" + patroncif.test(cif));
cif = "1 345678A";
console.log(cif +" es un CIF ->" + patroncif.test(cif));
cif = "B134567BA";
console.log(cif +" es un CIF ->" + patroncif.test(cif));

cif = "A1625120B"
console.log("Cif: " + cif + "-Digito: " + formularioTest.validarcif(cif));
cif = "X1234567L"
console.log("Cif: " + cif + "-Digito: " + formularioTest.validarcif(cif));
cif = "P0200100F"
console.log("Cif: " + cif + "-Digito: " + formularioTest.validarcif(cif));
cif = "J22382949"
console.log("Cif: " + cif + "-Digito: " + formularioTest.validarcif(cif));

cif = "U15628068"
console.log("Cif: " + cif + "-Digito: " + formularioTest.validarcif(cif));

cif = "K1521047T"
console.log("Cif: " + cif + "-Digito: " + formularioTest.validarcif(cif));
console.log(formularioTest.validarcif(cif) === true);