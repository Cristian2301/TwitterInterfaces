package modelo

import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException
import java.time.LocalDateTime

@Observable
class ModeloTweet(var id: String, var texto: String, var fecha: LocalDateTime, var imagenes: MutableList<String>){
    fun imagen(indice: Int): String {
        return if(indice > imagenes.lastIndex) {
            ""
        }
        else {
            imagenes[indice]
        }
    }
}