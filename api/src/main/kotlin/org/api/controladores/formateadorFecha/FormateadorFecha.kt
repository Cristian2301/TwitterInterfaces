package org.api.controladores.formateadorFecha

import java.time.LocalDateTime

object FormateadorFecha {
    fun formatearFecha(fecha: LocalDateTime): String {
        return "${formatearNumeroFecha(fecha.dayOfMonth)}/${formatearNumeroFecha(fecha.monthValue)}/${fecha.year} - ${formatearNumeroFecha(fecha.hour)}:${formatearNumeroFecha(fecha.minute)}"
    }

    private fun formatearNumeroFecha(numero: Int): String {
        return if(numero < 10) {
            "0$numero"
        } else {
            "$numero"
        }
    }
}