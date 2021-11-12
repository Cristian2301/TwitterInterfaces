import React from 'react'
import './estilos/Tweet.css'
import IndicadorComentarios from './IndicadorComentarios.js'
import IndicadorLikes from './IndicadorLikes.js'
import CuerpoTweet from './CuerpoTweet.js'
import TarjetaContenido from './TarjetaContenido.js'
import PieTarjetaContenido from './PieTarjetaContenido'
import Reply from './Reply.js'

const Tweet = ({ tweet }) => {
  return(
    <TarjetaContenido className="tweet">
      <CuerpoTweet tweet={ tweet }>
        { tweet.reply && <Reply reply={ tweet.reply } /> }
        {/* { tweet.comment ? <Comment comment={ tweet.comment } /> : <></> } */}
      </CuerpoTweet>
      <PieTarjetaContenido>
        <div className="row">
          <IndicadorLikes likes={ tweet.likes } idTweet={ tweet.id } />
          <IndicadorComentarios tweet={ tweet } comentarios={ tweet.comments } idTweet={ tweet.id } />
        </div>
      </PieTarjetaContenido>
    </TarjetaContenido>
  );
}

export default Tweet
