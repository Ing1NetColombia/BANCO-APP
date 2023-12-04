import Movimiento from "./movimientos.js";
import Cliente from "../clientes/clientes.js";
import Producto from "../productos/productos.js";
import tipoProducto from "../tiposProducto/tiposProducto.js";
import Utils from "../utils/utils.js";

//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = grillaMovimientos("A","")
document.onload = selectClientesMov()

//---------------------
//EVENTO CLICK BOTON AGREGAR DEL FORM
//---------------------
var btnRegistrar = document.getElementById('btnAgregar')
btnRegistrar.addEventListener("click", function(evento){
    evento.preventDefault();
  
    const nitCliente = document.querySelector("#nitCliente").value ;
    const idProducto = document.querySelector("#idProducto").value ;
    const fechaMovim = document.querySelector("#fechaMovim").value ;
    const documento = document.querySelector("#documento").value ;
    const vrEntrada = document.querySelector("#vrEntrada").value ;
    const vrSalida = document.querySelector("#vrSalida").value ;

    //validar fecha del movimiento:
    if (!Utils.fechaValida(fechaMovim,"fecha del movimiento")){
        return
    }

    // crear objeto para invocar métodos de la clase
    let objMovimiento = new Movimiento(nitCliente, idProducto, fechaMovim, documento, vrEntrada, vrSalida);

    if (objMovimiento.validarDatos()){
        //Guardar en el almacenamiento:
        objMovimiento.crear()
        swal("Movimiento creado")
        //refrescar grilla:    
        grillaMovimientos("A","")
        //limpiar formulario:
        limpiarForm()

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotones("AGREGAR")
    }
})

//---------------------
////EVENTO CLICK BOTON GUARDAR CAMBIOS AL MODIFICAR DEL FORM
//---------------------
var btnModificar = document.getElementById('btnModificar')
btnModificar.addEventListener("click", function(evento){
    evento.preventDefault();

    const nitCliente = document.querySelector("#nitCliente").value ;
    const idProducto = document.querySelector("#idProducto").value ;
    const fechaMovim = document.querySelector("#fechaMovim").value ;
    const documento = document.querySelector("#documento").value ;
    const vrEntrada = document.querySelector("#vrEntrada").value ;
    const vrSalida = document.querySelector("#vrSalida").value ;

    // crear objeto para invocar métodos de la clase
    let objMovimiento = new Movimiento(nitCliente, idProducto, fechaMovim, documento, vrEntrada, vrSalida);

    if (objMovimiento.validarDatos()){
        //Guardar en el almacenamiento:
        objMovimiento.guardaEditar(mPosicionEditar)
        swal("Cambios guardados")
        //refrescar grilla:    
        grillaMovimientos("A","")
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

    //refrescar grilla:    
    grillaMovimientos("A","")

    //Actualizar estado de botones Agregar y Modificar:
    estadoBotones("AGREGAR")
    }
)

//---------------------
//LIMPIAR CONTROLES DEL FORM DE CAPTURA
//---------------------
function limpiarForm(){

    //re-setear select de clientes:
    selectClientesMov()

    //Limpiar SELECT de productos:
    selectProductosMov(0)

    document.querySelector("#nitCliente").value ="" ;
    document.querySelector("#idProducto").value="" ;
    document.querySelector("#fechaMovim").value="" ;
    document.querySelector("#documento").value="" ;
    document.querySelector("#vrEntrada").value="" ;
    document.querySelector("#vrSalida").value="" ;
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

        //ocultar input nombre cliente:
        boton = document.querySelector("#nombreSelected1")
        boton.style.display = "none"

        //ocultar input nombre producto:
        boton = document.querySelector("#numeroProductoSelected")
        boton.style.display = "none"        
        
        //activar select clientes:
        boton = document.querySelector("#selectClientesMov")
        boton.style.display = "block"

        //activar select productos:
        boton = document.querySelector("#selectProductosMov")
        boton.style.display = "block"

        //llevar el foco al input NitCliente:
        boton = document.querySelector("#selectClientesMov")
        boton.focus()
        
    } else if (estado==="MODIFICAR") {
        //desactivar botón Agregar:
        let boton = document.querySelector("#btnAgregar")
        boton.style.display = "none"

        //activar botón Modificar:
        boton = document.querySelector("#btnModificar")
        boton.style.display = "block"

        //activar input nombre cliente:
        boton = document.querySelector("#nombreSelected1")
        boton.style.display = "block"

        //ocultar input nombre producto:
        boton = document.querySelector("#numeroProductoSelected")
        boton.style.display = "block"
        
        //ocultar select clientes:
        boton = document.querySelector("#selectClientesMov")
        boton.style.display = "none"

        //ocultar select productos:
        boton = document.querySelector("#selectProductosMov")
        boton.style.display = "none"

        //llevar el foco al input nombre del cliente:
        boton = document.querySelector("#fechaMovim")
        boton.focus()
    }
}

