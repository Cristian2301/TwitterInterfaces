import React from 'react'
import BotonAnchoTotal from '../auxiliares/BotonAnchoTotal.js'
import ModalFueraDeSesion from '../auxiliares/ModalFueraDeSesion.js'

const Bienvenida = (props) => {

  const ingresar = () => props.history.push('/ingreso')

  const registrar = () => props.history.push('/registro')

  return (
    <ModalFueraDeSesion className="Bienvenida">
      <BotonAnchoTotal className="btn btn-primary" onClick={ ingresar }>Ingresar</BotonAnchoTotal>
      <BotonAnchoTotal className="btn btn-outline-primary" onClick={ registrar }>Registrarse</BotonAnchoTotal>
    </ModalFueraDeSesion>
  );
}

export default Bienvenida
