package modelo

import org.unq.ui.bootstrap.getTwitterSystem
import org.uqbar.arena.windows.Window

class AplicacionTwitter : org.uqbar.arena.Application() {
    override fun createMainWindow(): Window<*> {
        return VentanaIngreso(this, ModeloIngreso("", "", getTwitterSystem()))
    }
}
