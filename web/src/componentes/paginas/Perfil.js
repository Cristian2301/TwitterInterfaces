import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Timeline from '../auxiliares/Timeline.js'
import UsuarioLink from '../auxiliares/UsuarioLink.js'
import BotonSeguir from '../auxiliares/BotonSeguir.js'
import TarjetaContenidoEstatico from '../auxiliares/TarjetaContenidoEstatico.js'
import PaginaLogueado from '../auxiliares/PaginaLogueado.js'
import AnimacionCargando from '../auxiliares/AnimacionCargando.js'
import { useUser } from '../../hooks/api.js'

const Perfil = (props) => {
  const { getUser } = useUser();
  const { nombre, id } = useParams();
  const [usuario, setUsuario] = useState({ usuario: {id:"", image:"", name:"", followers:[], tweets:[]}, obtenido: false });

  useEffect(() => {
    getUser(id, usuarioObtenido => {
      if(nombre === usuarioObtenido.name) {
        setUsuario({ usuario: usuarioObtenido, obtenido: true });
      }
      else {
        props.history.push('/noencontrado')
      }
    })
    .catch(error => props.history.push(error.response.status === 404 ? '/noencontrado' : '/error'));
  }, [id, nombre, props.history]);

  return (
    <PaginaLogueado textoBuscador="">
      <TarjetaContenidoEstatico>
        <div className="col">
          <UsuarioLink usuario={ usuario.usuario } tamanio="grande">
            <div className="text-muted">{ usuario.usuario.tweets.length } tweets</div>
            <div className="text-muted">{ usuario.usuario.followers.length } seguidos</div>
          </UsuarioLink>
        </div>
        <div className="col col-boton">
          {usuario.obtenido && <BotonSeguir usuario={ usuario.usuario }/>}
        </div>
      </TarjetaContenidoEstatico>
      {<AnimacionCargando condicion={!usuario.obtenido} />}
      <Timeline tweets={ usuario.usuario.tweets } />
    </PaginaLogueado>
  );
}

export default Perfil
