import React from 'react'

const CuerpoTarjetaContenido = ({ className, children }) => {
  return(
    <div className="card-body cuerpo-tarjeta-contenido">
      <div className={`container ${className}`}>
        { children }
      </div>
    </div>
  );
}

export default CuerpoTarjetaContenido