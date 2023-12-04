import Usuario from "./usuarios.js";
import Utils from "../utils/utils.js";

//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0
var esPrimeraVez = Utils.siPrimeraVez()

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = grillaUsuarios()

//---------------------
//EVENTO CLICK BOTON AGREGAR DEL FORM
//---------------------
var btnRegistrar = document.getElementById('btnAgregar')
btnRegistrar.addEventListener("click", function(evento){
    evento.preventDefault();

    const nombre = document.querySelector("#nombre").value ;
    const email = document.querySelector("#email").value ;
    const password1 = document.querySelector("#password").value ;
    const password2 = document.querySelector("#confirm_password").value ;
     
    // crear objeto para invocar métodos de la clase
    let objUsuario = new Usuario(0,nombre, password1, email); 

    if (objUsuario.validarDatos(password2)){
        //Guardar en el almacenamiento:
        objUsuario.crear()
        swal("Usuario creado")

        if (esPrimeraVez ==="S"){
            // Cuando es la primera vez, solo se permite crear el primer usuario y se cierra el formulario
            window.location.href = "./frmLogin.html"
        }else{
            //limpiar formulario:
            limpiarForm()
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotones("AGREGAR")
            //Cuando no es la primera vez, mostrar la grilla con los usuarios creados:
            grillaUsuarios()
        }
    }
    
})

//---------------------
//E//EVENTO CLICK BOTON GUARDAR CAMBIOS AL MODIFICAR DEL FORMM
//---------------------
var btnModificar = document.getElementById('btnModificar')
btnModificar.addEventListener("click", function(evento){
    evento.preventDefault();

    const id = parseInt(document.querySelector("#id").value) ;
    const nombre = document.querySelector("#nombre").value ;
    const password1 = document.querySelector("#password").value ;
    const password2 = document.querySelector("#confirm_password").value ;
    const email = document.querySelector("#email").value ;
  
    // crear objeto para invocar métodos de la clase
    let objUsuario = new Usuario(id, nombre, password1, email); 

    if (objUsuario.validarDatos(password2)){
        //Guardar en el almacenamiento:
        objUsuario.guardaEditar(mPosicionEditar)
        swal("Cambios guardados")
        //refrescar grilla:    
        grillaUsuarios()
        //limpiar formulario:
        limpiarForm()

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotones("AGREGAR")
    }

})

//---------------------
//EVENTO CLICK BOTON CANCELAR DEL FORM
//---------------------
var btnCancelar = document.getElementById('btnCancelar')
btnCancelar.addEventListener("click", function(evento){
    evento.preventDefault();

    if (esPrimeraVez ==="S"){
        // Cuando es la primera vez, al pulsar el botón cancelar retorna al formulario de Login
        window.location.href = "./frmLogin.html"
    }
    

    //limpiar formulario:
    limpiarForm()

    //Actualizar estado de botones Agregar y Modificar:
    estadoBotones("AGREGAR")
    }

)

//---------------------
//LIMPIAR CONTROLES DEL FORM DE CAPTURA
//---------------------
function limpiarForm(){

    document.querySelector("#id").value ="" ;
    document.querySelector("#nombre").value="" ;
    document.querySelector("#password").value="" ;
    document.querySelector("#confirm_password").value="" ;
    document.querySelector("#email").value="" ;
}

//---------------------
//ACTUALIZAR ESTADO DE BOTONES DEL FORM:
//Para el Estado "AGREGAR": se oculta el botón Modificar
//Para el Estado "MODIFICAR": se oculta el botón Agregar
//---------------------
function estadoBotones(estado){
    //estado: Valores posibles -> AGREGAR, MODIFICAR

    if (estado==="AGREGAR"){
        //activar botón Agregar:
        let boton = document.querySelector("#btnAgregar")
        boton.style.display = "block"

        //desactivar botón Modificar:
        boton = document.querySelector("#btnModificar")
        boton.style.display = "none"

        //llevar el foco al input NitCliente:
        boton = document.querySelector("#nombre")
        boton.focus()
        
    } else if (estado==="MODIFICAR") {
        //desactivar botón Agregar:
        let boton = document.querySelector("#btnAgregar")
        boton.style.display = "none"

        //activar botón Modificar:
        boton = document.querySelector("#btnModificar")
        boton.style.display = "block"

        //llevar el foco al input nombre del cliente:
        boton = document.querySelector("#nombre")
        boton.focus()
    }
}

