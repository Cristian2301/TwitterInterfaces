import React from 'react'
import './estilos/IndicadorTweet.css'

const IndicadorTweet = ({ children }) => {
  return(
      <div className="row-md-auto indicador-tweet">
        { children }
      </div>
  );
}

export default IndicadorTweet