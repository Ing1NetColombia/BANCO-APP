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
   //RETORNAR No.DE PRODUCTO DE UN PRODUCTO RECIBIDO POR PARAMETRO
   //---------------------
   static obtenerNumeroProducto(idProducto){
    let a_productos = []
    
    if (localStorage.getItem("productos")) {
        a_productos = JSON.parse(localStorage.getItem("productos"))
    } 

    let numeroProducto = ""

    a_productos.forEach(function(element, index) {

        if (element.idProducto=== idProducto){
            numeroProducto = element.numeroProducto
        }
    })

    return numeroProducto
    }

}
