import React from 'react'

const OcultadorModal = ({ idModal, children }) => {
  const click = (evento) => {
    if(evento.target !== evento.currentTarget){
      evento.currentTarget.click()
    }
  }

  return <div onClick={ click } className={`ocultador-modal-${idModal}`}>{ children }</div>
}

export default OcultadorModal