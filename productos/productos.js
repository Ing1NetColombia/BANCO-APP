export default class Producto {
    
     constructor(nitCliente, idProducto, tipoProducto, numeroProducto){
        this.nitCliente = nitCliente ;
        this.idProducto = idProducto;
        this.tipoProducto = tipoProducto;
        this.numeroProducto= numeroProducto;
    }

   //---------------------
   //GRABAR PRODUCTO NUEVO
   //---------------------
    crearProducto() {

        let productos = []
        
        if (localStorage.getItem("productos")) {
            productos = JSON.parse(localStorage.getItem("productos"))
        } 

        productos.push(this);
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    
   //---------------------
   //GUARDAR CAMBIOS AL EDITAR PRODUCTO
   //---------------------
   guardaEditarProducto(indice) {
       //indice: indice el elemento que se modificó
       
       let productos = []
       
       if (localStorage.getItem("productos")) {
           productos = JSON.parse(localStorage.getItem("productos"))
       } 
    
       productos[indice].nitCliente = this.nitCliente;
       productos[indice].idProducto = this.idProducto;
       productos[indice].tipoProducto = this.tipoProducto;
       productos[indice].numeroProducto = this.numeroProducto;

       localStorage.setItem("productos", JSON.stringify(productos));
   }

   //---------------------
   //BORRAR PRODUCTO
   //---------------------
   borrarProducto(indice_array) {
       let productos = []

       if (localStorage.getItem("productos")) {
        productos = JSON.parse(localStorage.getItem("productos"))
       } 
    
       productos.splice (indice_array, 1);

       localStorage.setItem("productos", JSON.stringify(productos));
   }

   //---------------------
   //VALIDAR DATOS DEL PRODUCTO ANTES DE GUARDAR
   //---------------------
   validarDatosProductos() {
       if (!this.nitCliente){
           alert("Por favor confirmar el nit del cliente")
           return false
       }
       if (!this.idProducto){
           alert("Por favor confirmar el código del producto")
           return false
       }
       if (!this.tipoProducto){
           alert("Por favor confirmar el tipo de producto")
           return false
       }
       if (!this.numeroProducto){
           alert("Por favor confirmar el número del producto")
           return false
       }
       // Datos correctos
       return true
   }
   
   //---------------------
   //RETORNAR UN PRODUCTO SEGUN INDICE
   //---------------------
   static obtenerRegistroProductos(indice){
       let a_productos = []
       
       if (localStorage.getItem("productos")) {
        a_productos = JSON.parse(localStorage.getItem("productos"))
       }

       //Objeto a retornar:
       let objRetorno = []

       if (indice >= 0){
           objRetorno.push(a_productos[indice])
       }

       return objRetorno
   }

   //---------------------
   //RETORNAR TODOS LOS DATOS ACTUALES
   //---------------------
   static obtenerDatosProductos(){

       let a_productos = []
       
       if (localStorage.getItem("productos")) {
        a_productos = JSON.parse(localStorage.getItem("productos"))
       } 
       return a_productos
   }

    //---------------------
   //RETORNAR No.DE PRODUCTO DE UN CLIENTE Y PRODUCTO RECIBIDO POR PARAMETRO
   //---------------------
   static obtenerNumeroProducto(nitClienteVerificar, idProductoVerificar){
    let a_productos = []
    
    if (localStorage.getItem("productos")) {
        a_productos = JSON.parse(localStorage.getItem("productos"))
    } 

    let numeroProducto = ""

    a_productos.forEach(function(element, index) {

        if ((element.nitCliente=== nitClienteVerificar) && (element.idProducto=== idProductoVerificar)){
            numeroProducto = element.numeroProducto
        }
    })

    return numeroProducto
    }

   //---------------------
   //RETORNAR TIPO DE PRODUCTO DE UN CLIENTE Y PRODUCTO RECIBIDO POR PARAMETRO
   //---------------------
   static obtenerTipoProducto(nitClienteVerificar, idProductoVerificar){
    let a_productos = []
    
    if (localStorage.getItem("productos")) {
        a_productos = JSON.parse(localStorage.getItem("productos"))
    } 

    let tipoProducto = ""

    a_productos.forEach(function(element, index) {

        if ((element.nitCliente=== nitClienteVerificar) && (element.idProducto=== idProductoVerificar)) {
            tipoProducto = element.tipoProducto
        }
    })

    return tipoProducto
    }

   //---------------------
   //VALIDAR CODIGO DE PRODUCTO UNICO POR CLIENTE Y TIPO DE PRODUCTO (PK)
   //---------------------
   idProductoExiste(nitClienteVerificar, idProductoVerificar){
    let a_tipoProductos = []

    if (localStorage.getItem("productos")) {
        a_tipoProductos = JSON.parse(localStorage.getItem("productos"))
    } 

    let idProductoExiste = false

    a_tipoProductos.forEach(function(element, index) {

        if ((element.nitCliente===nitClienteVerificar) && (element.idProducto===idProductoVerificar)){
            //idProducto ya existe
            idProductoExiste = true
            }
    })

    return idProductoExiste
}

//---------------------
//VALIDAR NUMERO DE PRODUCTO UNICO : LOS NUMEROS DE PRODUCTO DEBEN SER UNICOS DENTRO DEL BANCO
//---------------------
numeroProductoExiste(numeroProductoVerificar){

    let a_tipoProductos = []

    if (localStorage.getItem("productos")) {
        a_tipoProductos = JSON.parse(localStorage.getItem("productos"))
    } 

    let numeroProductoExiste = false

    a_tipoProductos.forEach(function(element, index) {

        if (element.numeroProducto===numeroProductoVerificar){
            //idProducto ya existe
            numeroProductoExiste = true
            }
    })

    return numeroProductoExiste
}

//---------------------
//CALCULAR NUMERO CONSECUTIVO (001 A 999) PARA EL PRODUCTO, DE ACUERDO AL CLIENTE RECIBIDO POR PARAMETRO
//---------------------
static calcularConsecutivoProducto(nitClienteVerificar){

    let a_tipoProductos = []

    if (localStorage.getItem("productos")) {
        a_tipoProductos = JSON.parse(localStorage.getItem("productos"))
    } 

    let consecutivoProducto = ""
    let ultimo = 0
    
    a_tipoProductos.forEach(function(element, index) {

        //determinar el máximo idProducto del cliente recibido por parámetro:
        if (element.nitCliente===nitClienteVerificar){
            if (parseInt(element.idProducto) > ultimo){
                ultimo = parseInt(element.idProducto)
            }
        }
    })

    //calcular número consecutivo agregando ceros a la izquierda:
    ultimo = ultimo + 1
    consecutivoProducto = ultimo.toString().padStart(3, '0')

    return consecutivoProducto
}

//---------------------
//INTEGRIDAD REFERENCIAL DEL PRODUCTO EN OTRAS ENTIDADES
//---------------------
static idProductoDependencias(nitClienteVerificar, idProductoVerificar){

    //valor a retornar la función:
    //true = el producto tiene dependencias
    //false = el producto no tiene dependencias
    let dependencias
    dependencias=false

    //validar en movimientos:
    let a_movimientos = []

    if (localStorage.getItem("movimientos")) {
        a_movimientos = JSON.parse(localStorage.getItem("movimientos"))
    } 

    a_movimientos.forEach(function(element, index) {

        if ((element.idProducto===idProductoVerificar) && (element.nitCliente===nitClienteVerificar)){
            //producto del Cliente tiene dependencias
            dependencias = true
        }
    })

    return dependencias
}

}
