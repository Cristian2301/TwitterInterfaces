package modelo

import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner

class VentanaEdicionContrasenia(propietario: WindowOwner, modelo: ModeloBorradorContrasenia) : Dialog<ModeloBorradorContrasenia>(propietario, modelo) {
    override fun createFormPanel(panelPrincipal: Panel?) {
        title = "Cambiar contraseña"
        setMinWidth(400)
        Label(panelPrincipal) with {
            text = "Contraseña"
            width = 380
            align("left")
        }
        PasswordField(panelPrincipal) with {
            bindTo("contrasenia")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Contraseña nueva"
            width = 380
            align("left")
        }
        PasswordField(panelPrincipal) with {
            bindTo("contraseniaNueva")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Contraseña nueva repetida"
            width = 380
            align("left")
        }
        PasswordField(panelPrincipal) with {
            bindTo("contraseniaNuevaConfirmacion")
            width = 380
        }
    }

    override fun addActions(panelBotones: Panel) {
        Button(panelBotones) with {
            text = "Aceptar"
            width = 200
            setAsDefault()
            onClick {
                modelObject.validarContrasenia()
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