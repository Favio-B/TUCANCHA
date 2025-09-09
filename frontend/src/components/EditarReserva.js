import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditarReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    hora: '',
    fecha: ''
  });

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`/api/reservas/${id}`);
        if (response.status === 200) {
          setFormData({
            nombre: response.data.name,
            email: response.data.email,
            telefono: response.data.phone || '',
            ubicacion: response.data.location,
            hora: response.data.reservation_time,
            fecha: response.data.reservation_date
          });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        } else if (error.response?.status === 404) {
          navigate('/bienvenida');
        }
        console.error('Error al cargar reserva:', error);
      }
    };
    
    fetchReserva();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`/api/actualizar_reserva/${id}`, formData);
      if (response.status === 200) {
        alert('Reserva actualizada exitosamente');
        navigate('/bienvenida');
      }
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
      alert('Error al actualizar la reserva');
    }
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between border-bottom px-5 py-4" style={{ borderColor: '#2b362f !important' }}>
        <h1 className="h2 fw-bold mb-0">Editar Reserva</h1>
        <button onClick={() => navigate('/bienvenida')} className="btn btn-secondary rounded-pill px-4">Volver</button>
      </header>

      <main className="container mt-4 px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <form onSubmit={handleSubmit} className="card p-4">
              <div className="mb-3">
                <label className="form-label" style={{ color: '#a2b4a9' }}>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: '#a2b4a9' }}>Correo</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: '#a2b4a9' }}>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  className="form-control"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: '#a2b4a9' }}>Ubicación</label>
                <select
                  name="ubicacion"
                  className="form-control"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  required
                >
                  <option value="Cancha Central">Cancha Central</option>
                  <option value="Cancha Norte">Cancha Norte</option>
                  <option value="Cancha Sur">Cancha Sur</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#a2b4a9' }}>Hora</label>
                  <input
                    type="time"
                    name="hora"
                    className="form-control"
                    value={formData.hora}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ color: '#a2b4a9' }}>Fecha</label>
                  <input
                    type="date"
                    name="fecha"
                    className="form-control"
                    value={formData.fecha}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary px-4 py-2">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditarReserva;
