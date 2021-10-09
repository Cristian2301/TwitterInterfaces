package org.api.controladores.validador

import io.javalin.http.BadRequestResponse
import org.api.AtributosNoValidos

object Validador {

    inline fun throwIf(condicion: Boolean, thr: () -> Throwable) {
        if(condicion) {
            throw thr()
        }
    }

    fun validarAtributoString(string: String?){
        throwIf(string == null || string.isEmpty()) { AtributosNoValidos() }
    }

    fun validarAtributosString(vararg atributos: String?){
        for(atributo in atributos){
            validarAtributoString(atributo)
        }
    }

    fun validarTextoEImagenTweet(texto: String?, imagenes: List<String>?){
        throwIf((texto == null || texto.isEmpty()) && (imagenes == null || imagenes.isEmpty() || imagenes.contains(""))) { AtributosNoValidos() }
    }

    fun validarImagenUsuario(imagen: String?){
        throwIf(imagen == null) { AtributosNoValidos() }
    }
}