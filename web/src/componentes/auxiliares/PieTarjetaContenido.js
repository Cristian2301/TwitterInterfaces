import React from 'react'

const PieTarjetaContenido = ({ className, children }) => {
  return(
    <div className={`card-footer ${className}`}>
      <div className="container">
        { children }
      </div>
    </div>
  );
}

export default PieTarjetaContenido