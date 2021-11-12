import axios from 'axios';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { SessionContext } from '../componentes/sesion/Sesion';

const api = (token) => {
  return axios.create({
    baseURL: `http://${window.location.hostname}:7000`,
    timeout: 10000,
    headers: { authorization: token }
  });
}
  
const useLogin = () => {
  const { state: { user }, actions: { setUser } } = useContext(SessionContext)
  const history = useHistory()

  const login = (data) => {
    return api().post('/login', data)
    .then(response => { 
      let userUpdated = { ...user , token: response.headers.authorization }
      setUser(userUpdated)
      localStorage.setItem("user", JSON.stringify(userUpdated))
      history.push('/inicio');
    })
  }

  return { login }
}

const useLogout = () => {
  const { actions: { setUser } } = useContext(SessionContext);
  const history = useHistory();

  const logout = () => {
    setUser({ id: "", name: "", image: "", followers: [], timeline: [], token: "" })
    localStorage.removeItem('user')
    history.push('/')
  }

  return { logout }
}

const useSearch = () => {
  const { state: { user: { token } } } = useContext(SessionContext);
  
  const search = (textoABuscar, callback) => {
    return api(token).get(`/search?q=${textoABuscar}`)
      .then(({ data: { content } }) => callback(content))
  }

  return { search }
}

const useAuthenticatedUser = () => {
  const { state: { user: { token } }, actions: { setUser } } = useContext(SessionContext);
  
  const getAuthenticatedUser = (callback) => {
    return api(token).get('/user')
      .then(({ data }) => {
        let userUpdated = { ...data, token }
        setUser(userUpdated);
        localStorage.setItem("user", JSON.stringify(userUpdated));
        callback(data);
      })
  }

  return { getAuthenticatedUser }
}

const useRegister = () => {
  const { state: { user }, actions: { setUser } } = useContext(SessionContext)
  const history = useHistory();

  const register = (data) => {
    return api().post('/register', data)
      .then(({ headers: { authorization } }) => {
        let userUpdated = { ...user, token: authorization }
        setUser(userUpdated)
        localStorage.setItem("user", JSON.stringify(userUpdated))
        history.push('/inicio');
      })
  }

  return { register }
}

const useTweet = () => {
  const { state: { user: { token } } } = useContext(SessionContext);

  const getTweet = (idTweet, callback) => {
    return api(token).get(`/tweet/${idTweet}`)
      .then(({ data }) => callback(data))
  }

  return { getTweet }
}

const useUser = () => {
  const { state: { user: { token } } } = useContext(SessionContext);

  const getUser = (idUsuario, callback) => {
    return api(token).get(`/user/${idUsuario}`)
      .then(({ data }) => callback(data))
  }

  return { getUser }
}

const useFollow = () => {
  const { state: { user }, actions: { setUser } } = useContext(SessionContext);

  const followed = (idUsuario) => user.followers.map(seguido => seguido.id).includes(idUsuario)

  const canFollow = (idUsuario) => user.id !== idUsuario

  const alternarSeguidor = (usuario) => {
    let userUpdated = { ...user, followers: (followed(usuario.id) ? user.followers.filter(seguido => seguido.id !== usuario.id) : [...user.followers, {id: usuario.id, name: usuario.name, image: usuario.image}])};
    setUser(userUpdated);
    localStorage.setItem("user", JSON.stringify(userUpdated));
  }

  const follow = (usuario) => {
    return api(user.token).put(`/user/${usuario.id}/follow`)
      .then(() => alternarSeguidor(usuario))
  }

  return { follow, followed, canFollow }
}

const useComment = () => {
  const { state: { user: { token } } } = useContext(SessionContext);

  const comment = (idTweet, data, callback) => {
    return api(token).post(`/tweet/${idTweet}/comment`, data)
      .then(response => callback(response.data))
  }

  return { comment }
}

const useLike = () => {
  const { state: { user } } = useContext(SessionContext);

  const like = (idTweet, callback) => {
    return api(user.token).put(`/tweet/${idTweet}/like`)
      .then(() => callback())
  }

  const addLike = (likes) => [...likes, { id: user.id, name: user.name, image: user.image }]

  const removeLike = (likes) => likes.filter(like => like.id !== user.id)

  const liked = (likes) => likes.map(like => like.id).includes(user.id) 

  return { like, liked, addLike, removeLike }
}

export {
  useLogin,
  useLogout,
  useSearch,
  useAuthenticatedUser,
  useRegister,
  useTweet,
  useUser,
  useFollow,
  useComment,
  useLike
}