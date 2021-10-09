package org.api

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.unq.ui.model.TwitterSystem

interface ContenidoBusqueda
data class UsuarioBusqueda(val id: String?, val name: String?, val image: String?, val followers: List<Follower>) : ContenidoBusqueda
data class TweetBusqueda(val id: String?, val text: String?, val images: List<String>, val likes: List<Like>, val date: String?, val author: Author) : ContenidoBusqueda
data class RespuestaBusqueda(val content: List<ContenidoBusqueda>)

class ControladorBusqueda (private val sistema: TwitterSystem){

    fun buscar(contexto: Context){
        try {
            val texto = contexto.queryParam("q") ?: throw AtributosNoValidos("Missing query param 'q'")
            contexto.status(200)
            if (texto.startsWith("#")){
                val tweets = sistema.searchByTag(texto).map { TweetBusqueda(it.id, it.text, it.images, it.likes.map {like ->  Like(like.id, like.name, like.image) } , it.date.toString(), Author(it.author.id, it.author.name, it.author.image)) }
                contexto.json(RespuestaBusqueda(tweets))
            }
            else{
                val usuarios = sistema.searchByName(texto).map { UsuarioBusqueda(it.id, it.name, it.image, it.followers.map {follower -> Follower(follower.id, follower.name, follower.image) }) }
                contexto.json(RespuestaBusqueda(usuarios))
            }
        } catch(e: AtributosNoValidos) {
            throw BadRequestResponse(e.message!!)
        }

    }

}