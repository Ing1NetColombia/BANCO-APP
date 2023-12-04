import Producto from "./productos.js";
import Cliente from "../clientes/clientes.js";
import tipoProducto from "../tiposProducto/tiposProducto.js";
import Utils from "../utils/utils.js";


//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = grillaProductos("A","")
document.onload = selectClientes()
document.onload = selectTiposProducto()

//---------------------
//EVENTO CLICK BOTON AGREGAR DEL FORM
//---------------------
let btnRegistrarProducto = document.getElementById('btnAgregarProducto')

if (btnRegistrarProducto){

    btnRegistrarProducto.addEventListener("click", function(evento){
        evento.preventDefault();
    
        const nitCliente = document.querySelector("#nitCliente").value ;
        const idProducto = document.querySelector("#idProducto").value ;
        const tipoProducto = document.querySelector("#tipoProducto").value ;
        const numeroProducto = document.querySelector("#numeroProducto").value ;
      
        // crear objeto para invocar métodos de la clase
        let objProducto = new Producto(nitCliente, idProducto, tipoProducto, numeroProducto); 
    
        if (objProducto.validarDatosProductos()){

            //validar idProducto único (PK)
            if (objProducto.idProductoExiste(nitCliente, idProducto)){
                swal("Este Id de Producto ya existe para este Cliente, no se aceptan repetidos")
                return false
            }            

            if (objProducto.numeroProductoExiste(numeroProducto)){
                swal("Este número de Producto ya existe en el Banco, debe ser único")
                return false
            }            

            //Guardar en el almacenamiento:
            objProducto.crearProducto()
            swal("Producto creado")
            //refrescar grilla:    
            grillaProductos("A","")
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
            swal("Cambios guardados")
            //refrescar grilla:    
            grillaProductos("A","")
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

    //refrescar grilla:    
    grillaProductos("A","")
    
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
    //re-setear select de tipos de producto:
    selectTiposProducto()

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

        //activar select tipos de producto:
        boton = document.querySelector("#selectTipoProducto")
        boton.style.display = "block"

        //ocultar input nombre tipo de producto:
        boton = document.querySelector("#nombreTipoProducto")
        boton.style.display = "none"

        //activar codigo de producto:
        boton = document.querySelector("#idProducto")
        boton.disabled = false
        
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

        //ocultar select tipos de producto:
        boton = document.querySelector("#selectTipoProducto")
        boton.style.display = "none"

        //activar input nombre tipo de producto:
        boton = document.querySelector("#nombreTipoProducto")
        boton.style.display = "block"

        //inactivar codigo de producto:
        boton = document.querySelector("#idProducto")
        boton.disabled = true
        
        //llevar el foco al input numero de producto:
        boton = document.querySelector("#numeroProducto")
        boton.focus()
    }
}

//---------------------
//LLENAR CONTENIDO GRILLA:
//---------------------
function grillaProductos(disabledBotones, nitClienteFiltro){
    //parámetro "disabledBotones" :
    //si el valor es "A" se Activan los botones Editar y Borrar
    //si el valor es "I" se Inactivan los botones Editar y Borrar

    //parámetro "nitClienteFiltro" : cliente a filtrar filas de la grilla

    //activar o inactivar los botones Editar y Borrar según parámetro recibido:
    let htmlDisabledBotones = ""
    if (disabledBotones==="I"){
        //inactivar los botones:
        htmlDisabledBotones = " disabled= true "
    }

    let a_productos =[]

    a_productos = Producto.obtenerDatosProductos()

    let tbl_productos = document.getElementById("bodyTablaProductos")
    
    if (tbl_productos) {
        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = ""
        let columnaNombreCliente= ""
        let columnaNombreTipoProducto= ""
        let continuar = true

        a_productos.forEach(function(element, index) {
            // index: indice del array

            continuar = false

            //filtrar filas según cliente recibido por parámetro:
            if (nitClienteFiltro){
                if (element.nitCliente===nitClienteFiltro){
                    continuar=true
                }
            }else{
                continuar = true
            }

            if (continuar){
                // cargar nombre del cliente segun nitCliente:
                columnaNombreCliente= Cliente.obtenerNombreCliente(element.nitCliente)
                // cargar nombre del Tipo de Producto:
                columnaNombreTipoProducto= tipoProducto.obtenerNombreTipoProducto(element.tipoProducto)

                // asignar etiqueta de la etiqueta Tabla:
                cadenaHtml = cadenaHtml + `
                    <tr style="height: 20px;">
                        <td>${element.nitCliente}</td>
                        <td>${columnaNombreCliente}</td>
                        <td>${element.tipoProducto}</td>
                        <td>${columnaNombreTipoProducto}</td>
                        <td>${element.idProducto}</td>
                        <td>${element.numeroProducto}</td>
                        <td>
                        <button indiceFila="${index}" class="btn btn-warning p-2 mb-1 btnGridEditarProducto" ${htmlDisabledBotones}>Editar</button>
                        <button indiceFila="${index}" class="btn btn-danger p-2 mb-1 btnGridBorrarProducto" ${htmlDisabledBotones}>Eliminar</button>
                        </td>
                    </tr>
                    `
                }
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
        //mPosicionEditar = indice

        //obtener fila de la tabla según atributo asignado al crear la fila de la tabla HTML:
        let indiceFila = elemento.getAttribute("indiceFila")
        mPosicionEditar = parseInt(indiceFila)

        //consultar producto según indice:
        const a_producto = Producto.obtenerRegistroProductos(mPosicionEditar)

        // cargar nombre del cliente segun nitCliente:
        const columnaNombre= Cliente.obtenerNombreCliente(a_producto[0].nitCliente)

        // cargar nombre del Tipo de Producto:
        const columnaNombreTipoProducto= tipoProducto.obtenerNombreTipoProducto(a_producto[0].tipoProducto)

        document.querySelector("#nitCliente").value= a_producto[0].nitCliente ;
        document.querySelector("#nombreSelected1").value= columnaNombre
        document.querySelector("#idProducto").value= a_producto[0].idProducto ;
        document.querySelector("#nombreTipoProducto").value= columnaNombreTipoProducto
        document.querySelector("#tipoProducto").value= a_producto[0].tipoProducto ;
        document.querySelector("#numeroProducto").value= a_producto[0].numeroProducto ;

        //refrescar grilla:    
        grillaProductos("I", a_producto[0].nitCliente)

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

        //obtener fila de la tabla según atributo asignado al crear la fila de la tabla HTML:
        let indiceFila = elemento.getAttribute("indiceFila")

        //consultar Producto según indice:
        let a_producto = Producto.obtenerRegistroProductos(indiceFila)

        //validar integridad referencial del cliente:
        if (Producto.idProductoDependencias(a_producto[0].nitCliente, a_producto[0].idProducto)){
            swal("Este producto tiene movimientos asociados.  No puede borrarse.")
        }else{
            //Borrar del almacenamiento:
            Producto.borrarProducto(indiceFila)
            //Refrescar grilla:
            grillaProductos("A","")
        }

    }))    
}

//---------------------
//LLENAR CONTENIDO SELECT DE CLIENTES:
//---------------------
function selectClientes(){

    let a_clientes =[]

    a_clientes = Cliente.obtenerDatosClientes()

    let htmlSelectClientes = document.querySelector("#selectClientes")

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
        htmlSelectClientes.innerHTML = cadenaHtml
    }
}

//---------------------
//EVENTO CHANGE EN SELECT DE CLIENTES
//---------------------
let btnClienteProductos = document.getElementById('selectClientes')

if (btnClienteProductos){

    btnClienteProductos.addEventListener("change", function(evento){
        evento.preventDefault();

        //Leer usuario seleccionado en el select:
        const btnSelect = document.getElementById("selectClientes")
        let nitSeleccion = btnSelect.value

        //Input destino para asignar el cliente seleccionado:
        let nitClienteHtml = document.getElementById("nitCliente")
        //Input destino para asignar el consecutivo de producto nuevo:
        let idProductoHtml = document.getElementById("idProducto")

        if (nitSeleccion==="Seleccione cliente..."){
            nitClienteHtml.value = ""
        } else {
            nitClienteHtml.value = nitSeleccion
            //calcular consecutivo de producto:
            idProductoHtml.value = Producto.calcularConsecutivoProducto(nitClienteHtml.value)
        }

        //refrescar grilla filtrando según el cliente seleccionado:
        grillaProductos("A",nitClienteHtml.value)
    })
}

//---------------------
//LLENAR CONTENIDO SELECT DE TIPOS DE PRODUCTO
//---------------------
function selectTiposProducto(){

    let a_tipoProductos =[]

    a_tipoProductos = tipoProducto.obtenerDatosTipoProductos()

    let htmlTiposProducto = document.querySelector("#selectTipoProducto")

    if (a_tipoProductos.length){

        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = "<option selected>Seleccione Tipo de Producto...</option>"
        let htmlTextoSelect =""

        a_tipoProductos.forEach(function(element, index) {
            //texto de la opción select:
            htmlTextoSelect = element.tipoProducto + " - " + element.nombre
            // index: indice del array
            cadenaHtml = cadenaHtml + `
                <option value=${element.tipoProducto}>${htmlTextoSelect}</option>
                `
        });
    
        //Asignar etiqueta HTML:
        htmlTiposProducto.innerHTML = cadenaHtml
    }
}

//---------------------
//EVENTO CHANGE DEL SELECT DE TIPOS DE PRODUCTO: GUARDA EL TIPO PRODUCTO QUE SE SELECCIONÓ EN EL SELECT
//---------------------
let btnSelecTipoProducto = document.getElementById('selectTipoProducto')
btnSelecTipoProducto.addEventListener("change", function(evento){
    evento.preventDefault();
  
    //Tomar tipo producto seleccionado en el select:
    let tipoProductoSeleccion = this.value

    //Input tipo producto destino para asignar el tipo producto seleccionado:
    let tipoProducto = document.getElementById("tipoProducto")

    if (tipoProductoSeleccion.includes("Seleccione Tipo de Producto")){
        tipoProducto.value = ""
    } else {
        tipoProducto.value = tipoProductoSeleccion
    }
    
})
