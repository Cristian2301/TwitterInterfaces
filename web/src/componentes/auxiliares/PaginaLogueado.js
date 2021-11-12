import React from 'react'
import Cabecera from './Cabecera'
import './estilos/PaginaLogueado.css'

const PaginaLogueado = ({ textoBuscador, children }) => {
  return(
    <>
      <Cabecera {...{ textoBuscador }} />
      <div className="row fila-pagina-logueado">
        <div className="col columna-lateral-pagina-logueado" />
        <div className="col-md-auto columna-central-pagina-logueado">
          {children}
        </div>
        <div className="col columna-lateral-pagina-logueado" />
      </div>
    </>
  );
}

export default PaginaLogueado