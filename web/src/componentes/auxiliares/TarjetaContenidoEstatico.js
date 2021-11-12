import React from 'react'
import CuerpoTarjetaContenido from './CuerpoTarjetaContenido.js'
import './estilos/TarjetaContenidoEstatico.css'
import TarjetaContenido from './TarjetaContenido'

const TarjetaContenidoEstatico = ({ className, children }) => {
  return (
    <TarjetaContenido className={`tarjeta-contenido-estatico ${className}`}>
      <CuerpoTarjetaContenido>
        <div className="row justify-content-md-center">
          { children }
        </div>
      </CuerpoTarjetaContenido>
    </TarjetaContenido>
  );
}

export default TarjetaContenidoEstatico