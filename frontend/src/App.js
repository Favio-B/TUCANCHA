import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Login from './components/Login';
import Register from './components/Register';
import Bienvenida from './components/Bienvenida';
import Reservar from './components/Reservar';
import EditarReserva from './components/EditarReserva';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bienvenida" element={<Bienvenida />} />
          <Route path="/reservar_page" element={<Reservar />} />
          <Route path="/editar_reserva/:id" element={<EditarReserva />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;