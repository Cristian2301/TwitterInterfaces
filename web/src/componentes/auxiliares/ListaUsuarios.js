import React from 'react'
import UsuarioBusqueda from './UsuarioBusqueda.js'

const ListaUsuarios = ({ usuarios }) => usuarios.map(usuario => <UsuarioBusqueda key={ usuario.id } usuario={ usuario } />)

export default ListaUsuarios
