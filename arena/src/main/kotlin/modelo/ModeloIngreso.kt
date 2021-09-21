package modelo

import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.User
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException

@Observable
class ModeloIngreso(var email: String, var contrasenia: String, private val sistema: TwitterSystem) {

    fun validarUsuario() : User {
        try {
            return sistema.login(email, contrasenia)
        } catch (e: org.unq.ui.model.NotFound) {
            throw UserException("El usuario o la contraseña son incorrectos.")
        }
    }

    fun sesionUsuario(usuario: User) : ModeloABM {
        return ModeloABM(sistema, usuario)
    }

    fun validarEmail() {
        if(!email.contains("@") || (email.isNotEmpty() && (email[0] == '@' || email.last() == '@'))){
            throw UserException("El email no es válido")
        }
    }
}