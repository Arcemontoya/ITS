// src/App.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './System_Access/login';
import Register from './System_Access/register';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('login'); // 'login' o 'register'

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setView('login');
  };

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:5000/api/projects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setProjects(res.data))
    .catch((err) => {
      console.error(err);
      alert('Sesión expirada. Por favor inicia sesión nuevamente.');
      handleLogout();
    });
  }, [token]);

  if (!token) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-3">
          <button
            className={`btn ${view === 'login' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => setView('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={`btn ${view === 'register' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setView('register')}
          >
            Registrarse
          </button>
        </div>
        {view === 'login' ? <Login onLogin={handleLogin} /> : <Register />}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Proyectos</h1>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item">
            <strong>{project.name}</strong> <br />
            {project.issues?.length || 0} issues
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;