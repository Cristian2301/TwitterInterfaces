package org.api

import io.javalin.core.security.AccessManager
import io.javalin.core.security.Role
import io.javalin.http.Context
import io.javalin.http.Handler
import io.javalin.http.UnauthorizedResponse 
import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.*

internal enum class RolesTwitter : Role {
    TODOS, USUARIO
}

class ControladorRoles(private val sistema: TwitterSystem) : AccessManager {
    private val tokenController = ControladorToken()

    override fun manage(handler: Handler, contexto: Context, roles: MutableSet<Role>) {
        val token = contexto.header("Authorization")
        when {
            roles.contains(RolesTwitter.TODOS) -> handler.handle(contexto)
            token == null -> throw UnauthorizedResponse()
            roles.contains(RolesTwitter.USUARIO) -> {
                try {
                    val id = tokenController.validar(token)
                    sistema.getUser(id)
                    contexto.attribute("id", id)
                    handler.handle(contexto)
                } catch(e: TokenInvalido) {
                    throw UnauthorizedResponse()
                } catch(e: NotFound) {
                    throw UnauthorizedResponse()
                }
            }
        }
    }
}