import TipoProducto from "../tiposProducto/tiposProducto.js";

//Variables:
//Indice elemento a modificar:
var mPosicionEditar = 0

//MOSTRAR DATOS GRILLA AL CARGAR LA PAGINA
document.onload = grillaTipoProductos()

//---------------------
//EVENTO CLICK BOTON AGREGAR DEL FORM
//---------------------
var btnRegistrarTipoProducto = document.getElementById('btnAgregarTipoProducto')
if (btnRegistrarTipoProducto){

    btnRegistrarTipoProducto.addEventListener("click", function(evento){
        evento.preventDefault();
    
        const tipoProducto = document.querySelector("#tipoProducto").value ;
        const nombre = document.querySelector("#nombre").value ;
        
        // crear objeto para invocar métodos de la clase
        let objTipoProducto = new TipoProducto(tipoProducto, nombre); 
    
        if (objTipoProducto.validarDatosTipoProducto()){

            //validar tipoProducto único (PK)
            if (objTipoProducto.tipoProductoExiste(tipoProducto)){
                alert("Este código de Tipo Producto ya existe, no se aceptan repetidos")
                return false
            }

            //Guardar en el almacenamiento:
            objTipoProducto.crearTipoProducto()
            alert("Tipo de Producto ha sido creado")
            //refrescar grilla:    
            grillaTipoProductos()
            //limpiar formulario:
            limpiarFormTipoProductos()
    
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotonesTipoProductos("AGREGAR")
        }
        
    })
}

//---------------------
////EVENTO CLICK BOTON GUARDAR CAMBIOS AL MODIFICAR DEL FORM
//---------------------
let btnModificarTipoProducto = document.getElementById('btnModificarTipoProducto')

if (btnModificarTipoProducto){
    btnModificarTipoProducto.addEventListener("click", function(evento){
        evento.preventDefault();
    
        const tipoProducto = document.querySelector("#tipoProducto").value ;
        const nombre = document.querySelector("#nombre").value ;
      
        // crear objeto para invocar métodos de la clase
        let objTipoProducto = new TipoProducto(TipoProducto, nombre); 
    
        if (objTipoProducto.validarDatosTipoProducto()){
            //Guardar en el almacenamiento:
            objTipoProducto.guardaEditarTipoProducto(mPosicionEditar)
            alert("Cambios han sido guardados")
            //refrescar grilla:    
            grillaTipoProductos()
            //limpiar formulario:
            limpiarFormTipoProductos()
    
            //Actualizar estado de botones Agregar y Modificar:
            estadoBotonesTipoProductos("AGREGAR")
        }
    
    })    
}

//---------------------
//EVENTO CLICK BOTON CANCELAR DEL FORM
//---------------------
let btnCancelar = document.getElementById('btnCancelarTipoProducto')

if (btnCancelar){

    btnCancelar.addEventListener("click", function(evento){
        evento.preventDefault();
    
        //limpiar formulario:
        limpiarFormTipoProductos()
    
        //Actualizar estado de botones Agregar y Modificar:
        estadoBotonesTipoProductos("AGREGAR")
        }
    
    )    
}

//---------------------
//LIMPIAR CONTROLES DEL FORM DE CAPTURA
//---------------------
function limpiarFormTipoProductos(){

    document.querySelector("#tipoProducto").value ="" ;
    document.querySelector("#nombre").value="" ;
}

//---------------------
//ACTUALIZAR ESTADO DE BOTONES DEL FORM:
//Para el Estado "AGREGAR": se oculta el botón Modificar
//Para el Estado "MODIFICAR": se oculta el botón Agregar
//---------------------
function estadoBotonesTipoProductos(estado){
    //estado: Valores posibles -> AGREGAR, MODIFICAR

    if (estado==="AGREGAR"){
        //activar botón Agregar:
        let boton = document.querySelector("#btnAgregarTipoProducto")
        boton.style.display = "block"

        //desactivar botón Modificar:
        boton = document.querySelector("#btnModificarTipoProducto")
        boton.style.display = "none"

        //activar input TipoProducto:
        boton = document.querySelector("#tipoProducto")
        boton.disabled = false

        //llevar el foco al input TipoProducto:
        boton = document.querySelector("#tipoProducto")
        boton.focus()
        
    } else if (estado==="MODIFICAR") {
        //desactivar botón Agregar:
        let boton = document.querySelector("#btnAgregarTipoProducto")
        boton.style.display = "none"

        //activar botón Modificar:
        boton = document.querySelector("#btnModificarTipoProducto")
        boton.style.display = "block"

        //inactivar input TipoProducto:
        boton = document.querySelector("#tipoProducto")
        boton.disabled = true
 
        //llevar el foco al input nombre del cliente:
        boton = document.querySelector("#nombre")
        boton.focus()
    }
}

//---------------------
//LLENAR CONTENIDO GRILLA:
//---------------------
function grillaTipoProductos(){
    let a_TipoProductos =[]

    let tbl_TipoProductos = document.getElementById("bodyTablaTipoProductos")

    if (tbl_TipoProductos){
        a_TipoProductos = TipoProducto.obtenerDatosTipoProductos()

        //Llenar String con contenido HTML para asignar a la etiqueta
        let cadenaHtml = ""
        a_TipoProductos.forEach(function(element, index) {
            // index: indice del array
            cadenaHtml = cadenaHtml + `
                <tr style="height: 20px;">
                    <td>${element.tipoProducto}</td>
                    <td>${element.nombre}</td>
                    <td>
                    <button class="btn btn-warning p-2 mb-1 btnGridEditarTipoProducto">Editar</button>
                    <button class="btn btn-danger p-2 mb-1 btnGridBorrarTipoProducto">Eliminar</button>
                    </td>
                </tr>
                `
        });
    
        //Asignar etiqueta HTML:
        tbl_TipoProductos.innerHTML = cadenaHtml
    
        //Crear los eventos CLICK de los botones EDITAR Y BORRAR de la grilla
        clickEditarTipoProductos()
        clickBorrarTipoProductos()
    
    }
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "EDITAR" DE LA GRILLA
//---------------------
function clickEditarTipoProductos(){
    const a_bot_editar = document.querySelectorAll(".btnGridEditarTipoProducto")
 
    a_bot_editar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {

        mPosicionEditar = indice

        //consultar TipoProducto según indice:
        let a_TipoProducto = TipoProducto.obtenerRegistroTipoProducto(mPosicionEditar)

        document.querySelector("#tipoProducto").value= a_TipoProducto[0].tipoProducto ;
        document.querySelector("#nombre").value= a_TipoProducto[0].nombre ;

        //Actualizar estado de botones Agregar y Modificar:
        estadoBotonesTipoProductos("MODIFICAR")    
    }))
    
}

//---------------------
//CREAR EVENTOS CLICK DEL BOTON "BORRAR" DE LA GRILLA
//---------------------
function clickBorrarTipoProductos(){
    const a_bot_borrar = document.querySelectorAll(".btnGridBorrarTipoProducto")

    a_bot_borrar.forEach((elemento, indice) => elemento.addEventListener("click", function(evento) {
        //Borrar del almacenamiento:
        let objTipoProducto = new TipoProducto(0,"","","","")
        objTipoProducto.borrarTipoProducto(indice)
        //Refrescar grilla:
        grillaTipoProductos()
    }))
    
}