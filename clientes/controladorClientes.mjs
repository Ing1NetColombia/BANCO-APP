import Cliente from "./clientes.js";

//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = grillaClientes()

//---------------------
//EVENTO CLICK BOTON AGREGAR DEL FORM
//---------------------
var btnRegistrarCliente = document.getElementById('btnAgregarCliente')
if (btnRegistrarCliente){

    btnRegistrarCliente.addEventListener("click", function(evento){
        evento.preventDefault();
    
        const nitCliente = document.querySelector("#nitCliente").value ;
        const nombre = document.querySelector("#nombre").value ;
        const direcc = document.querySelector("#direcc").value ;
        const ciudad = document.querySelector("#ciudad").value ;
        const email = document.querySelector("#email").value ;
      
        // crear objeto para invocar métodos de la clase
        let objCliente = new Cliente(nitCliente, nombre, direcc, ciudad, email); 
    
        if (objCliente.validarDatosCliente()){
            //validar nitCliente único (PK)
            if (objCliente.nitClienteExiste(nitCliente)){
                alert("Este Nit de Cliente ya existe, no se aceptan repetidos")
                return false
            }

            //Guardar en el almacenamiento:
            objCliente.crearCliente()
            alert("Cliente ha sido creado")
            //refrescar grilla:    
            grillaClientes()
            //limpiar formulario:
            limpiarFormClientes()
    
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotonesClientes("AGREGAR")
        }
        
    })
}

//---------------------
////EVENTO CLICK BOTON GUARDAR CAMBIOS AL MODIFICAR DEL FORM
//---------------------
let btnModificarCliente = document.getElementById('btnModificarCliente')

if (btnModificarCliente){
    btnModificarCliente.addEventListener("click", function(evento){
        evento.preventDefault();
    
        const nitCliente = document.querySelector("#nitCliente").value ;
        const nombre = document.querySelector("#nombre").value ;
        const direcc = document.querySelector("#direcc").value ;
        const ciudad = document.querySelector("#ciudad").value ;
        const email = document.querySelector("#email").value ;
      
        // crear objeto para invocar métodos de la clase
        let objCliente = new Cliente(nitCliente, nombre, direcc, ciudad, email); 
    
        if (objCliente.validarDatosCliente()){
            //Guardar en el almacenamiento:
            objCliente.guardaEditarCliente(mPosicionEditar)
            alert("Cambios han sido guardados")
            //refrescar grilla:    
            grillaClientes()
            //limpiar formulario:
            limpiarFormClientes()
    
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotonesClientes("AGREGAR")
        }
    
    })    
}

//---------------------
//EVENTO CLICK BOTON CANCELAR DEL FORM
//---------------------
let btnCancelar = document.getElementById('btnCancelarCliente')

if (btnCancelar){

    btnCancelar.addEventListener("click", function(evento){
        evento.preventDefault();
    
        //limpiar formulario:
        limpiarFormClientes()
    
        //Actualizar estado de botones Agregar y Modificar:
        estadoBotonesClientes("AGREGAR")
        }
    
    )    
}

//---------------------
//LIMPIAR CONTROLES DEL FORM DE CAPTURA
//---------------------
function limpiarFormClientes(){

    document.querySelector("#nitCliente").value ="" ;
    document.querySelector("#nombre").value="" ;
    document.querySelector("#direcc").value="" ;
    document.querySelector("#ciudad").value="" ;
    document.querySelector("#email").value="" ;
}

