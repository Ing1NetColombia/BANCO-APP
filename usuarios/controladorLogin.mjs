import Usuario from "./usuarios.js";

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = selectUsuarios()

// EVENTO CLICK BOTON INGRESAR:
const boton = document.getElementById("btnLogin")
boton.addEventListener("click", function (evento) {
    evento.preventDefault();

    //Leer usuario seleccionado en el select:
    const btnSelect = document.getElementById("selectUsuarios")
    let idSeleccion = btnSelect.value
    if (idSeleccion==="Seleccione usuario..."){
        alert("Debe seleccionar un usuario")
        return
    }

    //Leer password:
    const password = document.getElementById("password").value
        if (!password){
            alert("Debe digitar la contraseña")
            return
        }

    if (Usuario.usuarioValido(parseInt(idSeleccion), password)){
        // ingresar a página principal
        window.location.href = "../principal/frmPrincipal.html"    
    } else {
        // no puede ingresar
        alert("Usuario o contraseña incorrectos")
        return
    }
    
})

//EVENTO CHANGE DEL SELECT:
const btnSelect = document.getElementById("selectUsuarios")
btnSelect.addEventListener("change", function(evento) {
    let seleccion = selectUsuarios.value
    
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
