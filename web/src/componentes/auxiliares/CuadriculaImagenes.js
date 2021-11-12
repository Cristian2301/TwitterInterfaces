import React from 'react'
import ContenidoModalImagen from './ContenidoModalImagen';
import CursorLink from './CursorLink';
import './estilos/CuadriculaImagenes.css'
import LanzadorModal from './LanzadorModal';

const CuadriculaImagenes = ({ imagenes, idTweet }) => {
  return(
    imagenes.length > 0 ?
      <div className="container sin-espacios separacion-vertical-container">
        {[imagenes.slice(0, 2), imagenes.slice(2, 4)].map((parDeImagenes, idPar) => {
          return(
            <div key={`${idTweet}-${idPar}`} className="row sin-espacios-row">
              {parDeImagenes.map((imagen, idImagen) => {
                return(
                  <div key={`${idTweet}-${idPar}-${idImagen}`} className="col sin-espacios-col">
                    <CursorLink>
                      <LanzadorModal idModal={`imagen-${idTweet}-${idPar}-${idImagen}`} componenteContenido={ ContenidoModalImagen } propsComponenteContenido={{imagen, idModal: `imagen-${idTweet}-${idPar}-${idImagen}`}}>
                        <img src={imagen} className="img-thumbnail imagen-tweet" alt="" />
                      </LanzadorModal>
                    </CursorLink>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    : <></>
  );
} 

export default CuadriculaImagenes