package org.api

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.api.controladores.formateadorFecha.FormateadorFecha
import org.api.controladores.validador.Validador.validarTextoEImagenTweet
import org.unq.ui.model.DraftTweet
import org.unq.ui.model.NotFound
import org.unq.ui.model.Tweet
import org.unq.ui.model.TwitterSystem

interface TweetComentado

data class TweetReplicanteComentado(val id: String?, val text: String?, val images: List<String>, val reply: Reply?, val likes: List<Like>? = emptyList(), val date: String?, val author: Author, val comments: List<Comentario>): TweetComentado
data class TweetNoReplicanteComentado(val id: String?, val text: String?, val images: List<String>, val likes: List<Like>? = emptyList(), val date: String?, val author: Author, val comments: List<Comentario>): TweetComentado
data class Comentario(val id: String?, val text: String?, val images: List<String>?, val author: Author?, val reply: Reply?, val likes: List<Like>?, val date: String?)
data class BorradorComentario(val text: String?, val images: MutableList<String>?)

class ControladorTweet(private val sistema: TwitterSystem) {

    fun devolverTweet(contexto: Context){
        val idTweet = contexto.pathParam("tweetId")
        try {
            val tweet = sistema.getTweet(idTweet)
            contexto.status(200)
            contexto.json(tweetComentado(
                tweet.id,
                tweet.text,
                tweet.images,
                tweet.reply,
                tweet.likes.map { Like(it.id, it.name, it.image) },
                FormateadorFecha.formatearFecha(tweet.date),
                Author(tweet.author.id, tweet.author.name, tweet.author.image),
                tweet.comments.map {
                    Comentario(
                        it.id,
                        it.text,
                        it.images,
                        Author(tweet.author.id, it.author.name, it.author.image),
                        if(it.reply == null){ null }else{Reply(it.reply?.id, it.reply?.text, it.reply?.images, Author(it.reply?.id, it.reply?.author?.name, it.reply?.author?.image))},
                        it.likes.map { like -> Like(like.id, like.name, like.image) },
                        FormateadorFecha.formatearFecha(it.date)
                    )
                }))
        } catch(e: NotFound) {
            contexto.status(404)
            contexto.json(Result("Not found tweet with id $idTweet"))
        }
    }

    fun likear(contexto: Context){
        val idUsuarioSesion: String = contexto.attribute("id")!!
        val idTweet = contexto.pathParam("tweetId")
        try {
            sistema.updateLike(idTweet, idUsuarioSesion)
            contexto.status(200)
            contexto.json(Result("ok"))
        } catch(e: NotFound) {
            contexto.status(404)
            contexto.json(Result("Not found tweet with id $idTweet"))
        }
    }

    fun comentar(contexto: Context){
        val idUsuarioSesion: String = contexto.attribute("id")!!
        val idTweet = contexto.pathParam("tweetId")
        try {
            val tweetComentario = contexto.body<BorradorComentario>()
            validarTextoEImagenTweet(tweetComentario.text, tweetComentario.images)
            val comentarioCreado = sistema.addComment(idTweet, idUsuarioSesion, DraftTweet(tweetComentario.text!!, tweetComentario.images!!))
            val comentario = Comentario(
                comentarioCreado.id,
                comentarioCreado.text,
                comentarioCreado.images,
                Author(comentarioCreado.author.id, comentarioCreado.author.name, comentarioCreado.author.image),
                if(comentarioCreado.reply != null) { Reply(comentarioCreado.reply?.id, comentarioCreado.reply?.text, comentarioCreado.reply?.images, Author(comentarioCreado.reply?.author?.id, comentarioCreado.reply?.author?.name, comentarioCreado.reply?.author?.image)) } else { null },
                comentarioCreado.likes.map { like -> Like(like.id, like.name, like.image) },
                FormateadorFecha.formatearFecha(comentarioCreado.date)
            )
            contexto.status(200)
            contexto.json(comentario)
        } catch(e: NotFound) {
            contexto.status(404)
            contexto.json(Result("Not found tweet with id $idTweet"))
        } catch(e: BadRequestResponse) {
            throw BadRequestResponse("Possible body error")
        } catch(e: AtributosNoValidos) {
            throw BadRequestResponse("At least one attribute is invalid")
        }
    }

    private fun tweetComentado(id: String, text: String, images: MutableList<String>, reply: Tweet?, likes: List<Like>, date: String, author: Author, comments: List<Comentario>): TweetComentado {
        return if(reply == null){
            TweetNoReplicanteComentado(id, text, images, likes, date, author, comments)
        }
        else{
            TweetReplicanteComentado(id, text, images, Reply(reply.id, reply.text, reply.images, Author(reply.author.id, reply.author.name, reply.author.image)), likes, date, author, comments)
        }
    }



}