package modelo

import org.unq.ui.model.DraftTweet
import org.unq.ui.model.TwitterSystem
import org.unq.ui.model.User
import org.uqbar.commons.model.annotations.Observable
import org.uqbar.commons.model.exceptions.UserException

@Observable
class ModeloABM (val sistema: TwitterSystem, usuario: User) {
    var modeloPerfil : ModeloPerfil = ModeloPerfil(usuario.id, usuario.email, usuario.name, usuario.image)
    var tweets : List<ModeloTweet> = listOf()
    var campoBusqueda : String = ""
        set(busqueda) {
            field = busqueda
            refrescarTweets()
            if(busqueda != "") {
                tweets = tweets.filter { it.texto.contains(busqueda) }
            }
        }
    var seleccionado : ModeloTweet? = null
    val tweetSeleccionado : ModeloTweet
        get(){
            return seleccionado ?: throw UserException("No hay ningún tweet seleccionado")
        }

    init {
        refrescarTweets()
    }

    private fun refrescarTweets() {
        tweets = sistema.searchByUserId(modeloPerfil.id).map { ModeloTweet(it.id, it.text, it.date, it.images) }
    }

    private fun refrescarUsuario() {
        val usuario = sistema.getUser(modeloPerfil.id)
        modeloPerfil = ModeloPerfil(usuario.id, usuario.email, usuario.name, usuario.image)
    }

    fun agregarTweet(tweet: ModeloBorradorTweet) {
        sistema.addTweet(modeloPerfil.id, DraftTweet(tweet.texto, listOf(tweet.imagen1, tweet.imagen2, tweet.imagen3, tweet.imagen4).filter{it != ""}.toMutableList()))
        refrescarTweets()
        campoBusqueda = ""
    }

    fun eliminarTweet(id: String) {
        sistema.deleteTweet(id)
        seleccionado = null
        refrescarTweets()
        campoBusqueda = ""
    }

    fun modificarTweet(tweet: ModeloBorradorTweet) {
        sistema.editTweet(tweet.id, DraftTweet(tweet.texto, listOf(tweet.imagen1, tweet.imagen2, tweet.imagen3, tweet.imagen4).filter{it != ""}.toMutableList()))
        refrescarTweets()
        campoBusqueda = ""
    }

    fun modificarPerfil(perfil: ModeloBorradorPerfil) {
        sistema.editProfile(perfil.id, perfil.nombre, sistema.getUser(modeloPerfil.id).password, perfil.imagen)
        refrescarUsuario()
    }
}
