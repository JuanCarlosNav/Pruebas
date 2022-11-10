////////////////////////////////////////////////////////////////////////////////////////
/*/////////////////////////////////////////////////////////////////////////////////////
Supongamos que tenemos un formulario de registro acceso a una aplicación con el usuario.

Tras introducir los datos del usuario, las capas de visitas y total se actualizarán 
automáticamente con el número de visitas del usuario y con el total de visitas realizadas 
desde el navegador, independientemente del usuario rellenado.

Para ello, guardar en el almacén local:

    -una entrada con el total de visitas
    -una entrada por cada usuario para contar el número de visitas

////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////

function guardaDatos() {

    let usuarioForm = document.getElementById("inputUsuario");
    let usuario = usuarioForm.value;

    //Si el usuario está en blanco no guardo nada.
    if (usuario === "" || usuario === null) {
        return false;
    }

    //una entrada con el total de visitas
    let totalVisitas = localStorage.getItem("totalVisitas");

    if (totalVisitas === null) {
        totalVisitas = 0;
    } else {
        totalVisitas = Number.parseInt(totalVisitas);
        if (totalVisitas == NaN) {
            totalVisitas = 0;
        }
    }

    ++totalVisitas;
    localStorage.setItem("totalVisitas",totalVisitas);

    //una entrada por cada usuario para contar el número de visitas

    let totalUsuario = localStorage.getItem(usuario);

    if ( totalUsuario === null || 
        (Number.parseInt(totalUsuario) === NaN || totalUsuario === "NaN") ) {
        totalUsuario = 0;
    } else {
        totalUsuario = Number.parseInt(totalUsuario);
        if (totalUsuario === NaN) {
            totalUsuario = 0;
        }
    }

    ++totalUsuario;
    localStorage.setItem(usuario,totalUsuario);
    ultUsuario = usuario;

    let totUsuario = document.getElementById("visitas");
    while (totUsuario.firstChild) {
        totUsuario.firstChild.remove()
    }
    let texto = document.createTextNode(totalUsuario);
    totUsuario.appendChild(texto);
    let totVisitas = document.getElementById("total");
    while (totVisitas.firstChild) {
        totVisitas.firstChild.remove()
    }
    texto = document.createTextNode(totalVisitas);
    totVisitas.appendChild(texto);

    console.log("Valor actualizado de visitas: " + localStorage.getItem("totalVisitas"));
    console.log("Visitas del usuario " + usuario + ": " + localStorage.getItem(usuario));
    console.log("              ------------------------------------");
    return true;
}

//Manejador de los formularios, captura el envío del formulario para hacer 
//comprobaciones (u otras tareas) antes de enviarlo. Se enviará (return true)
//si las comproaciones son correctas y no se enviará si no lo son, o 
//simplemente no se pretende enviar nunca...
(function manejadoresFormularios() {
    document.getElementById("miForm").onsubmit = function() {
    
        let ok = guardaDatos();        

        //Para que no se recargue la página:
        ok = false;
        if (ok) {
            return true;  // se realiza el envío
        } else {
            return false; // se cancela el envío
        }
    };
})();

var ultUsuario ="";

////////////////////////////////////////////////////////////////////////////////////////
/*/////////////////////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded",function() {

    let totalUsuario = localStorage.getItem(ultUsuario);
    let totUsuario = document.getElementById("visitas");
    let texto = "("+ultUsuario+")"+document.createTextNode(totalUsuario);
    totUsuario.appendChild(texto);
    let totVisitas = document.getElementById("total");
    let totalVisitas = localStorage.getItem("totalVisitas");
    texto = document.createTextNode(totalVisitas);
    totVisitas.appendChild(texto);
}); 
////////////////////////////////////////////////////////////////////////////////////////
//*/////////////////////////////////////////////////////////////////////////////////////
