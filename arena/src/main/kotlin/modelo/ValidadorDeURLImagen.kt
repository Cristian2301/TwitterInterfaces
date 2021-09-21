package modelo

object ValidadorDeURLImagen {
    fun esImagenValida(imagen: String) : Boolean {
        return imagen.isEmpty() || listOf("http://", "https://").any { urlComienzaCon(it, imagen) && esURLImagenSinHttpValida(imagen.substring(it.length)) }
    }

    private fun esURLImagenSinHttpValida(URLImagenSinHttp: String): Boolean {
        val subrutas = URLImagenSinHttp.split("/")
        return (subrutas.size >= 2) &&
                (!subrutas.contains("")) &&
                listOf("jpg", "jpeg", "png", "tif", "bmp", "gif").any {
                    subrutas.last().split("?").first().split(".").last() == it
                }
    }

    private fun urlComienzaCon(comienzoURL: String, urlImagen: String): Boolean {
        val longitudMinimaDominio = 1
        val longitudMinimaSeparadores = 1
        val longitudMinimaNombreImagen = 1
        val longitudMinimaExtensionImagen = 4
        val longitudMinimaURL = longitudMinimaDominio +
                longitudMinimaSeparadores +
                longitudMinimaNombreImagen +
                longitudMinimaExtensionImagen +
                comienzoURL.length
        return urlImagen.length >= longitudMinimaURL &&
                urlImagen.substring(0, comienzoURL.length) == comienzoURL
    }
}