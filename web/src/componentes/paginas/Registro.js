import React, { useState } from 'react'
import ModalFueraDeSesion from '../auxiliares/ModalFueraDeSesion.js'
import Toast from '../auxiliares/Toast.js'
import BotonAnchoTotal from '../auxiliares/BotonAnchoTotal.js'
import { useRegister } from '../../hooks/api.js'

const Registro = (props) => {
  const { register } = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepetida, setPasswordRepetida] = useState("");
  const [image, setImage] = useState("");
  
  const [mensajeError, setMensajeError] = useState("");

  const registrar = (event) => {
    event.preventDefault();
    if(password === passwordRepetida) {
      register({ name, email, password, image })
        .catch(error => setMensajeError(error.response.status === 409 ? 
          "Ya hay un usuario registrado con ese email." : 
          "Ocurrió un error inesperado. Intente ingresar en unos minutos."
        ));
    }
    else {
      setMensajeError("Las contraseñas no coinciden.");
    }
  }

  return (
    <ModalFueraDeSesion vueltaBienvenida={ true } className="Registro">
      <Toast color="rojo" visible={ !!mensajeError }>{ mensajeError }</Toast>
      <form onSubmit={ registrar }>
        <input required type="text" className="form-control" placeholder="Ingrese el nombre" onChange={ e => { setName(e.target.value); setMensajeError("") } } />
        <input required type="email" className="form-control" placeholder="Ingrese el email" onChange={ e => { setEmail(e.target.value); setMensajeError("") } } />
        <input required type="password" className="form-control" placeholder="Ingrese la contraseña" onChange={ e => { setPassword(e.target.value); setMensajeError("") } } />
        <input required type="password" className="form-control" placeholder="Repita la contraseña" onChange={ e => { setPasswordRepetida(e.target.value); setMensajeError("") } } /> 
        <input required type="url" className="form-control" placeholder="Ingrese el url de una imagen" onChange={ e => { setImage(e.target.value); setMensajeError("") } } />
        <BotonAnchoTotal type="submit" className="btn btn-primary" >Registrar</BotonAnchoTotal>
      </form>
    </ModalFueraDeSesion>
  );
}

export default Registro
