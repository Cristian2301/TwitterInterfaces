package modelo

import modelo.ValidadorDeURLImagen.esImagenValida
import org.unq.ui.model.TwitterSystem
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException

@Observable
class ModeloBorradorPerfil (val sistema: TwitterSystem,  val id : String, var nombre : String, var imagen : String) {
    fun validarPerfil() {
        this.validarUsuario()
    }

    fun validarUsuario() {
        if(nombre.isEmpty()) {
            throw UserException("El campo de usuario no puede estar vacío.")
        }
        if(!esImagenValida(imagen)) {
            throw UserException("La imagen no es válida. El enlace a la imagen debe ser url válida que comience con http:// o https:// y contenga un nombre de imagen en alguno de los siguientes formatos '.jpg', '.jpeg', '.png', '.bmp', '.tif'.\nPor ejemplo: 'https://www.ejemplo.com/ejemplo.png'")
        }
    }

    fun editarContrasenia(modeloContrasenia: ModeloBorradorContrasenia) {
        val usuario = sistema.getUser(id)
        sistema.editProfile(usuario.id, usuario.name, modeloContrasenia.contraseniaNueva, usuario.image)
    }
}