//---------------------
//ACTUALIZAR ESTADO DE BOTONES DEL FORM:
//Para el Estado "AGREGAR": se oculta el botón Modificar
//Para el Estado "MODIFICAR": se oculta el botón Agregar
//---------------------
function estadoBotonesClientes(estado){
    //estado: Valores posibles -> AGREGAR, MODIFICAR

    if (estado==="AGREGAR"){
        //activar botón Agregar:
        let boton = document.querySelector("#btnAgregarCliente")
        boton.style.display = "block"

        //desactivar botón Modificar:
        boton = document.querySelector("#btnModificarCliente")
        boton.style.display = "none"

        //activar input NitCliente:
        boton = document.querySelector("#nitCliente")
        boton.disabled = false

        //llevar el foco al input NitCliente:
        boton = document.querySelector("#nitCliente")
        boton.focus()
        
    } else if (estado==="MODIFICAR") {
        //desactivar botón Agregar:
        let boton = document.querySelector("#btnAgregarCliente")
        boton.style.display = "none"

        //activar botón Modificar:
        boton = document.querySelector("#btnModificarCliente")
        boton.style.display = "block"

        //inactivar input NitCliente:
        boton = document.querySelector("#nitCliente")
        boton.disabled = true
 
        //llevar el foco al input nombre del cliente:
        boton = document.querySelector("#nombre")
        boton.focus()
    }
}

//---------------------
//LLENAR CONTENIDO GRILLA:
//---------------------
function grillaClientes(disabledBotones){
    //parámetro "disabledBotones" :
    //si el valor es "A" se Activan los botones Editar y Borrar
    //si el valor es "I" se Inactivan los botones Editar y Borrar

    let a_clientes =[]

    let tbl_clientes = document.getElementById("bodyTablaClientes")

    //activar o inactivar los botones Editar y Borrar según parámetro recibido:
    let htmlDisabledBotones = ""
    if (disabledBotones==="I"){
        //inactivar los botones:
        htmlDisabledBotones = " disabled= true "
    }
    
    if (tbl_clientes){
        a_clientes = Cliente.obtenerDatosClientes()

        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = ""
        a_clientes.forEach(function(element, index) {
            // index: indice del array
            cadenaHtml = cadenaHtml + `
                <tr style="height: 20px;">
                    <td>${element.nitCliente}</td>
                    <td>${element.nombre}</td>
                    <td>${element.direcc}</td>
                    <td>${element.ciudad}</td>
                    <td>${element.email}</td>
                    <td>
                    <button class="btn btn-warning p-2 mb-1 btnGridEditarCliente" ${htmlDisabledBotones}>Editar</button>
                    <button class="btn btn-danger p-2 mb-1 btnGridBorrarCliente" ${htmlDisabledBotones}>Eliminar</button>
                    </td>
                </tr>
                `
        });
    
        //Asignar etiqueta HTML:
        tbl_clientes.innerHTML = cadenaHtml
    
        //Crear los eventos CLICK de los botones EDITAR Y BORRAR de la grilla
        clickEditarClientes()
        clickBorrarClientes()
    
    }
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "EDITAR" DE LA GRILLA
//---------------------
function clickEditarClientes(){
    const a_bot_editar = document.querySelectorAll(".btnGridEditarCliente")
 
    a_bot_editar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {

        mPosicionEditar = indice

        //consultar cliente según indice:
        let a_cliente = Cliente.obtenerRegistroCliente(mPosicionEditar)

        document.querySelector("#nitCliente").value= a_cliente[0].nitCliente ;
        document.querySelector("#nombre").value= a_cliente[0].nombre ;
        document.querySelector("#direcc").value= a_cliente[0].direcc ;
        document.querySelector("#ciudad").value= a_cliente[0].ciudad ;
        document.querySelector("#email").value= a_cliente[0].email ;

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotonesClientes("MODIFICAR")    
    }))
    
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "BORRAR" DE LA GRILLA
//---------------------
function clickBorrarClientes(){
    const a_bot_borrar = document.querySelectorAll(".btnGridBorrarCliente")

    a_bot_borrar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {

        //consultar cliente según indice:
        let a_cliente = Cliente.obtenerRegistroCliente(indice)

        //validar integridad referencial del cliente:
        if (Cliente.nitClienteDependencias(a_cliente[0].nitCliente)){
            alert("Este cliente tiene productos asociados.  No puede borrarse.")
        }else{
            //Borrar del almacenamiento:
            let objCliente = new Cliente(0,"","","","")
            objCliente.borrarCliente(indice)
            //Refrescar grilla:
            grillaClientes()
        }

    }))
    
}