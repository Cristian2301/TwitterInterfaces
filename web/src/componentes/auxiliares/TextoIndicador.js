import React from 'react'
import CursorLink from './CursorLink';
import './estilos/TextoIndicador.css'

const TextoIndicador = ({ texto }) => {
  return(
    <div className="col-md-auto texto-indicador">
      <CursorLink><div className="area-pulsador-texto-indicador">{ texto }</div></CursorLink>
    </div>
  );
}

export default TextoIndicador