import React, { useState } from 'react'
import './estilos/Buscador.css'
import { useHistory } from 'react-router'


const Buscador = ({ texto }) => {
  const history = useHistory()
  const [textoBusqueda, setTextoBusqueda] = useState(texto)
  
  const buscar = (evento) => {
    evento.preventDefault();
    textoBusqueda !== "" && history.push(`/busqueda/${encodeURIComponent(textoBusqueda)}`);
  }

  return (
    <div className="col justify-content-center col-texto">
      <form onSubmit={ buscar }>
        <div className="row buscador">
          <div className="col columna-buscador columna-input">
            <input className="input-buscador form-control control-buscador" type="text" id="inputBusqueda" placeholder="Buscar..." onChange={ e => setTextoBusqueda(e.target.value) } value={ textoBusqueda } />
          </div>
          <div className="col-md-auto columna-buscador columna-boton">
            <button type="submit" className="btn btn-primary boton-buscador control-buscador">Buscar</button>
          </div>
        </div>
      </form>
    </div>
  )
}


export default Buscador
