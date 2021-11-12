import React from 'react'
import './estilos/UsuarioLink.css'
import LinkSinEstilos from './LinkSinEstilos';

const UsuarioLink = ({ usuario, tamanio, children }) => {
  return(
    
     <div className="row usuario-link">
      <div className="col-md-auto columna-usuario-link">
        <LinkSinEstilos onClick={ (e) => e.stopPropagation() } to={`/usuario/${usuario.name}/${usuario.id}`}>
          <img src={ usuario.image } className={`img-thumbnail imagen-usuario-usuario-link imagen-usuario-usuario-link-${tamanio}`} alt={ usuario.name }/>
        </LinkSinEstilos>
      </div>
      <div className="col-md-auto contenido-usuario-link columna-usuario-link">
        <LinkSinEstilos onClick={ (e) => e.stopPropagation() } to={`/usuario/${usuario.name}/${usuario.id}`}>
          <b className={`card-title link-perfil nombre-usuario-link-${tamanio}`}>{ usuario.name }</b>
        </LinkSinEstilos>
        { children }
      </div>
     </div>
  );
}

export default UsuarioLink