import React from 'react';
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


function App() {
  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });


  return (
      <ApolloProvider client={client}>
          <Router>
            <Routes>
            <Route exact="true" path="/" element={<Login/>} >
              </Route>
            <Route exact="true" path="/auth/register" element={<Register />} >
              </Route>
              
              <Route exact="true" path="/proyectos" element={<MainProyectos />} >
              </Route>

              <Route exact="true" path="/usuarios" element={<MainUsuarios />} >
              </Route>

              <Route exact="true" path="/avances" element={<MainAvances />} >
              </Route>              
            </Routes>
          </Router>
      </ApolloProvider>

  );

}

export default App;