//---------------------
//LLENAR CONTENIDO GRILLA:
//---------------------
function grillaMovimientos(disabledBotones, nitClienteFiltro){
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
    
    let a_movimientos =[]

    a_movimientos = Movimiento.obtenerDatos()

    //Llenar String con contenido HTML para asignar a la etiqueta
    let cadenaHtml = ""
    let columnaNombre= ""
    let columnaNumProducto= ""
    let columnaTipoProducto= ""
    let columnaNombreTipoProducto= ""
    let continuar = true

    a_movimientos.forEach(function(element, index) {
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
            columnaNombre= Cliente.obtenerNombreCliente(element.nitCliente)
            // cargar numero de producto segun idProducto:
            columnaNumProducto= Producto.obtenerNumeroProducto(element.nitCliente, element.idProducto)
            // cargar tipo de producto segun idProducto:
            columnaTipoProducto= Producto.obtenerTipoProducto(element.nitCliente, element.idProducto)
            // cargar nombre del tipo de producto segun TipoProducto:
            columnaNombreTipoProducto= tipoProducto.obtenerNombreTipoProducto(columnaTipoProducto)

            // asignar etiqueta de la etiqueta Tabla:
            cadenaHtml = cadenaHtml + `
                <tr style="height: 20px;">
                    <td>${element.nitCliente}</td>
                    <td>${columnaNombre}</td>
                    <td>${columnaTipoProducto}</td>
                    <td>${columnaNombreTipoProducto}</td>
                    <td>${columnaNumProducto}</td>
                    <td>${element.fechaMovim}</td>
                    <td>${element.documento}</td>
                    <td>${element.vrEntrada}</td>
                    <td>${element.vrSalida}</td>
                    <td>
                    <button indiceFila="${index}" class="btn btn-warning p-2 mb-1 btnGridEditar" ${htmlDisabledBotones}>Editar</button>
                    <button indiceFila="${index}" class="btn btn-danger p-2 mb-1 btnGridBorrar" ${htmlDisabledBotones}>Eliminar</button>
                    </td>
                </tr>
                `
        }

    });

    //Asignar etiqueta HTML:
    let tbl_movimientos = document.getElementById("bodyTabla")
    tbl_movimientos.innerHTML = cadenaHtml

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
        //mPosicionEditar = indice

        //obtener fila de la tabla según atributo asignado al crear la fila de la tabla HTML:
        let indiceFila = elemento.getAttribute("indiceFila")
        mPosicionEditar = parseInt(indiceFila)
        
        //consultar producto según indice:
        let a_movimientos = Movimiento.obtenerRegistro(mPosicionEditar)

        // cargar nombre del cliente segun nitCliente:
        const inputNombreCliente= Cliente.obtenerNombreCliente(a_movimientos[0].nitCliente)


        // cargar tipo de producto segun idProducto:
        let TipoProductoConsulta= Producto.obtenerTipoProducto(a_movimientos[0].nitCliente, a_movimientos[0].idProducto)
        // cargar nombre del tipo de producto segun TipoProducto:
        let inputNombreTipoProducto= tipoProducto.obtenerNombreTipoProducto(TipoProductoConsulta)
        

        // cargar numero del producto segun idProducto:
        const inputNumProducto= Producto.obtenerNumeroProducto(a_movimientos[0].nitCliente, a_movimientos[0].idProducto)

        document.querySelector("#nitCliente").value= a_movimientos[0].nitCliente ;
        document.querySelector("#nombreSelected1").value= inputNombreCliente ;
        document.querySelector("#idProducto").value= a_movimientos[0].idProducto ;
        document.querySelector("#numeroProductoSelected").value=  inputNombreTipoProducto+ " - " + inputNumProducto;
        document.querySelector("#fechaMovim").value= a_movimientos[0].fechaMovim ;
        document.querySelector("#documento").value= a_movimientos[0].documento ;
        document.querySelector("#vrEntrada").value= a_movimientos[0].vrEntrada ;
        document.querySelector("#vrSalida").value= a_movimientos[0].vrSalida ;

        //refrescar grilla:    
        grillaMovimientos("I", a_movimientos[0].nitCliente)

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

        //obtener fila de la tabla según atributo asignado al crear la fila de la tabla HTML:
        let indiceFila = elemento.getAttribute("indiceFila")

        //Borrar del almacenamiento:
        Movimiento.borrar(indiceFila)
        //Refrescar grilla:
        grillaMovimientos("A","")
    }))
    
}

