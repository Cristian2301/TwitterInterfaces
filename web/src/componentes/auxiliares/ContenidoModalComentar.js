import React, { useState } from 'react'
import OcultadorModal from './OcultadorModal';
import BotonAnchoTotal from './BotonAnchoTotal.js'
import Toast from './Toast.js'
import EncabezadoModalFade from './EncabezadoModalFade';

const ContenidoModalComentar = ({ idModal, comentar }) => {
  const [texto, setTexto] = useState("");
  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [imagen3, setImagen3] = useState("");
  const [imagen4, setImagen4] = useState("");
  const [mostrarError, setMostrarError] = useState(false);

  const puedeComentar = () => !!texto

  const hacerComentario = () => {
    if(!puedeComentar()){
      setMostrarError(true);
    } else {
      comentar(texto, [imagen1, imagen2, imagen3, imagen4].filter((imagen => imagen !== "")));
    }
  }
  
  const botonComentar = <BotonAnchoTotal type="submit" className="btn btn-primary" onClick={ hacerComentario }>Comentar</BotonAnchoTotal>
  
  return(
    <>
      <EncabezadoModalFade { ...{ idModal } } titulo="Comentar" />
      <div className="modal-body">
        <Toast color="rojo" visible={ mostrarError } >El comentario no puede estar vacío</Toast>
        <form onSubmit={ e => e.preventDefault() } >
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="escriba un comentario..." onChange={ e => setTexto(e.target.value) } value={ texto } />
          <input type="url" className="form-control" id="exampleFormControlInput2" placeholder="agregue una imagen..." onChange={ e => setImagen1(e.target.value) } value={ imagen1 } />
          <input type="url" className="form-control" id="exampleFormControlInput3" placeholder="agregue una imagen..." onChange={ e => setImagen2(e.target.value) } value={ imagen2 } />
          <input type="url" className="form-control" id="exampleFormControlInput4" placeholder="agregue una imagen..." onChange={ e => setImagen3(e.target.value) } value={ imagen3 } />
          <input type="url" className="form-control" id="exampleFormControlInput5" placeholder="agregue una imagen..." onChange={ e => setImagen4(e.target.value) } value={ imagen4 } />
          {puedeComentar() && <OcultadorModal { ...{ idModal } }>{ botonComentar }</OcultadorModal>}
          {!puedeComentar() && botonComentar}
        </form>
      </div>
    </>
  );
}

export default ContenidoModalComentar