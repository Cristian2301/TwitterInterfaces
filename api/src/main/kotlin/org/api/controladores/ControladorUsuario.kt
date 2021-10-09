package org.api

import io.javalin.http.BadRequestResponse
import io.javalin.http.Context
import org.api.controladores.formateadorFecha.FormateadorFecha
import org.api.controladores.validador.Validador.validarAtributosString
import org.api.controladores.validador.Validador.validarImagenUsuario
import org.unq.ui.model.*
import java.time.LocalDateTime

//data class UsuarioSesion(val id: String, val name: String?, val image: String?)

interface Tweet
interface UsuarioGet


data class Usuario(val name: String?, val email: String?, val password: String?, val image: String?)
data class UsuarioIngreso(val email: String?, val password: String?)

//Get user body respuesta
data class UsuarioLogeadoGet(val id: String?, val name: String?, val image: String?, val followers: List<Any>?, val timeline: List<Tweet>?): UsuarioGet
data class UsuarioNoLogeadoGet(val id:String?, val name: String?, val image: String?, val followers: List<Any>?, val tweets: List<Tweet>?): UsuarioGet
data class Follower(val id: String?, val name: String?, val image: String?)
data class TweetReplicante(val id: String?, val text: String?, val images: List<String>, val reply: Reply?, val likes: List<Like>? = emptyList(), val date: String?, val author: Author, val comments: List<Comentario>? = emptyList()): Tweet
data class TweetNoReplicante(val id: String?, val text: String?, val images: List<String>, val likes: List<Like>? = emptyList(), val date: String?, val author: Author, val comments: List<Comentario>? = emptyList()): Tweet
data class Reply(val id: String?, val text: String?, val images: List<String>?, val author: Author)
data class Author(val id: String?, val name: String?, val image: String?)
data class Like(val id: String, val name: String?, val image: String?)

data class Result(val result: String)
data class ErrorResult(val result: String, val message: String)

class ControladorUsuario(private val sistema: TwitterSystem) {
    private val tokenController = ControladorToken()
    fun crearUsuario(contexto: Context) {
        try {
            val cuerpoUsuario = contexto.body<Usuario>()
            validarAtributosString(cuerpoUsuario.name, cuerpoUsuario.email, cuerpoUsuario.password)
            validarImagenUsuario(cuerpoUsuario.image)
            val usuarioNuevo = sistema.register(
                cuerpoUsuario.name!!,
                cuerpoUsuario.email!!,
                cuerpoUsuario.password!!,
                cuerpoUsuario.image!!
            )
            contexto.status(201)
            contexto.header("Authorization", tokenController.generar(usuarioNuevo))
            contexto.json(Result("ok"))
        } catch(e: UsedEmail) {
            contexto.status(409)
            contexto.json(ErrorResult("error", "The user already exist"))
        } catch(e: AtributosNoValidos) {
            contexto.status(400)
            contexto.json(ErrorResult("error", "At least one attribute is missing or empty"))
        } catch (e: BadRequestResponse) {
            throw BadRequestResponse("Possible body error")
        }
    }

    fun ingresarUsuario(contexto: Context) {
        try {
            val cuerpoUsuario = contexto.body<UsuarioIngreso>()
            validarAtributosString(cuerpoUsuario.email, cuerpoUsuario.password)
            val usuarioLogueado = sistema.login(cuerpoUsuario.email!!, cuerpoUsuario.password!!)
            contexto.status(200)
            contexto.header("Authorization", tokenController.generar(usuarioLogueado))
            contexto.json(Result("ok"))
        } catch(e: NotFound) {
            contexto.status(404)
            contexto.json(ErrorResult("error", "User not found or invalid password"))
        } catch(e: AtributosNoValidos) {
            contexto.status(400)
            contexto.json(ErrorResult("error", "At least one attribute is missing or empty"))
        } catch(e: BadRequestResponse) {
            throw BadRequestResponse("Possible body error")
        }
    }

    fun devolverUsuarioLogeado(contexto: Context) {
        val idUsuarioSesion: String = contexto.attribute("id")!!
        devolverUsuario(contexto, idUsuarioSesion, true)
    }

    fun devolverUsuarioPorId(contexto: Context) {
        val idUsuario = contexto.pathParam("userId")
        if(idUsuario.isEmpty()) {
            contexto.status(400)
            contexto.json(ErrorResult("error", "Missing user id"))
        } else {
            devolverUsuario(contexto, idUsuario, false)
        }
    }

    fun seguir(contexto: Context) {
        val idUsuarioSesion: String = contexto.attribute("id")!!
        val idUsuarioASeguir = contexto.pathParam("userId")
        try {
            sistema.updateFollower(idUsuarioSesion, idUsuarioASeguir)
            contexto.status(200)
            contexto.json(Result("ok"))
        } catch(e: NotFound) {
            contexto.status(404)
            contexto.json(Result("Not found user with id $idUsuarioASeguir"))
        }
    }

    private fun devolverUsuario(contexto: Context, idUsuario: String, logeado: Boolean) {
        try {
            val usuario = sistema.getUser(idUsuario)
            contexto.status(200)
            contexto.json(
                usuarioGet(
                    usuario.id,
                    usuario.name,
                    usuario.image,
                    usuario.followers.map { Follower(it.id, it.name, it.image) },
                    if(logeado) { sistema.timeline(idUsuario) } else { usuario.tweets }
                        .map {
                            tweet(
                                it.id,
                                it.text,
                                it.images,
                                it.reply,
                                it.likes.map { like -> Like(like.id, like.name, like.image) },
                                FormateadorFecha.formatearFecha(it.date),
                                Author(it.author.id, it.author.name, it.author.image),
                                it.comments.map { comentario ->
                                    Comentario(
                                        comentario.id,
                                        comentario.text,
                                        comentario.images,
                                        Author(comentario.author.id, comentario.author.name,comentario.author.image),
                                        if(comentario.reply != null) { Reply(comentario.reply?.id,comentario.reply?.text,comentario.reply?.images, Author(comentario.reply?.author?.id, comentario.reply?.author?.name, comentario.reply?.author?.image)) } else { null },
                                        comentario.likes.map { like -> Like(like.id, like.name, like.image) },
                                        FormateadorFecha.formatearFecha(comentario.date)
                                    )
                                }
                            )},
                    logeado
                )
            )
        } catch(e: NotFound) {
            contexto.status(404)
            contexto.json(Result("Not found user with id $idUsuario"))
        }
    }

    private fun usuarioGet(
        id: String,
        name: String,
        image: String,
        followers: List<Follower>,
        tweets: List<Tweet>,
        logeado: Boolean
    ): UsuarioGet {
        return if(logeado){
            UsuarioLogeadoGet(id, name, image, followers, tweets)
        } else {
            UsuarioNoLogeadoGet(id, name, image, followers, tweets)
        }
    }

    private fun tweet(
        id: String,
        text: String,
        images: MutableList<String>,
        reply: org.unq.ui.model.Tweet?,
        likes: List<Like>,
        date: String,
        author: Author,
        comentarios: List<Comentario>
    ): Tweet {
        return if(reply == null){
            TweetNoReplicante(id, text, images, likes, date, author, comentarios)
        } else {
            TweetReplicante(id, text, images, Reply(reply.id, reply.text, reply.images, Author(reply.author.id, reply.author.name, reply.author.image)), likes, date, author, comentarios)
        }
    }
}
