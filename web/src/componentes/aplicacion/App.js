import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import Bienvenida from '../paginas/Bienvenida.js'
import Busqueda from '../paginas/Busqueda.js'
import Ingreso from '../paginas/Ingreso.js'
import Registro from '../paginas/Registro.js'
import Inicio from '../paginas/Inicio.js'
import NotFound from '../paginas/NotFound.js'
import './estilos/App.css'
import { SessionProvider } from '../sesion/Sesion.js'
import Perfil from '../paginas/Perfil.js'
import TweetUsuario from '../paginas/TweetUsuario.js'
import PublicRoute from '../auxiliares/PublicRoute.js'
import PrivateRoute from '../auxiliares/PrivateRoute.js'
import PaginaError from '../paginas/PaginaError.js'

const App = () => (
  <BrowserRouter>
    <SessionProvider>
      <Switch>
        <PublicRoute exact path="/" component={ Bienvenida } />
        <PublicRoute exact path="/ingreso" component={ Ingreso } />
        <PublicRoute exact path="/registro" component={ Registro } />
        <PrivateRoute exact path="/inicio" component={ Inicio } />
        <PrivateRoute exact path="/usuario/:nombre/:id" component={ Perfil } />
        <PrivateRoute exact path="/usuario/:nombre/:id/tweets/:idTweet" component={ TweetUsuario } />
        <PrivateRoute exact path="/busqueda/:texto" component={ Busqueda } />
        <PrivateRoute path="/error" component={ PaginaError } />
        <PrivateRoute path="/noencontrado" component={ NotFound } />
        <PrivateRoute path="*" component={ NotFound } />
      </Switch>
    </SessionProvider>
  </BrowserRouter>
);

export default App
