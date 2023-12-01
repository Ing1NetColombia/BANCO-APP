import Producto from "./productos.js";
import Cliente from "../clientes/clientes.js";


//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = grillaProductos()
document.onload = selectClientes()


//---------------------
//EVENTO CLICK BOTON AGREGAR DEL FORM
//---------------------
let btnRegistrarProducto = document.getElementById('btnAgregarProducto')

if (btnRegistrarProducto){

    btnRegistrarProducto.addEventListener("click", function(evento){
        evento.preventDefault();
    
        clienteSeleccionado()
        const nitCliente = document.querySelector("#nitCliente").value ;
        const idProducto = document.querySelector("#idProducto").value ;
        const tipoProducto = document.querySelector("#tipoProducto").value ;
        const numeroProducto = document.querySelector("#numeroProducto").value ;
      
        // crear objeto para invocar métodos de la clase
        let objProducto = new Producto(nitCliente, idProducto, tipoProducto, numeroProducto); 
    
        if (objProducto.validarDatosProductos()){
            //Guardar en el almacenamiento:
            objProducto.crearProducto()
            alert("Producto ha sido creado")
            //refrescar grilla:    
            grillaProductos()
            //limpiar formulario:
            limpiarFormProductos()
    
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotonesProductos("AGREGAR")
        }
        
    })    
}

//---------------------
//EVENTO CLICK BOTON GUARDAR CAMBIOS AL MODIFICAR DEL FORM
//---------------------
let btnModificarProducto = document.getElementById('btnModificarProducto')

if (btnModificarProducto){

    btnModificarProducto.addEventListener("click", function(evento){
        evento.preventDefault();
    
        const nitCliente = document.querySelector("#nitCliente").value ;
        const idProducto = document.querySelector("#idProducto").value ;
        const tipoProducto = document.querySelector("#tipoProducto").value ;
        const numeroProducto = document.querySelector("#numeroProducto").value ;
      
        // crear objeto para invocar métodos de la clase
        let objProducto = new Producto(nitCliente, idProducto, tipoProducto, numeroProducto); 
    
        if (objProducto.validarDatosProductos()){
            //Guardar en el almacenamiento:
            objProducto.guardaEditarProducto(mPosicionEditar)
            alert("Cambios han sido guardados")
            //refrescar grilla:    
            grillaProductos()
            //limpiar formulario:
            limpiarFormProductos()
    
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotonesProductos("AGREGAR")
        }
    
    })        
}

//---------------------
//EVENTO CLICK BOTON CANCELAR DEL FORM
//---------------------
let btnCancelar = document.getElementById('btnCancelarProducto')
btnCancelar.addEventListener("click", function(evento){
    evento.preventDefault();

    //limpiar formulario:
    limpiarFormProductos()

    //Actualizar estado de botones Agregar y Modificar:
    estadoBotonesProductos("AGREGAR")
    }

)

//---------------------
//LIMPIAR CONTROLES DEL FORM DE CAPTURA
//---------------------
function limpiarFormProductos(){

    //re-setear select de clientes:
    selectClientes()

    document.querySelector("#nitCliente").value="" ;
    document.querySelector("#idProducto").value="" ;
    document.querySelector("#tipoProducto").value="" ;
    document.querySelector("#numeroProducto").value="" ;
}

//---------------------
//ACTUALIZAR ESTADO DE BOTONES DEL FORM:
//Para el Estado "AGREGAR": se oculta el botón Modificar
//Para el Estado "MODIFICAR": se oculta el botón Agregar
//---------------------
function estadoBotonesProductos(estado){
    //estado: Valores posibles -> AGREGAR, MODIFICAR

    if (estado==="AGREGAR"){
        //activar botón Agregar:
        let boton = document.querySelector("#btnAgregarProducto")
        boton.style.display = "block"

        //desactivar botón Modificar:
        boton = document.querySelector("#btnModificarProducto")
        boton.style.display = "none"

        //activar input nombre del Cliente:
        boton = document.querySelector("#nombreSelected1")
        boton.style.display = "none"

        //llevar el foco al select de Clientes:
        boton = document.querySelector("#selectClientes")
        boton.style.display = "block"
        boton.focus()
        
    } else if (estado==="MODIFICAR") {
        //desactivar botón Agregar:
        let boton = document.querySelector("#btnAgregarProducto")
        boton.style.display = "none"

        //activar botón Modificar:
        boton = document.querySelector("#btnModificarProducto")
        boton.style.display = "block"

        //activar input nombre del Cliente:
        boton = document.querySelector("#nombreSelected1")
        boton.style.display = "block"
 
        //ocultar el select de Clientes:
        boton = document.querySelector("#selectClientes")
        boton.style.display = "none"
        
        //llevar el foco al input nombre del cliente:
        boton = document.querySelector("#idProducto")
        boton.focus()
    }
}

