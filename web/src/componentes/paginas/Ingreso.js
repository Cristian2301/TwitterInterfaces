import React, {useState} from 'react'
import ModalFueraDeSesion from '../auxiliares/ModalFueraDeSesion.js'
import BotonAnchoTotal from '../auxiliares/BotonAnchoTotal.js';
import { useLogin } from '../../hooks/api.js';
import Toast from '../auxiliares/Toast.js';

const Ingreso = () => {
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("")

  const iniciar = (event) => {
    event.preventDefault();
    login({ email, password })
      .catch((error) => setMensajeError(error.response.status === 404 ? 
        "Email o contraseña erróneos" : 
        "Ocurrió un error inesperado. Intente ingresar en unos minutos."
      )
    );
  }

  return (
    <ModalFueraDeSesion vueltaBienvenida={ true } className="Ingreso">
      <Toast color="rojo" visible={ !!mensajeError }>{ mensajeError }</Toast>
      <form onSubmit={ iniciar }>
        <input required type="email" className="form-control" placeholder="name@example.com" onChange={ e => { setEmail(e.target.value); setMensajeError("") } } />
        <input required type="password" className="form-control" placeholder="*******" onChange={ e => { setPassword(e.target.value); setMensajeError("") } } />
        <BotonAnchoTotal type="submit" className="btn btn-primary">Ingresar</BotonAnchoTotal>
      </form>
    </ModalFueraDeSesion>
  );
}

export default Ingreso
