package modelo

import modelo.ValidadorDeURLImagen.esImagenValida
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException

@Observable
class ModeloBorradorTweet(val id: String, var texto: String, var imagen1: String, var imagen2: String, var imagen3: String, var imagen4: String) {

    fun validarTweet() {
        if(texto.isEmpty()) {
            throw UserException("El texto no puede ser vacío")
        }
        if(!(esImagenValida(imagen1) && esImagenValida(imagen2) && esImagenValida(imagen3) && esImagenValida(imagen4))) {
            throw UserException("Al menos una imagen no es válida. Los enlaces a imágenes deben ser urls válidas que comiencen con http:// o https:// y contengan un nombre de imagen en alguno de los siguientes formatos '.jpg', '.jpeg', '.png', '.bmp', '.tif'.\nPor ejemplo: 'https://www.ejemplo.com/ejemplo.png'")
        }
    }


}