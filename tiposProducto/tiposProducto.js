export default class tipoProducto {
    
     constructor(tipoProducto, nombre){
        this.tipoProducto = tipoProducto ;
        this.nombre = nombre;
    }

    //---------------------
    //GRABAR TIPO PRODUCTO NUEVO
    //---------------------
    crearTipoProducto() {
        let TipoProductos = []
        
        if (localStorage.getItem("TipoProductos")) {
            TipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
        } 
     
        TipoProductos.push(this);
        localStorage.setItem("TipoProductos", JSON.stringify(TipoProductos));
    }

    //---------------------
    //GUARDAR CAMBIOS AL EDITAR TIPO DE PRODUCTO
    //---------------------
    guardaEditarTipoProducto(indice) {
        //indice: indice el elemento que se modificó
        
        let TipoProductos = []
        
        if (localStorage.getItem("TipoProductos")) {
            TipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
        } 
     
        TipoProductos[indice].TipoProducto = this.TipoProducto;
        TipoProductos[indice].nombre = this.nombre;
        
        localStorage.setItem("TipoProductos", JSON.stringify(TipoProductos));
    }

    //---------------------
    //BORRAR TIPO DE PRODUCTO
    //---------------------
    static borrarTipoProducto(indice_array) {
        let TipoProductos = []

        if (localStorage.getItem("TipoProductos")) {
            TipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
        } 
     
        TipoProductos.splice (indice_array, 1);

        localStorage.setItem("TipoProductos", JSON.stringify(TipoProductos));
    }

    //---------------------
    //VALIDAR DATOS DEL TIPO DE PRODUCTO ANTES DE GUARDAR
    //---------------------
    validarDatosTipoProducto() {
        if (!this.tipoProducto){
            swal("Por favor confirmar el código de Tipo de Producto: "+ this.tipoProducto)
            return false
        }
        if (this.tipoProducto.length < 2){
            swal("Código del Tipo de Producto debe contener por lo menos 2 caracteres")
            return false
        }
            if (!this.nombre){
            swal("Por favor confirmar el nombre del tipo de producto")
            return false
        }
        // Datos correctos
        return true
    }
    
    //---------------------
    //RETORNAR UN TIPO DE PRODUCTO SEGUN INDICE
    //---------------------
    static obtenerRegistroTipoProducto(indice){
        let a_tipoProductos = []
        
        if (localStorage.getItem("TipoProductos")) {
            a_tipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
        }

        //Objeto a retornar:
        let objRetorno = []

        if (indice >= 0){
            objRetorno.push(a_tipoProductos[indice])
        }

        return objRetorno
    }

   //---------------------
   //RETORNAR NOMBRE DE UN TIPO DE PRODUCTO RECIBIDO POR PARAMETRO
   //---------------------
   static obtenerNombreTipoProducto(idTipoProductoConsultar){
        let a_TipoProductos = []
        
        if (localStorage.getItem("TipoProductos")) {
            a_TipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
        } 
        
        let nombreTipoProducto = ""

        a_TipoProductos.forEach(function(element, index) {
            
            if (element.tipoProducto=== idTipoProductoConsultar){
                nombreTipoProducto = element.nombre
            }
        })
        return nombreTipoProducto
    }

    //---------------------
    //RETORNAR TODOS LOS DATOS ACTUALES
    //---------------------
    static obtenerDatosTipoProductos(){
        let a_tipoProductos = []
        
        if (localStorage.getItem("TipoProductos")) {
            a_tipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
        } 
        return a_tipoProductos
    }

   //---------------------
   //VALIDAR TIPO DE PRODUCTO UNICO (PK)
   //---------------------
   tipoProductoExiste(tipoProductoVerificar){
    let a_tipoProductos = []

    if (localStorage.getItem("TipoProductos")) {
        a_tipoProductos = JSON.parse(localStorage.getItem("TipoProductos"))
    } 

    let tipoProductoExiste = false

    a_tipoProductos.forEach(function(element, index) {

        if (element.tipoProducto===tipoProductoVerificar){
            //nit Cliente ya existe
            tipoProductoExiste = true
        }
    })

    return tipoProductoExiste
    }

//---------------------
//INTEGRIDAD REFERENCIAL DEL TIPO DE PRODUCTO EN OTRAS ENTIDADES
//---------------------
static tipoProductoDependencias(tipoProductoVerificar){

    //valor a retornar la función:
    //true = el tipoProducto tiene dependencias
    //false = el tipoProducto no tiene dependencias
    let dependencias
    dependencias=false

    //validar en productos:
    let a_productos = []

    if (localStorage.getItem("productos")) {
        a_productos = JSON.parse(localStorage.getItem("productos"))
    } 

    a_productos.forEach(function(element, index) {

        if (element.tipoProducto===tipoProductoVerificar){
            //tipoProducto tiene dependencias
            dependencias = true
        }
    })

    return dependencias
}

}
