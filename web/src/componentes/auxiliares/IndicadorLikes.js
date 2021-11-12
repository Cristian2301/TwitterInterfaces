import React, { useState } from 'react'
import IndicadorTweet from './IndicadorTweet.js'
import ImagenIndicador from './ImagenIndicador.js'
import TextoIndicador from './TextoIndicador.js'
import LanzadorModal from './LanzadorModal.js'
import ContenidoModalLikes from './ContenidoModalLikes.js'
import { useHistory } from 'react-router'
import { useLike } from '../../hooks/api.js'

const IndicadorLikes = ({ likes, idTweet }) => {
  const { like, liked, addLike, removeLike } = useLike();
  const history = useHistory();
  const [listaLikes, setListaLikes] = useState(likes);

  const alternarLike = () => setListaLikes(liked(listaLikes) ? removeLike(listaLikes) : addLike(listaLikes))
  
  const likear = (evento) => {
    like(idTweet, alternarLike)
      .catch(() => history.push('/error'));
  }

  const imagen = () => (liked(listaLikes) ? "heart-fill" : "heart")

  const id = () => `likes-${ idTweet }`

  return (
    <IndicadorTweet>
      <ImagenIndicador imagen={ imagen() } onClick={ likear } />
      <LanzadorModal idModal={id()} componenteContenido={ ContenidoModalLikes } propsComponenteContenido={ { idModal: id(), likes: listaLikes } }>
        <TextoIndicador texto={ listaLikes.length } />
      </LanzadorModal>
    </IndicadorTweet>
  );
}

export default IndicadorLikes