//---------------------
//LLENAR CONTENIDO SELECT DE CLIENTES:
//---------------------
function selectClientesMov(){

    let a_clientes =[]

    a_clientes = Cliente.obtenerDatosClientes()

    let selectClientesMov = document.querySelector("#selectClientesMov")

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
        selectClientesMov.innerHTML = cadenaHtml
    }
}


//---------------------
//EVENTO CHANGE DEL SELECT DE CLIENTES: LLENA EL SELECT DE PRODUCTOS SEGUN EL CLIENTE SELECCIONADO Y 
//GUARDA EL CLIENTE SELECCIONADO EN EL SELECT
//---------------------
let btnSelecCliente = document.getElementById('selectClientesMov')
btnSelecCliente.addEventListener("change", function(evento){
    evento.preventDefault();
  
    //Tomar usuario seleccionado en el select:
    let nitSeleccion = this.value

    //Input nitCliente destino para asignar el cliente seleccionado:
    let htmlNitCliente = document.getElementById("nitCliente")

    if (nitSeleccion.includes("Seleccione cliente")){
        htmlNitCliente.value = ""
    } else {
        htmlNitCliente.value = nitSeleccion
    }

    //refrescar grilla:    
    grillaMovimientos("A",htmlNitCliente.value)

    selectProductosMov(htmlNitCliente.value)    
})

//---------------------
//LLENAR CONTENIDO SELECT DE LOS PRODUCTOS PARA UN CLIENTE DE ACUERDO AL NIT RECIBIDO POR PARAMETRO
//NOTA: si el parámetro es 0 se retorna un SELECT en blanco únicamente con la opción "Seleccione producto..."
//---------------------
function selectProductosMov(nitClienteSelecc){

    let a_productos =[]

    a_productos = Producto.obtenerDatosProductos()

    let htmlSelectProductosMov = document.querySelector("#selectProductosMov")

    if (a_productos.length){

        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = "<option selected>Seleccione producto...</option>"
        let columnaNombreTipoProducto= ""

        a_productos.forEach(function(element, index) {
            // index: indice del array
            
            //filtrar según nitCliente recibido por parámetro:
            if (element.nitCliente === nitClienteSelecc){

                // cargar nombre del tipo de producto segun TipoProducto:
                columnaNombreTipoProducto= tipoProducto.obtenerNombreTipoProducto(element.tipoProducto)

                cadenaHtml = cadenaHtml + `
                <option value=${element.idProducto}>${columnaNombreTipoProducto + " - "+ element.numeroProducto}</option>
                `
            }
        });
    
        //Asignar etiqueta HTML:
        htmlSelectProductosMov.innerHTML = cadenaHtml
    }
}


//---------------------
//EVENTO CHANGE DEL SELECT DE PRODUCTOS: GUARDA EL PRODUCTO SELECCIONADO EN EL INPUTBOX
//---------------------
let btnSelecProductos = document.getElementById('selectProductosMov')
btnSelecProductos.addEventListener("change", function(evento){
    evento.preventDefault();
    
    //Tomar producto seleccionado en el select:
    let productoSeleccion = this.value

    //Input destino para asignar el cliente seleccionado:
    let htmlIdProductoInput = document.getElementById("idProducto")

    if (productoSeleccion.includes("Seleccione Producto")){
        htmlIdProductoInput.value = ""
    } else {
        htmlIdProductoInput.value = productoSeleccion
    }
    
})