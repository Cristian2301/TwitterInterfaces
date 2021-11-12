import React, { useEffect, useState } from 'react'
import './estilos/ModalFade.css'

const ModalFade = ({ id, className, alCerrar, children }) => {
  const [mostrarFade, setMostrarFade] = useState("");
  const [display, setDisplay] = useState("modal-fade-bloque")
  const producirFadeApertura = () => {
    setMostrarFade("show")
    document.body.style.overflow = "hidden"
  }
  const [efecto, setEfecto] = useState({ callback: producirFadeApertura});

  useEffect(() => {
    efecto.callback();
    return () => document.body.style.overflow = "visible"
  }, [efecto])

  const producirFadeCierre = () => {
    setMostrarFade("");
    setEfecto({ callback: displayNone });
  }

  const displayNone = () => {
    setTimeout(() => {
      setDisplay("modal-fade-none")
      setEfecto({ callback: alCerrar });
      document.body.style.overflow = "visible"
    }, 150);
  }

  const cerrar = (e) => {
    if(e.target.id === id || e.target.classList.contains(`ocultador-modal-${id}`) || e.target.classList.contains("ocultador-modal-")){
      if(e.target.classList.contains(`ocultador-modal-${id}`)){
        e.stopPropagation();
      }
      setEfecto({ callback: producirFadeCierre })
    }
  }

  return(
    <>
      <div id={id} onClick={ cerrar } className={`modal fade modal-fade ${display} ${mostrarFade}`} aria-modal="true" role="dialog">
        <div className={`${className ? className : ""} modal-dialog modal-dialog-scrollable modal-fullscreen-md-down modal-dialog-modal-fade`}>
          <div className="modal-content">
            { children }
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${display} ${mostrarFade}`}></div>
    </>
  );
}

export default ModalFade