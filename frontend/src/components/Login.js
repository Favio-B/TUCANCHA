import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        navigate('/bienvenida');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 px-3">
      <div className="row w-100">
        {/* Formulario de inicio de sesión */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <h1 className="display-6 fw-bold mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="card p-4">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Entrar</button>
              {error && <p className="text-danger text-center mb-0">{error}</p>}
            </form>
            <p className="text-center mt-3" style={{ color: '#a2b4a9', fontSize: '14px' }}>
              ¿No tienes cuenta? <Link to="/register" className="text-decoration-none" style={{ color: '#94e0b1' }}>Regístrate aquí</Link>
            </p>
          </div>
        </div>

        {/* Logo a la derecha */}
        <div className="col-12 col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img src="/static/img/logo.png" alt="Logo Tu Cancha" className="img-fluid" style={{ maxHeight: '300px' }} />
        </div>
      </div>
    </div>
  );
};

export default Login;
