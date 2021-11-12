import React from 'react'
import CuerpoTweet from './CuerpoTweet';
import TarjetaContenido from './TarjetaContenido';

const TweetSinIndicadores = ({ tweet, className, onClick, children }) => {
  return(
    <TarjetaContenido className={className} { ...(onClick ? { onClick } : {}) }>
      <CuerpoTweet { ...{ tweet } }>{ children }</CuerpoTweet>
    </TarjetaContenido>
  );
}

export default TweetSinIndicadores