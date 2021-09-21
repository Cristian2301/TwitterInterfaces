package modelo

import org.uqbar.arena.kotlin.extensions.*
import org.uqbar.arena.widgets.*
import org.uqbar.arena.windows.Dialog
import org.uqbar.arena.windows.WindowOwner

class VentanaEdicionPerfil(propietario: WindowOwner, modelo: ModeloBorradorPerfil) : Dialog<ModeloBorradorPerfil>(propietario, modelo) {

    override fun createFormPanel(panelPrincipal: Panel) {
        title = "Editar Perfil"
        setMinWidth(400)
        Label(panelPrincipal) with {
            text = "Nombre"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("nombre")
            width = 380
        }
        Label(panelPrincipal) with {
            text = "Contraseña"
            width = 380
            align("left")
        }
        //PasswordField(panelPrincipal) with {
        //    bindTo("contrasenia")
        //    width = 380
        //}
        Button(panelPrincipal) with {
            text = "Cambiar Contraseña"
            width = 200
            onClick {
                val contrasenia = ModeloBorradorContrasenia(modelObject.sistema, modelObject.id,"", "", "")
                val vista = VentanaEdicionContrasenia(this@VentanaEdicionPerfil, contrasenia)
                vista.onAccept {
                    modelObject.editarContrasenia(contrasenia)
                }
                vista.open()
            }
        }
        Label(panelPrincipal) with {
            text = "Imagen"
            width = 380
            align("left")
        }
        TextBox(panelPrincipal) with {
            bindTo("imagen")
            width = 380
        }
    }

    override fun addActions(panelBotones: Panel) {
        Button(panelBotones) with {
            text = "Aceptar"
            width = 200
            setAsDefault()
            onClick {
                modelObject.validarPerfil()
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