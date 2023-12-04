export default class Utils {
//FUNCIONES DE PROPOSITO GENERAL:

//---------------------
//VALIDAR UNA FECHA SEGUN FORMATO: aaaammdd
//---------------------
static fechaValida(fechaVerificar, mensajeFecha){

    //parametros:
    //fechaVerificar: fecha a validar
    //mensajeFecha: mensaje que se va a mostrar al usuario

    let fechaValida = true

    if (fechaVerificar){
        if (fechaVerificar.length===8){
          //validar string de fecha:
          const anno = fechaVerificar.substr(0, 4)
          const mes = fechaVerificar.substr(4, 2)
          const dia = fechaVerificar.substr(6, 2)
          let diaFinMes = ""

          //validar año:
          if (!(parseInt(anno)>=1900 && parseInt(anno)<=2100)){
            swal("El año de la "+ mensajeFecha + " debe estar entre 1900 y 2100")
               fechaValida = false
          }

          //validar mes:
          if (!(parseInt(mes)>=1 && parseInt(mes)<=12)){
            swal("El mes de la "+ mensajeFecha + " debe estar entre 01 y 12")
            fechaValida = false
           }
          //validar dia:
          if (mes==="02"){
              if((anno % 4)===0){
                  //año bisiesto
                  diaFinMes = "29"
              }else{
                diaFinMes = "28"
              }
          }else if(mes==="04" || mes==="06" || mes==="09" || mes==="11"){
                diaFinMes = "30"
          }else {
                diaFinMes = "31"
          }

          if (!((dia>="01") && (dia<=diaFinMes))){
            swal("El dia de la "+ mensajeFecha + " debe estar entre 01 y " + diaFinMes)
            fechaValida = false
           }

        }else{
            swal("La "+ mensajeFecha + "  debe tener 8 dígitos")
            fechaValida = false
        }

    }else{
        swal("Por favor confirmar la " + mensajeFecha)
        return false
    }

    return fechaValida
}

//-------------------------------------------------------------------------------------
//CAMBIAR EL ESTADO DEL ICONO DE INPUT DEL PASSWORD Y EL TYPE DEL INPUT "TEXT/PASSWORD"
//--------------------------------------------------------------------------------------
static estadoPassword(htmlImagen, htmlInput){

    if (htmlImagen.className.includes("fa-eye-slash")){
        //mostrar
        htmlImagen.className="fas fa-eye"
        htmlInput.type="text"
    }else{
        //ocultar
        htmlImagen.className="fas fa-eye-slash"
        htmlInput.type="password"
    }
}

//-------------------------------------------------------------------------------------
//DETERMINAR SI ES LA PRIMERA VEZ QUE SE INGRESA AL SISTEMA, PARA SOLICITAR LA CREACION
//DEL PRIMER USUARIO.  LOS DEMAS USUARIOS SE DEBERÁN CREAR DENTRO DE LA APLICACION.
//--------------------------------------------------------------------------------------
static siPrimeraVez(){
    
    let primeraVez = "S"

    let a_usuarios = []
       
    if (localStorage.getItem("usuarios")) {
        a_usuarios = JSON.parse(localStorage.getItem("usuarios"))
    } 

    if (a_usuarios.length){
        primeraVez = "N"
    }
    return primeraVez
}

}
