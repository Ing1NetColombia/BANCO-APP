import Usuario from "./usuarios.js";

//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0

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
        alert("Usuario ha sido creado")
        //refrescar grilla:    
        grillaUsuarios()
        //limpiar formulario:
        limpiarForm()

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotones("AGREGAR")
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
        alert("Cambios han sido guardados")
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
function grillaUsuarios(){

    let a_usuarios =[]

    a_usuarios = Usuario.obtenerDatos()

    let div_tabla = document.querySelector("#div_tabla")

    if (a_usuarios.length){

        //mostrar div de tabla:
        div_tabla.style.display="block"

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
                    <button class="btn btn-warning p-2 mb-1 btnGridEditar">Editar</button>
                    <button class="btn btn-danger p-2 mb-1 btnGridBorrar">Eliminar</button>
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

    } else {

        // Cuando no hay usuarios, se oculta la grilla para simular el registro por primera vez
        div_tabla.style.display = "none"
    }
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
        let objUsuario = new Usuario(0,"","","")
        objUsuario.borrar(indice)
        //Refrescar grilla:
        grillaUsuarios()
    }))
    
}

