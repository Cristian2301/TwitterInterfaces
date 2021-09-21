package modelo

import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.Button
import org.uqbar.arena.widgets.Label
import org.uqbar.arena.widgets.Panel
import org.uqbar.arena.widgets.TextBox
import org.uqbar.arena.windows.SimpleWindow
import org.uqbar.arena.windows.WindowOwner

class VentanaABM(propietario: WindowOwner, modelo: ModeloABM) : SimpleWindow<ModeloABM>(propietario, modelo) {

    override fun createFormPanel(panelPrincipal: Panel) {
        title = "Twitter"
        setMinWidth(500)

        Label(panelPrincipal) with {
            bindTo("modeloPerfil.id").setModelToView { "Id:\t\t${it}" }
            align("left")
        }

        Label(panelPrincipal) with {
            bindTo("modeloPerfil.email").setModelToView { "Email:\t\t${it}" }
            align("left")
        }

        Label(panelPrincipal) with {
            bindTo("modeloPerfil.nombre").setModelToView { "Nombre:\t\t${it}" }
            align("left")
        }

        Label(panelPrincipal) with {
            bindTo("modeloPerfil.imagen").setModelToView { "Imagen:\t\t${it}" }
            align("left")
        }
        Button(panelPrincipal) with {
            caption = "Editar Perfil"
            onClick {
                val perfil = ModeloBorradorPerfil(modelObject.sistema, modelObject.modeloPerfil.id, modelObject.modeloPerfil.nombre, modelObject.modeloPerfil.imagen)
                val vista = VentanaEdicionPerfil(thisWindow, perfil)
                vista.onAccept {
                    modelObject.modificarPerfil(perfil)
                }
                vista.open()
            }
        }
        Label(panelPrincipal) with {
            text = "Buscar: "
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("campoBusqueda")
            width = 500
        }
        table<ModeloTweet>(panelPrincipal) {
            bindItemsTo("tweets")
            bindSelectionTo("seleccionado")
            visibleRows = 10
            setMinWidth(500)
            column {
                title = "ID"
                fixedSize = 30
                bindContentsTo("id")
            }
            column {
                title = "Texto"
                weight = 70
                fixedSize = 200
                bindContentsTo("texto")
            }
            column {
                title = "Fecha"
                weight = 80
                fixedSize = 100
                bindContentsTo("fecha")
            }
            column {
                title = "Imágenes"
                weight = 80
                fixedSize = 170
                bindContentsTo("imagenes").setTransformer<List<String>> { return@setTransformer (if(it.isEmpty()) {""} else {it.toString()}) }
            }
        }
    }

    override fun addActions(panelBotones: Panel) {
        Button(panelBotones) with {
            caption = "Agregar"
            width = 200
            onClick {
                val tweet = ModeloBorradorTweet(modelObject.modeloPerfil.id, "", "", "", "", "")
                val vista = VentanaEdicion(this@VentanaABM, tweet, "Agregar tweet")
                vista.onAccept {
                    modelObject.agregarTweet(tweet)
                }
                vista.open()
            }
        }
        Button(panelBotones) with {
            caption = "Eliminar"
            width = 200
            onClick {
                val vista = VentanaEliminar(this@VentanaABM, modelObject.tweetSeleccionado)
                vista.onAccept {
                    modelObject.eliminarTweet(modelObject.tweetSeleccionado.id)
                }
                vista.open()
            }
        }
        Button(panelBotones) with {
            caption = "Modificar"
            width = 200
            onClick {
                val tweet = ModeloBorradorTweet(modelObject.tweetSeleccionado.id, modelObject.tweetSeleccionado.texto, modelObject.tweetSeleccionado.imagen(0), modelObject.tweetSeleccionado.imagen(1), modelObject.tweetSeleccionado.imagen(2), modelObject.tweetSeleccionado.imagen(3))
                val vista = VentanaEdicion(this@VentanaABM, tweet, "Modificar tweet")
                vista.onAccept {
                    modelObject.modificarTweet(tweet)
                }
                vista.open()
            }
        }
    }
}
