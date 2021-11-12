import React from 'react'
import BotonSeguir from './BotonSeguir'
import CuerpoTarjetaContenido from './CuerpoTarjetaContenido'
import TarjetaContenido from './TarjetaContenido.js'
import UsuarioLink from './UsuarioLink'

const UsuarioBusqueda = ({ usuario }) => {
  return(
    <TarjetaContenido>
      <CuerpoTarjetaContenido>
        <div className="row">
          <div className="col">
            <UsuarioLink { ...{ usuario } } tamanio="grande" />
          </div>
          <div className="col">
            <BotonSeguir usuario={ usuario }/>
          </div>
        </div>
      </CuerpoTarjetaContenido>
    </TarjetaContenido>
  );
}

export default UsuarioBusqueda