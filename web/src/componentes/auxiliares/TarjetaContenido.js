import React from 'react'
import './estilos/TarjetaContenido.css'

const TarjetaContenido = ({ className, onClick, children }) => {
  return(
    <div className={`card tarjeta-contenido ${className}`}  { ...(onClick ? { onClick } : {}) }>
      { children }
    </div>
  );
}

export default TarjetaContenido