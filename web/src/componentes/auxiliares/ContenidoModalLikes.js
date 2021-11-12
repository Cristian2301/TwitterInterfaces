import React from 'react'
import UsuarioLink from './UsuarioLink';
import './estilos/ContenidoModalLikes.css'
import EncabezadoModalFade from './EncabezadoModalFade';

const ContenidoModalLikes = ({ idModal, likes }) => {
  return(
    <>
    <EncabezadoModalFade { ...{ idModal } } titulo="Me gusta" />
    <div className="modal-body contenido-modal-likes">
      <ul className="list-group list-group-flush">
        {likes.map(like => <li className="list-group-item" key={ `like-${idModal}-${like.id}` }><UsuarioLink usuario={ like } tamanio="chico" /></li>)}
      </ul>
    </div>
    </>
  );
}

export default ContenidoModalLikes