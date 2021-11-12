import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Tweet from '../auxiliares/Tweet';
import PaginaLogueado from '../auxiliares/PaginaLogueado';
import { useTweet } from '../../hooks/api';

const TweetUsuario = (props) => {
  const { getTweet } = useTweet();
  const { nombre, id, idTweet } = useParams();
  const [tweet, setTweet] = useState();

  useEffect(() => {
    getTweet(idTweet, tweetObtenido => {
      if(nombre === tweetObtenido.author.name && id === tweetObtenido.author.id) {
        setTweet(tweetObtenido);
      } 
      else {
        props.history.push('/noencontrado')
      }
    })
    .catch(error => props.history.push(error.response.status === 404 ? '/noencontrado' : '/error'));
  }, [id, idTweet, nombre, props.history]);
  
  return (
    <PaginaLogueado textoBuscador="">
      {tweet && <Tweet { ...{ tweet } } />}
    </PaginaLogueado>
  );
}

export default TweetUsuario