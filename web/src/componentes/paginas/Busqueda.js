import React, { useEffect, useState } from 'react'
import Timeline from '../auxiliares/Timeline.js'
import ListaUsuarios from '../auxiliares/ListaUsuarios.js'
import { useParams } from 'react-router'
import PaginaLogueado from '../auxiliares/PaginaLogueado.js'
import AnimacionCargando from '../auxiliares/AnimacionCargando.js'
import { useSearch } from '../../hooks/api.js'

const Busqueda = (props) => {
  const { search } = useSearch();
  const { texto } = useParams();
  const [resultados, setResultados] = useState({ componentes: [], obtenido: false, hayResultados: false });
  
  useEffect(() => {
    search(texto, resultadosBusqueda => {
      const esHashTag = texto.slice(0, 3) === "%23"
      setResultados({ componentes: esHashTag ? <Timeline tweets={ resultadosBusqueda } /> : <ListaUsuarios usuarios={ resultadosBusqueda } />, obtenido:true, hayResultados: resultadosBusqueda.length !== 0 })
    })
      .catch(() => props.history.push('/error'));
  }, [texto, props.history]);

  return (
    <PaginaLogueado textoBuscador={ decodeURIComponent(texto) }>
      {<AnimacionCargando condicion={!resultados.obtenido} />}
      {resultados.obtenido && !resultados.hayResultados && <div className="row text-muted justify-content-center">No hay resultados</div>}
      {resultados.componentes}
    </PaginaLogueado>
  );
}

export default Busqueda
