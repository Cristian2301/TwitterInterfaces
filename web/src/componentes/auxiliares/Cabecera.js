import React, { useContext } from 'react'
import { SessionContext } from '../sesion/Sesion';
import Buscador from './Buscador';
import TarjetaContenidoEstatico from './TarjetaContenidoEstatico';
import UsuarioLink from './UsuarioLink';
import './estilos/Cabecera.css'
import BotonInicio from './BotonInicio';
import BotonDeslogueo from './BotonDeslogueo';

const Cabecera = ({ textoBuscador }) => { 
  const { state: { user } } = useContext(SessionContext);
  return (
    <TarjetaContenidoEstatico className="cabecera">
      <div className="col columna-lateral-cabecera">
        <div className="row fila-cabecera">
          <div className="col-md-auto"><BotonInicio /></div>
          <div className="col-md-auto"><UsuarioLink usuario={ user } tamanio="mediano" /></div>
          <div className="col columna-boton-deslogueo-celular">
            <div className="row justify-content-end">
              <BotonDeslogueo />
            </div>
          </div>
        </div>
      </div>
      <Buscador texto={ textoBuscador } />
      <div className="col columna-lateral-cabecera columna-boton-deslogueo">
        <div className="row justify-content-end">
          <BotonDeslogueo />
        </div>
      </div>
    </TarjetaContenidoEstatico>
  );
}

export default Cabecera
