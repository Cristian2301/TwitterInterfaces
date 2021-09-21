package modelo

import org.unq.ui.model.TwitterSystem
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException

@Observable
class ModeloBorradorContrasenia(val sistema: TwitterSystem, val idUsuario: String, var contrasenia: String, var contraseniaNueva: String, var contraseniaNuevaConfirmacion: String ){
    fun validarContrasenia() {
        if(sistema.getUser(idUsuario).password != contrasenia) {
            throw UserException("La contraseña es incorrecta.")
        }
        if(contraseniaNueva.isEmpty()) {
            throw UserException("El campo de contraseña nueva no puede estar vacío.")
        }
        if(!this.esContraseniaValida()) {
            throw UserException("La nueva contraseña no es válida, debe contener al menos un número, una mayúscula y una minúscula.")
        }
        if(contraseniaNueva != contraseniaNuevaConfirmacion){
            throw UserException("Los campos con la nueva contraseña no coinciden entre sí.")
        }
    }

    fun esContraseniaValida(): Boolean {
        return (
                contraseniaNueva.contains("(?=.*[0-9])".toRegex()) &&
                        (contraseniaNueva.contains("(?=.*[a-z])".toRegex()) &&
                                contraseniaNueva.contains("(?=.*[A-Z])".toRegex()))
                )
    }
}