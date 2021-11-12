import React from 'react'

const Toast = ({color, visible, children}) => {
  
  const tipoDeAlerta = () => {
    switch (color) {
      case "rojo":
        return "alert-danger";
      case "azul":
        return "alert-primary";
      case "verde":
        return "alert-success";
      default:
        return "alert-primary";
    }
  }

    return (
      visible ? <div className={`alert ${tipoDeAlerta()}`} role="alert">
        {children}
      </div> : <></>
    );
     
} 

export default Toast