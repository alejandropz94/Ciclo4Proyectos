import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import './styles/estilos.css';
import MainProyectos from './components/proyectos/MainProyectos';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact="true" path="/proyectos" element={<MainProyectos />} >
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