//---------------------
//LLENAR CONTENIDO GRILLA:
//---------------------
function grillaUsuarios(disabledBotones){
    //parámetro "disabledBotones" :
    //si el valor es "A" se Activan los botones Editar y Borrar
    //si el valor es "I" se Inactivan los botones Editar y Borrar

    let div_tabla = document.querySelector("#div_tabla")
    let linkSalir = document.querySelector("#imagenSalir")
    let spanSalir = document.querySelector("#spanSalir")

    if (esPrimeraVez==="S"){
        // Cuando es la primera vez, NO se muestran los datos en la grilla
        div_tabla.style.display="none"
        //Ocultar el icono de salir (superior-derecha)
        linkSalir.style.display="none"
        spanSalir.style.display="none"
        return
    }else{
        // Cuando NO es la primera vez, se muestran los datos en la grilla
        div_tabla.style.display="block"
        //Mostrar el icono de salir (superior-derecha)
        linkSalir.style.display="block"
        spanSalir.style.display="block"
    }

    let a_usuarios =[]

    a_usuarios = Usuario.obtenerDatos()

    //activar o inactivar los botones Editar y Borrar según parámetro recibido:
    let htmlDisabledBotones = ""
    if (disabledBotones==="I"){
        //inactivar los botones:
        htmlDisabledBotones = " disabled= true "
    }
    
        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = ""
        a_usuarios.forEach(function(element, index) {
            // index: indice del array
            cadenaHtml = cadenaHtml + `
                <tr style="height: 20px;">
                    <td>${element.id}</td>
                    <td>${element.nombre}</td>
                    <td>${element.email}</td>
                    <td>
                    <button class="btn btn-warning p-2 mb-1 btnGridEditar" ${htmlDisabledBotones}>Editar</button>
                    <button class="btn btn-danger p-2 mb-1 btnGridBorrar" ${htmlDisabledBotones}>Eliminar</button>
                    </td>
                </tr>
                `
        });
    
        //Asignar etiqueta HTML:
        let tbl_usuarios = document.getElementById("bodyTabla")
        tbl_usuarios.innerHTML = cadenaHtml
    
        //Crear los eventos CLICK de los botones EDITAR Y BORRAR de la grilla
        clickEditar()
        clickBorrar()
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "EDITAR" DE LA GRILLA
//---------------------
function clickEditar(){
    const a_bot_editar = document.querySelectorAll(".btnGridEditar")
 
    a_bot_editar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {

        mPosicionEditar = indice

        //consultar cliente según indice:
        let a_usuario = Usuario.obtenerRegistro(mPosicionEditar)

        document.querySelector("#id").value= a_usuario[0].id ;
        document.querySelector("#nombre").value= a_usuario[0].nombre ;
        document.querySelector("#password").value= a_usuario[0].password ;
        document.querySelector("#confirm_password").value= a_usuario[0].password ;
        document.querySelector("#email").value= a_usuario[0].email ;

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotones("MODIFICAR")    
    }))
    
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "BORRAR" DE LA GRILLA
//---------------------
function clickBorrar(){
    const a_bot_borrar = document.querySelectorAll(".btnGridBorrar")

    a_bot_borrar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {

            //Borrar del almacenamiento:
            Usuario.borrar(indice)
            //Refrescar grilla:
            grillaUsuarios()    
    }))
    
}

//---------------------
//EVENTO CLICK DE LA IMAGEN DE MOSTRAR/OCULTAR INPUT PASSWORD
//---------------------
let btnImagenPassword = document.getElementById('passwordImagen')
btnImagenPassword.addEventListener("click", function(evento){
    evento.preventDefault();

    //etiqueta input:
    let inputPassword = document.getElementById("password")

    //ejecutar cambio de estado:
    Utils.estadoPassword(this, inputPassword)       
})

//---------------------
//EVENTO CLICK DE LA IMAGEN DE MOSTRAR/OCULTAR INPUT CONFIRM_PASSWORD
//---------------------
let btnImagenConfirmPassword = document.getElementById('confirm_passwordImagen')
btnImagenConfirmPassword.addEventListener("click", function(evento){
    evento.preventDefault();

    //etiqueta input:
    let inputPassword = document.getElementById("confirm_password")

    //ejecutar cambio de estado:
    Utils.estadoPassword(this, inputPassword)       
})

