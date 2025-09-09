import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Bienvenida = () => {
  const [reservas, setReservas] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/bienvenida');
        if (response.status === 200) {
          setUserEmail(response.data.user.email);
          setReservas(response.data.reservas);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        }
        console.error('Error al cargar datos:', error);
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      navigate('/login');
    }
  };

  const handleDeleteReserva = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reserva?')) {
      try {
        await axios.post(`/api/eliminar_reserva/${id}`);
        setReservas(reservas.filter(r => r.id !== id));
      } catch (error) {
        console.error('Error al eliminar reserva:', error);
      }
    }
  };

  return (
    <div>
      {/* Logo */}
      <div className="position-absolute top-0 start-0 p-3" style={{ zIndex: 1050 }}>
        <img src="/static/img/logo.png" alt="Logo Tu Cancha" className="img-fluid" style={{ height: '48px' }} />
      </div>

      {/* Encabezado */}
      <header className="d-flex align-items-center justify-content-between border-bottom px-5 py-3 mt-5" style={{ borderColor: '#2b362f !important' }}>
        <h1 className="h2 fw-bold mb-0">Bienvenido, {userEmail}</h1>
        <button onClick={handleLogout} className="btn btn-secondary rounded-pill px-4">Cerrar Sesión</button>
      </header>

      {/* Imagen de portada */}
      <div className="w-100">
        <img src="/static/img/logo.png" alt="Logo Tu Cancha" className="w-100 bg-white p-4" style={{ height: '256px', objectFit: 'contain' }} />
      </div>

      <main className="px-5 py-4">
        {/* Galería tipo slider infinito */}
        <section className="mb-5">
          <h2 className="h4 fw-semibold mb-4">Canchas disponibles</h2>
          <div className="slider-wrapper">
            <div className="slider-track">
              {[1, 2].map(i => (
                <React.Fragment key={i}>
                  <div className="card" style={{ backgroundColor: '#1d221e', minWidth: '300px', marginRight: '1rem' }}>
                    <img src="/static/img/salitre.png" className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt="Salitre" />
                    <div className="card-body p-3">
                      <h3 className="card-title fw-semibold h5 mb-1">Salitre</h3>
                      <p className="card-text small" style={{ color: '#a2b4a9' }}>Cl. 63 #60-50</p>
                    </div>
                  </div>
                  <div className="card" style={{ backgroundColor: '#1d221e', minWidth: '300px', marginRight: '1rem' }}>
                    <img src="/static/img/modelia.png" className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt="Modelia" />
                    <div className="card-body p-3">
                      <h3 className="card-title fw-semibold h5 mb-1">Modelia</h3>
                      <p className="card-text small" style={{ color: '#a2b4a9' }}>Cl. 24c #81-99 a 81-61</p>
                    </div>
                  </div>
                  <div className="card" style={{ backgroundColor: '#1d221e', minWidth: '300px', marginRight: '1rem' }}>
                    <img src="/static/img/hayuelos.png" className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt="Hayuelos" />
                    <div className="card-body p-3">
                      <h3 className="card-title fw-semibold h5 mb-1">Hayuelos</h3>
                      <p className="card-text small" style={{ color: '#a2b4a9' }}>Cl. 19b #81b-45</p>
                    </div>
                  </div>
                  <div className="card" style={{ backgroundColor: '#1d221e', minWidth: '300px', marginRight: '1rem' }}>
                    <img src="/static/img/villemar.png" className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt="Villemar" />
                    <div className="card-body p-3">
                      <h3 className="card-title fw-semibold h5 mb-1">Villemar</h3>
                      <p className="card-text small" style={{ color: '#a2b4a9' }}>Cl. 18 #96b-47</p>
                    </div>
                  </div>
                  <div className="card" style={{ backgroundColor: '#1d221e', minWidth: '300px', marginRight: '1rem' }}>
                    <img src="/static/img/parque el ruby.png" className="card-img-top" style={{ height: '160px', objectFit: 'cover' }} alt="Parque El Ruby" />
                    <div className="card-body p-3">
                      <h3 className="card-title fw-semibold h5 mb-1">Parque El Ruby</h3>
                      <p className="card-text small" style={{ color: '#a2b4a9' }}>Cra. 96k #23g-03</p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Reservas del usuario */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h2 className="h4 fw-semibold mb-0">Tus Reservas</h2>
          <Link to="/reservar_page" className="btn btn-primary px-4 py-2">Nueva Reserva</Link>
        </div>

        {reservas.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Correo</th>
                  <th className="p-3">Teléfono</th>
                  <th className="p-3">Ubicación</th>
                  <th className="p-3">Hora</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map(r => (
                  <tr key={r.id}>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{r.phone || 'N/A'}</td>
                    <td className="p-3">{r.location}</td>
                    <td className="p-3">{r.reservation_time}</td>
                    <td className="p-3">{r.reservation_date}</td>
                    <td className="p-3">
                      <div className="d-flex flex-column gap-1">
                        <Link to={`/editar_reserva/${r.id}`} className="btn btn-warning btn-sm">Editar</Link>
                        <button 
                          onClick={() => handleDeleteReserva(r.id)} 
                          className="btn btn-danger btn-sm w-100"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: '#a2b4a9' }}>No tienes reservas registradas aún.</p>
        )}
      </main>
    </div>
  );
};

export default Bienvenida;
