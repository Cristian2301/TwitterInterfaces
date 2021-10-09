package org.api

import com.auth0.jwt.JWT
import com.auth0.jwt.JWTCreator
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import javalinjwt.JWTGenerator
import javalinjwt.JWTProvider
import org.unq.ui.model.User

class TokenInvalido: Exception("Token inválido")

class ControladorToken {
    private val algoritmo: Algorithm = Algorithm.HMAC256("very_secret")
    private val generador: JWTGenerator<User> =
        JWTGenerator<User> { usuario: User, alg: Algorithm? ->
            val token: JWTCreator.Builder = JWT.create()
                .withClaim("id", usuario.id)
            token.sign(alg)
        }
    private val verificador: JWTVerifier = JWT.require(algoritmo).build()
    private val proveedor = JWTProvider(algoritmo, generador, verificador)

    fun generar(usuario: User): String = proveedor.generateToken(usuario)

    fun validar(token: String): String {
        val jwt = proveedor.validateToken(token)
        if (jwt.isPresent && jwt.get().claims.containsKey("id")) {
            return jwt.get().getClaim("id").asString()
        } else {
            throw TokenInvalido()
        }
    }
}