import React from 'react'
import BotonVueltaBienvenida from './BotonVueltaBienvenida';
import './estilos/ModalFueraDeSesion.css'

const ModalFueraDeSesion = ({ vueltaBienvenida, className, children }) => {
  return (
    <div className={className}>
      <div className="modal modal-fuera-de-sesion">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col columna-central" >
                    {vueltaBienvenida && <BotonVueltaBienvenida />}
                  </div>
                  <div className="col-md-auto columna-central">
                    {children}
                  </div>
                  <div className="col" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFueraDeSesion
