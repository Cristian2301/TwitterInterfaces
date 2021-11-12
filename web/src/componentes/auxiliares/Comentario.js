import React from 'react'
import TweetSinIndicadores from './TweetSinIndicadores.js'
import './estilos/Comentario.css'
import Reply from './Reply.js';
import { useHistory } from 'react-router';
import CursorLink from './CursorLink.js';

const Comentario = ({ comentario }) => {
  const history = useHistory()

  const verComentario = () =>  history.push(`/usuario/${comentario.author.name}/${comentario.author.id}/tweets/${comentario.id}`)

  return(
    <CursorLink>
      <TweetSinIndicadores tweet={ comentario } onClick={ verComentario } className="comentario">
        { comentario.reply && <Reply reply={ comentario.reply } /> }
      </TweetSinIndicadores>
    </CursorLink>
  );
}

export default Comentario