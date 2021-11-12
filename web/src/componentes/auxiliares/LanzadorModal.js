import React, { useState } from 'react'
import ModalFade from './ModalFade.js';

const LanzadorModal = ({ idModal, classNameModal, componenteContenido, propsComponenteContenido, children }) => {
  const [lanzarModal, setLanzarModal] = useState(false);
  
  return(
      <>
        <div className="lanzador-modal" onClick={() => setLanzarModal(true)}>
          { children }
        </div>
        {lanzarModal && <ModalFade id={ idModal } className={ classNameModal } alCerrar={ () => setLanzarModal(false) }>
          {React.createElement(componenteContenido, propsComponenteContenido, {})}
        </ModalFade>}
      </>
  );
}

export default LanzadorModal