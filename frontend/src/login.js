import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      onLogin(token); // Llama a función padre si quieres actualizar estado

      alert('Login exitoso');
    } catch (err) {
      console.error(err);
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="p-4 rounded shadow bg-light"
      style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}
    >

      <h2 className='text-center mb4'><strong>Login</strong></h2>

      <div className="mb-3">
        <input
          className='form-control'
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className='mb-3'>
        <input
          className='form-control'
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <button className = "btn btn-primary w-100" type="submit">Iniciar sesión</button>
    </form>
  );
}
