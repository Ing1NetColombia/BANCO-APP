import Usuario from "./usuarios.js";
import Utils from "../utils/utils.js";

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = selectUsuarios()
document.onload = loadFormularioLogin()

// EVENTO CLICK BOTON INGRESAR:
const boton = document.getElementById("btnLogin")
boton.addEventListener("click", function (evento) {
    evento.preventDefault();

    //Leer usuario seleccionado en el select:
    const btnSelect = document.getElementById("selectUsuarios")
    let idSeleccion = btnSelect.value
    if (idSeleccion==="Seleccione usuario..."){
        swal("Debe seleccionar un usuario")
        return
    }

    //Leer password:
    const loginPassword = document.getElementById("loginPassword").value
        if (!loginPassword){
            swal("Debe digitar la contraseña")
            return
        }

    //validar la contraseña del usuario:
    if (Usuario.usuarioValido(parseInt(idSeleccion), loginPassword)){
        // ingresar a página principal
        window.location.href = "../principal/frmPrincipal.html"    
    } else {
        // no puede ingresar
        swal("Verifique su contraseña e intente de nuevo");
        return
    }
    
})

//---------------------
//LLENAR CONTENIDO SELECT DE USUARIOS:
//---------------------
function selectUsuarios(){

    let a_usuarios =[]

    a_usuarios = Usuario.obtenerDatos()

    let selectUsuarios = document.querySelector("#selectUsuarios")

    if (a_usuarios.length){

        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = "<option selected>Seleccione usuario...</option>"

        a_usuarios.forEach(function(element, index) {
            // index: indice del array
            cadenaHtml = cadenaHtml + `
                <option value=${element.id}>${element.nombre}</option>
                `
        });
    
        //Asignar etiqueta HTML:
        selectUsuarios.innerHTML = cadenaHtml    
    }
}

//---------------------
//EVENTO CLICK DE LA IMAGEN DE MOSTRAR/OCULTAR INPUT LOGINPASSWORD
//---------------------
let btnLoginImagenPassword = document.getElementById('loginPasswordImagen')
btnLoginImagenPassword.addEventListener("click", function(evento){
    evento.preventDefault();

    //etiqueta input:
    let inputPassword = document.getElementById("loginPassword")

    //ejecutar cambio de estado:
    Utils.estadoPassword(this, inputPassword)       
})

//---------------------------------
//CUANDO ES LA PRIMERA VEZ, SE ACTIVA LA ETIQUETA "REGISTRARSE", DE LO CONTRARIO, NO SE MUESTRA AL USUARIO
//-----------------------------------
function loadFormularioLogin(){

    let respuesta = Utils.siPrimeraVez()

    let boton = document.querySelector("#registrarse")

    if (respuesta==="S"){
        // Cuando es la primera vez, se habilita la etiqueta "Registrarse", de lo contrario, los usuarios se deben 
        //crear desde dentro de la aplicación
        boton.style.display = "block"
    }else{
        boton.disabled = true
    }

}