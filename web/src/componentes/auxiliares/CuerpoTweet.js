import React from 'react'
import CuadriculaImagenes from './CuadriculaImagenes.js'
import './estilos/CuerpoTweet.css'
import UsuarioLink from './UsuarioLink.js'
import CuerpoTarjetaContenido from './CuerpoTarjetaContenido.js'


const CuerpoTweet = ({ tweet, children }) => {
  return(
    <CuerpoTarjetaContenido className="cuerpo-tweet">
      <UsuarioLink usuario={ tweet.author } tamanio="mediano">
        <p className="card-subtitle mb-2 text-muted">{ tweet.date }</p>
      </UsuarioLink>
      <p className="card-text">{ tweet.text }</p>
      <CuadriculaImagenes imagenes={ tweet.images } idTweet={ tweet.id } /> 
      { children }
    </CuerpoTarjetaContenido>
  );
}

export default CuerpoTweet
