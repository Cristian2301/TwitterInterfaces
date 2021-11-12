import React from 'react'
import './estilos/BotonAnchoTotal.css'

const BotonAnchoTotal = ({ className, children, ...rest }) => <button className={`${className ? className : ''} boton-ancho-total`} { ...rest }>{ children }</button>

export default BotonAnchoTotal
