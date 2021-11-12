import React, { useEffect, useState } from 'react'
import Timeline from '../auxiliares/Timeline.js'
import PaginaLogueado from '../auxiliares/PaginaLogueado.js'
import AnimacionCargando from '../auxiliares/AnimacionCargando.js'
import { useAuthenticatedUser } from '../../hooks/api.js'

const Inicio = (props) => {
  const { getAuthenticatedUser } = useAuthenticatedUser();
  const [usuario, setUsuario] = useState();

  useEffect(() => {
    getAuthenticatedUser(setUsuario)
      .catch(() => props.history.push('/error'));
  }, [props.history])
  
  return (
    <PaginaLogueado textoBuscador="">
      {<AnimacionCargando condicion={!usuario} />}
      {usuario && <Timeline tweets={ usuario.timeline } />}
    </PaginaLogueado>
  ); 
}

export default Inicio
