import React from 'react'
import { Link } from 'react-router-dom'
import './estilos/LinkSinEstilos.css'

const LinkSinEstilos = ({ to, className, onClick, children }) => <Link className={`link-sin-estilos ${className}`} { ...{ to } } { ...(onClick ? { onClick } : {} ) } >{ children }</Link>

export default LinkSinEstilos