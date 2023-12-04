export default class Movimiento {
    
     constructor(nitCliente, idProducto, fechaMovim, documento, vrEntrada, vrSalida){
        this.nitCliente = nitCliente ;
        this.idProducto = idProducto;
        this.fechaMovim= fechaMovim;
        this.documento= documento;
        this.vrEntrada= vrEntrada;
        this.vrSalida= vrSalida;
    }

      //---------------------
      //GRABAR MOVIMIENTO NUEVO
      //---------------------
       crear() {
   
           let movimientos = []
           
           if (localStorage.getItem("movimientos")) {
                movimientos = JSON.parse(localStorage.getItem("movimientos"))
           } 
   
           movimientos.push(this);
           localStorage.setItem("movimientos", JSON.stringify(movimientos));
       }
       
      //---------------------
      //GUARDAR CAMBIOS AL EDITAR MOVIMIENTO
      //---------------------
      guardaEditar(indice) {
          //indice: indice el elemento que se modificó
          
          let movimientos = []
          
          if (localStorage.getItem("movimientos")) {
                movimientos = JSON.parse(localStorage.getItem("movimientos"))
          } 
       
          movimientos[indice].nitCliente = this.nitCliente;
          movimientos[indice].idProducto = this.idProducto;
          movimientos[indice].fechaMovim = this.fechaMovim;
          movimientos[indice].documento = this.documento;
          movimientos[indice].vrEntrada = this.vrEntrada;
          movimientos[indice].vrSalida = this.vrSalida;
   
          localStorage.setItem("movimientos", JSON.stringify(movimientos));
      }
   
      //---------------------
      //BORRAR MOVIMIENTO
      //---------------------
      static borrar(indice_array) {
          let movimientos = []
   
          if (localStorage.getItem("movimientos")) {
            movimientos = JSON.parse(localStorage.getItem("movimientos"))
          } 
       
          movimientos.splice (indice_array, 1);
   
          localStorage.setItem("movimientos", JSON.stringify(movimientos));
      }
   
      //---------------------
      //VALIDAR DATOS DEL MOVIMIENTO ANTES DE GUARDAR
      //---------------------
      validarDatos() {

          let mVrEntrada= parseInt(this.vrEntrada)
          if (!mVrEntrada){
            mVrEntrada=0
          }

          let mVrSalida = parseInt(this.vrSalida)
          if (!mVrSalida){
            mVrSalida=0
          }

          if (!this.nitCliente){
            swal("Por favor confirmar el nit del cliente")
              return false
          }
          if (!this.idProducto){
            swal("Por favor confirmar el código del producto")
              return false
          }
          if (!this.documento){
            swal("Por favor confirmar el documento")
              return false
          }
          if (mVrEntrada<0 || mVrSalida<0){
            swal("Por favor verifique valor negativo de la entrada o salida")
            return false
          }
          if (mVrEntrada===0 && mVrSalida===0) {
            swal("No se acepta movimiento con valor de entrada o salida en cero")
            return false
          }
          if (mVrEntrada>0 && mVrSalida>0) {
            swal("No se acepta movimiento con valor de entrada o salida al mismo tiempo")
            return false
          }

          // Datos correctos
          return true
      }
      
      //---------------------
      //RETORNAR UN MOVIMIENTO SEGUN INDICE
      //---------------------
      static obtenerRegistro(indice){
          let a_movimientos = []
          
          if (localStorage.getItem("movimientos")) {
            a_movimientos = JSON.parse(localStorage.getItem("movimientos"))
          }
   
          //Objeto a retornar:
          let objRetorno = []
   
          if (indice >= 0){
              objRetorno.push(a_movimientos[indice])
          }
   
          return objRetorno
      }
   
      //---------------------
      //RETORNAR TODOS LOS DATOS ACTUALES
      //---------------------
      static obtenerDatos(){
   
          let a_movimientos = []
          
          if (localStorage.getItem("movimientos")) {
            a_movimientos = JSON.parse(localStorage.getItem("movimientos"))
          } 
          return a_movimientos
      }
   }
   
