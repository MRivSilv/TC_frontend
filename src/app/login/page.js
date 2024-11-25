"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import '../styles/LoginPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/main'); // Redirige a la página principal o a donde desees después del login
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container">
    <div className="card">
        <h1 className="title">Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                autoComplete="current-password"
            />
            <button type="submit" className="button">
                Iniciar Sesión
            </button>
        </form>
        {error && <p className="error">{error}</p>}
        <a onClick={() => router.push("/register")} className="link">
            ¿No tienes cuenta? Regístrate
        </a>
        <a
            onClick={() => router.push("/login/forgot-password")}
            className="link"
        >
            ¿Olvidaste tu contraseña?
        </a>
    </div>
</div>
  );
}
