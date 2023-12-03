export default class Usuario {
    
     constructor(id, nombre, password, email){
        this.id = id ;
        this.nombre = nombre;
        this.password= password;
        this.email = email
    }

    //---------------------
   //CREAR USUARIO
   //---------------------
    crear() {

        let usuarios = []
        
        if (localStorage.getItem("usuarios")) {
            usuarios = JSON.parse(localStorage.getItem("usuarios"))
        } 
     
        // si no se ha asignado un "id", asignarlo según el tamaño del array:
        this.id = usuarios.length + 1

        usuarios.push(this);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

   //---------------------
   //GUARDAR CAMBIOS AL EDITAR USUARIO
   //---------------------
   guardaEditar(indice) {
       //indice: indice el elemento que se modificó
       
       let usuarios = []
       
       if (localStorage.getItem("usuarios")) {
        usuarios = JSON.parse(localStorage.getItem("usuarios"))
       } 
    
       usuarios[indice].id = this.id;
       usuarios[indice].nombre = this.nombre;
       usuarios[indice].password = this.password;
       usuarios[indice].email = this.email;
       
       localStorage.setItem("usuarios", JSON.stringify(usuarios));
   }

   //---------------------
   //BORRAR USUARIO
   //---------------------
   borrar(indice_array) {
       let usuarios = []

       if (localStorage.getItem("usuarios")) {
        usuarios = JSON.parse(localStorage.getItem("usuarios"))
       } 
    
       usuarios.splice (indice_array, 1);

       localStorage.setItem("usuarios", JSON.stringify(usuarios));
   }

   //---------------------
   //VALIDAR DATOS DEL USUARIO ANTES DE GUARDAR
   //---------------------
   validarDatos(password_confirm) {
    
    if (!this.nombre){
           alert("Por favor confirmar el nombre del usuario")
           return false
       }
       if (!this.password){
           alert("Por favor verificar constraseña")
           return false
       }
       if (!password_confirm){
        alert("Por favor verificar contraseña de confirmación")
        return false
      }

      if (!this.password === password_confirm) {
        alert("Password no coincide")
        return false
       }

    if (this.password.length < 4){
        alert("Password debe contener por lo menos 4 caracteres")
        return false
    }

       if (!this.email){
           alert("Por favor confirmar el correo electrónico del cliente")
           return false
       }else{
           if (!this.email.includes("@")){
               alert("El correo electrónico no es válido")
               return false
           }
       }        
       // Datos correctos
       return true
   }
   
   //---------------------
   //RETORNAR UN USUARIO SEGUN INDICE
   //---------------------
   static obtenerRegistro(indice){
       let a_usuarios = []
       
       if (localStorage.getItem("usuarios")) {
           a_usuarios = JSON.parse(localStorage.getItem("usuarios"))
       }

       //Objeto a retornar:
       let objRetorno = []

       if (indice >= 0){
           objRetorno.push(a_usuarios[indice])
       }

       return objRetorno
   }

   //---------------------
   //RETORNAR TODOS LOS DATOS ACTUALES
   //---------------------
   static obtenerDatos(){
       let a_usuarios = []
       
       if (localStorage.getItem("usuarios")) {
           a_usuarios = JSON.parse(localStorage.getItem("usuarios"))
       } 
       return a_usuarios
   }

   //---------------------
   //VALIDAR USUARIO Y CONTRASEÑA
   //---------------------
   static usuarioValido(id, password){
        let usuarios = []
        
        if (localStorage.getItem("usuarios")) {
            usuarios = JSON.parse(localStorage.getItem("usuarios"))
        } 

        let usuarioExiste = false

        usuarios.forEach(function(element, index) {
            if (element.id===id && element.password===password){
                //usuario y contraseña correctos
                usuarioExiste = true
            }
        })

        return usuarioExiste
    }

}
