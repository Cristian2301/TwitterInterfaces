package modelo

import org.uqbar.arena.kotlin.extensions.text
import org.uqbar.arena.kotlin.extensions.width
import org.uqbar.arena.kotlin.extensions.with
import org.uqbar.arena.widgets.Button
import org.uqbar.arena.widgets.Label
import org.uqbar.arena.widgets.Panel
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner

class VentanaEliminar(propietario: WindowOwner, modelo: ModeloTweet): Dialog<ModeloTweet>(propietario, modelo) {
    override fun createFormPanel(panelPrincipal: Panel) {
        title = "Eliminar tweet"
        Label(panelPrincipal) with {
            text = "¿Esta seguro que desea eliminar el tweet de id ${modelObject.id}?"
        }
    }

    override fun addActions(panelBotones: Panel) {
        Button(panelBotones) with {
            text = "Aceptar"
            width = 150
            setAsDefault()
            onClick {
                accept()
            }
        }
        Button(panelBotones) with {
            text = "Cancelar"
            width = 150
            onClick {
                cancel()
            }
        }
    }
}