import React from 'react'
import CursorLink from './CursorLink'
import './estilos/ImagenIndicador.css'

const ImagenIndicador = ({ imagen, onClick, className }) => {
  return(
    <div className={`col-md-auto imagen-indicador ${className}`}>
      <CursorLink><i className={ `bi bi-${imagen}` } {...(onClick ? { onClick: onClick }: {})} /></CursorLink>
    </div>
  );
    /* data-bs-toggle="modal" data-bs-target={ dataBsTarget }  {...{onMouseDown}} */
}

export default ImagenIndicador
