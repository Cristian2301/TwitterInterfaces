import React from 'react'
import BotonAnchoTotal from './BotonAnchoTotal.js'
import { useHistory } from 'react-router';
import { useFollow } from '../../hooks/api';

const BotonSeguir = ({ usuario }) => {
  const { follow, followed, canFollow } = useFollow();
  const history = useHistory();

  const seguir = () => {
    follow(usuario)
      .catch(() => history.push('/error'));
  }
  
  const textoBotonSeguir = () => (followed(usuario.id) ? "Dejar de seguir" : "Seguir")
  
  const boton = () => (followed(usuario.id) ? "btn-primary" : "btn-outline-primary")

  return canFollow(usuario.id) && <BotonAnchoTotal className={`btn ${boton()}`} onClick={ seguir }>{ textoBotonSeguir() }</BotonAnchoTotal>
}

export default BotonSeguir
