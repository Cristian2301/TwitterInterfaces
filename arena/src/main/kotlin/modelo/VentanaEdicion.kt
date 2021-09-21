package modelo

import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.Button
import org.uqbar.arena.widgets.Label
import org.uqbar.arena.widgets.Panel
import org.uqbar.arena.widgets.TextBox
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner

class VentanaEdicion (propietario: WindowOwner, modelo: ModeloBorradorTweet, val titulo: String): Dialog<ModeloBorradorTweet>(propietario, modelo) {
    override fun createFormPanel(panelPrincipal: Panel) {
        title = titulo
        setMinWidth(400)
        Label(panelPrincipal) with {
            text = "Texto"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("texto")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Primer imagen"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("imagen1")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Segunda imagen"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("imagen2")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Tercer imagen"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("imagen3")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Cuarta imagen"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("imagen4")
            width = 380
        }
    }

    override fun addActions(panelBotones: Panel) {
        Button(panelBotones) with {
            text = "Aceptar"
            width = 200
            setAsDefault()
            onClick {
                modelObject.validarTweet()
                accept()
            }
        }
        Button(panelBotones) with {
            text = "Cancelar"
            width = 200
            onClick {
                cancel()
            }
        }
    }
}