package modelo

import org.uqbar.commons.model.annotations.Observable

@Observable
class ModeloPerfil(var id: String, var email: String, var nombre: String, var imagen: String)