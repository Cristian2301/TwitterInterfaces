import React from 'react'
import './estilos/AnimacionCargando.css'

const AnimacionCargando = ({ condicion }) => {
  return(
    // <div class="d-flex row justify-content-center">
    condicion && <>
      <div className="row justify-content-center">
        <div className="col-md-auto columna-contenido-animacion-cargando">
          <div className="spinner-grow text-secondary" role="status" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-auto columna-contenido-animacion-cargando">
          <div className="sr-only text-muted">Cargando...</div>
        </div>
      </div>
    </>
    // </div>
  );
}

export default AnimacionCargando