package modelo

import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.SimpleWindow
import org.uqbar.arena.windows.WindowOwner

class VentanaIngreso(propietario: WindowOwner, modelo: ModeloIngreso) : SimpleWindow<ModeloIngreso>(propietario, modelo) {
    override fun addActions(panelPrincipal: Panel?) {
        Button(panelPrincipal) with {
            caption = "Ingresar"
            width = 400
            setAsDefault()
            onClick {
                modelObject.validarEmail()
                val usuario = modelObject.validarUsuario()
                thisWindow.close()
                VentanaABM(thisWindow, modelObject.sesionUsuario(usuario)).open()
            }
        }
    }

    override fun createFormPanel(panelPrincipal: Panel?) {
        title = "Login de usuario"
        Label(panelPrincipal) with {
            text = "Email:"
            width = 400
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("email")
        }
        Label(panelPrincipal) with {
            text = "Contraseña:"
            width = 400
            align("left")
        }
        PasswordField(panelPrincipal) with {
            bindTo("contrasenia")
        }
    }
}