//---------------------
//LLENAR CONTENIDO GRILLA:
//---------------------
function grillaProductos(){
    let a_productos =[]

    a_productos = Producto.obtenerDatosProductos()

    let tbl_productos = document.getElementById("bodyTablaProductos")

    if (tbl_productos) {
        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = ""
        let columnaNombre= ""

        a_productos.forEach(function(element, index) {
            // index: indice del array

            // cargar nombre del cliente segun nitCliente:
            columnaNombre= Cliente.obtenerNombreCliente(element.nitCliente)
            // asignar etiqueta de la etiqueta Tabla:
            cadenaHtml = cadenaHtml + `
                <tr style="height: 20px;">
                    <td>${element.nitCliente}</td>
                    <td>${columnaNombre}</td>
                    <td>${element.idProducto}</td>
                    <td>${element.tipoProducto}</td>
                    <td>${element.numeroProducto}</td>
                    <td>
                    <button class="btn btn-warning p-2 mb-1 btnGridEditarProducto">Editar</button>
                    <button class="btn btn-danger p-2 mb-1 btnGridBorrarProducto">Eliminar</button>
                    </td>
                </tr>
                `
        });

        //Asignar etiqueta HTML:
        tbl_productos.innerHTML = cadenaHtml

        //Crear los eventos CLICK de los botones EDITAR Y BORRAR de la grilla
        clickEditarProductos()
        clickBorrarProductos()
    }
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "EDITAR" DE LA GRILLA
//---------------------
function clickEditarProductos(){
    const a_bot_editar = document.querySelectorAll(".btnGridEditarProducto")
 
    a_bot_editar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {
        mPosicionEditar = indice

        //consultar producto según indice:
        const a_producto = Producto.obtenerRegistroProductos(mPosicionEditar)

        // cargar nombre del cliente segun nitCliente:
        const columnaNombre= Cliente.obtenerNombreCliente(a_producto[0].nitCliente)

        document.querySelector("#nitCliente").value= a_producto[0].nitCliente ;
        document.querySelector("#nombreSelected1").value= columnaNombre
        document.querySelector("#idProducto").value= a_producto[0].idProducto ;
        document.querySelector("#tipoProducto").value= a_producto[0].tipoProducto ;
        document.querySelector("#numeroProducto").value= a_producto[0].numeroProducto ;

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotonesProductos("MODIFICAR")    
    }))
    
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "BORRAR" DE LA GRILLA
//---------------------
function clickBorrarProductos(){
    const a_bot_borrar = document.querySelectorAll(".btnGridBorrarProducto")

    a_bot_borrar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {
        //Borrar del almacenamiento:
        let objProducto = new Producto(0,"","","","")
        objProducto.borrarProducto(indice)
        //Refrescar grilla:
        grillaProductos()
    }))
    
}

//---------------------
//LLENAR CONTENIDO SELECT DE CLIENTES:
//---------------------
function selectClientes(){

    let a_clientes =[]

    a_clientes = Cliente.obtenerDatosClientes()

    let selectClientes = document.querySelector("#selectClientes")

    if (a_clientes.length){

        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = "<option selected>Seleccione cliente...</option>"

        a_clientes.forEach(function(element, index) {
            // index: indice del array
            cadenaHtml = cadenaHtml + `
                <option value=${element.nitCliente}>${element.nombre}</option>
                `
        });
    
        //Asignar etiqueta HTML:
        selectClientes.innerHTML = cadenaHtml
    }
}

//---------------------
//RETORNAR CLIENTE ELEGIDO EN EL SELECT
//---------------------
function clienteSeleccionado(){

    //Leer usuario seleccionado en el select:
    const btnSelect = document.getElementById("selectClientes")
    let nitSeleccion = btnSelect.value

    //Input destino para asignar el cliente seleccionado:
    let nitCliente = document.getElementById("nitCliente")

    if (nitSeleccion==="Seleccione cliente..."){
        nitCliente.value = ""
    } else {
        nitCliente.value = nitSeleccion
    }

    return nitCliente.value    
}
