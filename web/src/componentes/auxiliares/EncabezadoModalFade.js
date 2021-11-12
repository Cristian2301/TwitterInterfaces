import React from 'react'
import OcultadorModal from './OcultadorModal';

const EncabezadoModalFade = ({ idModal, titulo, onClose }) => {
  return(
    <div className="modal-header">
      <h5 className="modal-title">{ titulo }</h5>
      <OcultadorModal { ...{ idModal } }><button {...(onClose ? { onClick: onClose } : {})} type="button" className="btn-close" aria-label="Close"/></OcultadorModal>
    </div>
  );
}

export default EncabezadoModalFade