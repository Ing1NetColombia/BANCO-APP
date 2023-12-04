export default class Cliente {
    
     constructor(nitCliente, nombre, direcc, ciudad, email){
        this.nitCliente = nitCliente ;
        this.nombre = nombre;
        this.direcc= direcc;
        this.ciudad = ciudad;
        this.email = email;
    }

    //---------------------
    //GRABAR CLIENTE NUEVO
    //---------------------
    crearCliente() {
        let clientes = []
        
        if (localStorage.getItem("clientes")) {
            clientes = JSON.parse(localStorage.getItem("clientes"))
        } 
     
        clientes.push(this);
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    //---------------------
    //GUARDAR CAMBIOS AL EDITAR CLIENTE
    //---------------------
    guardaEditarCliente(indice) {
        //indice: indice el elemento que se modificó
        
        let clientes = []
        
        if (localStorage.getItem("clientes")) {
            clientes = JSON.parse(localStorage.getItem("clientes"))
        } 
     
        clientes[indice].nitCliente = this.nitCliente;
        clientes[indice].nombre = this.nombre;
        clientes[indice].direcc = this.direcc;
        clientes[indice].ciudad = this.ciudad;
        clientes[indice].email = this.email;

        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    //---------------------
    //BORRAR CLIENTE
    //---------------------
    static borrarCliente(indice_array) {
        let clientes = []

        if (localStorage.getItem("clientes")) {
            clientes = JSON.parse(localStorage.getItem("clientes"))
        } 
     
        clientes.splice (indice_array, 1);

        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    //---------------------
    //VALIDAR DATOS DEL CLIENTE ANTES DE GUARDAR
    //---------------------
    validarDatosCliente() {
        if (!this.nitCliente || parseInt(this.nitCliente)<=0){
            swal("Por favor confirmar el nit del cliente")
            return false
        }
        if (!this.nombre){
            swal("Por favor confirmar el nombre del cliente")
            return false
        }
        if (!this.direcc){
            swal("Por favor confirmar la dirección del cliente")
            return false
        }
        if (!this.ciudad){
            swal("Por favor confirmar la ciudad del cliente")
            return false
        }
        if (!this.email){
            swal("Por favor confirmar el correo electrónico del cliente")
            return false
        }else{
            if (!this.email.includes("@")){
                swal("El correo electrónico no es válido")
                return false
            }
        }      
        // Datos correctos
        return true
    }
    
    //---------------------
    //RETORNAR UN CLIENTE SEGUN INDICE
    //---------------------
    static obtenerRegistroCliente(indice){
        let a_clientes = []
        
        if (localStorage.getItem("clientes")) {
            a_clientes = JSON.parse(localStorage.getItem("clientes"))
        }

        //Objeto a retornar:
        let objRetorno = []

        if (indice >= 0){
            objRetorno.push(a_clientes[indice])
        }

        return objRetorno
    }

   //---------------------
   //RETORNAR NOMBRE DE UN CLIENTE RECIBIDO POR PARAMETRO
   //---------------------
   static obtenerNombreCliente(idCliente){
        let a_clientes = []
        
        if (localStorage.getItem("clientes")) {
            a_clientes = JSON.parse(localStorage.getItem("clientes"))
        } 

        let nombreCliente = ""

        a_clientes.forEach(function(element, index) {

            if (element.nitCliente=== idCliente){
                nombreCliente = element.nombre


            }
        })

        return nombreCliente
    }

    //---------------------
    //RETORNAR TODOS LOS DATOS ACTUALES
    //---------------------
    static obtenerDatosClientes(){
        let a_clientes = []
        
        if (localStorage.getItem("clientes")) {
            a_clientes = JSON.parse(localStorage.getItem("clientes"))
        } 
        return a_clientes
    }

   //---------------------
   //VALIDAR NIT DE CLIENTE UNICO (PK)
   //---------------------
   nitClienteExiste(nitClienteVerificar){
        let a_clientes = []

        if (localStorage.getItem("clientes")) {
            a_clientes = JSON.parse(localStorage.getItem("clientes"))
        } 

        let nitClienteExiste = false

        a_clientes.forEach(function(element, index) {

            if (element.nitCliente===nitClienteVerificar){
                //nitCliente ya existe
                nitClienteExiste = true
            }
        })

        return nitClienteExiste
    }

    //---------------------
   //INTEGRIDAD REFERENCIAL DEL CLIENTE EN OTRAS ENTIDADES
   //---------------------
   static nitClienteDependencias(nitClienteVerificar){

        //valor a retornar la función:
        //true = el cliente tiene dependencias
        //false = el cliente no tiene dependencias
        let dependencias
        dependencias=false

        //validar en productos:
        let a_productos = []

        if (localStorage.getItem("productos")) {
            a_productos = JSON.parse(localStorage.getItem("productos"))
        } 

        a_productos.forEach(function(element, index) {

            if (element.nitCliente===nitClienteVerificar){
                //nitCliente tiene dependencias
                dependencias = true
            }
        })

        return dependencias
    }

}
