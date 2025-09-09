import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reservar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    hora: '',
    fecha: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/submit_reservation', formData);
      
      if (response.status === 201) {
        setMessage('Reserva realizada con éxito. Se envió confirmación por correo electrónico.');
        setTimeout(() => {
          navigate('/bienvenida');
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al realizar la reserva');
    }
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between border-bottom px-5 py-3" style={{ borderColor: '#2b362f !important' }}>
        <div className="d-flex align-items-center gap-3">
          <h2 className="h5 fw-bold mb-0">Tu Cancha</h2>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button onClick={() => navigate('/bienvenida')} className="text-white text-decoration-none btn btn-link">Volver a Bienvenida</button>
        </div>
      </header>

      <main className="d-flex justify-content-center py-5">
        <div className="w-100" style={{ maxWidth: '600px' }}>
          <div className="px-4">
            <h2 className="text-center mb-4" style={{ fontSize: '28px', fontWeight: 'bold' }}>Realizar Reserva en Tu Cancha</h2>

            <form onSubmit={handleSubmit}>
              {/* NOMBRE */}
              <div className="mb-3">
                <label className="form-label fw-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control rounded-3"
                  placeholder="Ingresa tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label fw-medium">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* TELÉFONO */}
              <div className="mb-3">
                <label className="form-label fw-medium">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control rounded-3"
                  placeholder="Ingresa tu número de teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              {/* UBICACIÓN */}
              <div className="mb-3">
                <label className="form-label fw-medium">Ubicación</label>
                <select
                  name="ubicacion"
                  className="form-control rounded-3"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una ubicación</option>
                  <option value="Salitre Cl 63 #60-50">Salitre Cl 63 #60-50</option>
                  <option value="Modelia Cl. 24c #81-99 a 81-61">Modelia Cl. 24c #81-99 a 81-61</option>
                  <option value="Hayuelos Cl.19b#81b-45">Hayuelos Cl.19b#81b-45</option>
                  <option value="Villemar Cl. 18 #96b-47">Villemar Cl. 18 #96b-47</option>
                  <option value="Parque El Ruby Cra. 96k #23g-03">Parque El Ruby Cra. 96k #23g-03</option>
                </select>
              </div>

              {/* HORA */}
              <div className="mb-3">
                <label className="form-label fw-medium">Hora</label>
                <input
                  type="time"
                  name="hora"
                  className="form-control rounded-3"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* FECHA */}
              <div className="mb-3">
                <label className="form-label fw-medium">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  className="form-control rounded-3"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BOTÓN ENVIAR */}
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100 rounded-3 py-3">Enviar</button>
              </div>
            </form>

            {/* MENSAJE */}
            {message && (
              <div className={`text-center py-2 ${message.includes('éxito') ? 'text-success' : 'text-danger'}`}>
                {message}
              </div>
            )}

            {/* BOTÓN VOLVER */}
            <div className="text-center mt-3">
              <button onClick={() => navigate('/bienvenida')} className="btn btn-secondary px-4 py-2">Volver</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reservar;
