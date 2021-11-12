import React, { useState } from 'react'
import IndicadorTweet from './IndicadorTweet.js'
import LanzadorModal from './LanzadorModal.js'
import ImagenIndicador from './ImagenIndicador.js'
import TextoIndicador from './TextoIndicador.js'
import ContenidoModalComentar from './ContenidoModalComentar.js'
import ContenidoModalComentarios from './ContenidoModalComentarios.js'
import './estilos/IndicadorComentarios.css'
import { useHistory } from 'react-router'
import { useComment } from '../../hooks/api.js'

const IndicadorComentarios = ({ tweet, comentarios, idTweet }) => { 
  const { comment } = useComment();
  const history = useHistory();
  const [listaComentarios, setListaComentarios] = useState(comentarios ? comentarios : [])

  const modificarListaComentarios = (comentario) => setListaComentarios(prevState => [...prevState, comentario])

  const comentar = (texto, imagenes) => {
    comment(idTweet, { text: texto, images: imagenes }, modificarListaComentarios)
      .catch(() => history.push('/error'));
  }
  
  return(
    <IndicadorTweet>
      <LanzadorModal idModal={`comentar-${ idTweet }`} classNameModal="modal-comentar-indicador-comentarios" componenteContenido={ ContenidoModalComentar } propsComponenteContenido={ { idModal: `comentar-${ idTweet }`, comentar: comentar } }>
        <ImagenIndicador imagen="chat" />
      </LanzadorModal>
      <LanzadorModal idModal={`comentarios-${ idTweet }`} componenteContenido={ ContenidoModalComentarios } propsComponenteContenido={ { idModal: `comentarios-${ idTweet }`, tweet: { ...tweet, comments: listaComentarios} } }>
        <TextoIndicador texto={ listaComentarios.length } />
      </LanzadorModal>
    </IndicadorTweet> 
  );
}


    
export default IndicadorComentarios