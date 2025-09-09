import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        email,
        password
      });

      if (response.status === 201) {
        setMessage('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="container-fluid px-5 d-flex justify-content-center py-5">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5 py-5">
        <h2 className="text-white text-center mb-4" style={{ fontSize: '28px', fontWeight: 'bold' }}>Crear una cuenta</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control rounded-3"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <input
              type="password"
              className="form-control rounded-3"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100 rounded-3 py-3">
              Registrarse
            </button>
          </div>
        </form>
        
        <p className="text-center mb-3" style={{ color: '#a6b3a2', fontSize: '14px' }}>
          Al registrarte, aceptas nuestros Términos de servicio y Política de privacidad.
        </p>
        
        <div className="text-center">
          <Link to="/login" className="text-decoration-none" style={{ color: '#94e0b1' }}>
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Link>
        </div>
        
        {message && (
          <div className={`text-center py-2 ${message.includes('exitosamente') ? 'text-success' : 'text-danger'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
