import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
      });
      alert('Usuario registrado correctamente');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('Error al registrar usuario');
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="p-4 rounded shadow bg-light"
      style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}
    >
      <h2 className="text-center mb-4"><strong>Registro</strong></h2>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100">
        Registrarse
      </button>
    </form>
  );
}