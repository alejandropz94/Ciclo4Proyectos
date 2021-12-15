import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import './styles/estilos.css';
import { ApolloProvider, ApolloClient,InMemoryCache } from '@apollo/client';
import MainProyectos from './components/proyectos/MainProyectos';
import MainUsuarios from './components/usuarios/MainUsuarios';
import MainAvances from './components/avances/MainAvances';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PerfilEditar from './components/usuarios/PerfilEditar';
import { AuthContext } from './context/authContext';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
  cache: new InMemoryCache(),
});
function App() {

  const [authToken, setAuthToken] = useState('');

  const setToken = (token) =>{
    setAuthToken(token)
    if(token){
      localStorage.setItem('token', JSON.stringify(token))
    }
  }


  return (
      <ApolloProvider client={client}>
         <AuthContext.Provider value={setToken}>

         
          <Router>
            <Routes>
            <Route exact="true" path="/auth/login" element={<Login/>} >
              </Route>
            <Route exact="true" path="/auth/register" element={<Register />} >
              </Route>
              
              <Route exact="true" path="/proyectos" element={<MainProyectos />} >
              </Route>

              <Route exact="true" path="/usuarios" element={<MainUsuarios />} >
              </Route>

              <Route
                  path='/usuarios/editar/:_id'
                  element={<PerfilEditar />}
                />
              
              <Route exact="true" path="/avances" element={<MainAvances />} >
              </Route>              
            </Routes>
          </Router>
          </AuthContext.Provider>
      </ApolloProvider>

  );

}

export default App;
