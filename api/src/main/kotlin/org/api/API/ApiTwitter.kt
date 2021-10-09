package org.api.API

import io.javalin.Javalin
import io.javalin.apibuilder.ApiBuilder.*
import org.api.*
import org.api.RolesTwitter
import org.unq.ui.bootstrap.getTwitterSystem
import org.unq.ui.model.TwitterSystem

class ApiTwitter {
    fun start(port: Int){
        val sistema = getTwitterSystem()
        val app = Javalin.create {
            it.defaultContentType = "application/json"
            it.accessManager(ControladorRoles(sistema))
            it.enableCorsForAllOrigins()
        }
        val contrUsuario = ControladorUsuario(sistema)
        val contrBusqueda = ControladorBusqueda(sistema)
        val contrTweet = ControladorTweet(sistema)
        app.routes {
            path("register") {
                post(contrUsuario::crearUsuario, setOf(RolesTwitter.TODOS))
            }
            path("search") {
                get(contrBusqueda::buscar, setOf(RolesTwitter.USUARIO))
            }
            path("login") {
                post(contrUsuario::ingresarUsuario, setOf(RolesTwitter.TODOS))
            }
            path("user") {
                get(contrUsuario::devolverUsuarioLogeado, setOf(RolesTwitter.USUARIO))
                path(":userId") {
                    get(contrUsuario::devolverUsuarioPorId, setOf(RolesTwitter.USUARIO))
                    path("follow") {
                        put(contrUsuario::seguir, setOf(RolesTwitter.USUARIO))
                    }
                }
            }
            path("tweet") {
                path(":tweetId") {
                    get(contrTweet::devolverTweet, setOf(RolesTwitter.USUARIO))
                    path("like") {
                        put(contrTweet::likear, setOf(RolesTwitter.USUARIO))
                    }
                    path("comment") {
                        post(contrTweet::comentar, setOf(RolesTwitter.USUARIO))
                    }

                }
            }
        }
        app.before{
            it.header("Access-Control-Expose-Headers", "*")
        }
        app.start(port)
    }
}