import React from 'react'
import EncabezadoModalFade from './EncabezadoModalFade';
import './estilos/ContenidoModalImagen.css'

const ContenidoModalImagen = ({ idModal, imagen }) => {
  return(
    <>
      <EncabezadoModalFade idModal={ idModal } titulo="" />
      <img src={imagen} className="imagen-contenido-modal-imagen" alt="" />
    </>
  );
}

export default ContenidoModalImagen