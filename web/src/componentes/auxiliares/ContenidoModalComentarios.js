import React from 'react'
import Comentario from './Comentario';
import EncabezadoModalFade from './EncabezadoModalFade';
import TweetSinIndicadores from './TweetSinIndicadores';
import './estilos/ContenidoModalComentarios.css'

const ContenidoModalComentarios = ({ idModal, tweet }) => {  
  return(
    <>
      <EncabezadoModalFade { ...{ idModal } } titulo="Comentarios" />
      <div className="modal-body">
        <TweetSinIndicadores { ...{ tweet } } />
        <div className="row">
          <div className="col-md-auto margen-contenido-modal-comentarios" />
          <div className="col">
            {tweet.comments.map(comentario => <Comentario key={`comentario-${tweet.id}-${comentario.id}`} { ...{ comentario } } />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContenidoModalComentarios