"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase'; // Asegúrate de que esta ruta sea correcta
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para la confirmación de contraseña
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Resetea el mensaje de error

    // Verifica si la contraseña y la confirmación coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llama a Firebase para registrar al usuario
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Usuario registrado:", userCredential.user);

      // Si el registro es exitoso, muestra un mensaje de éxito
      setSuccess(true);
      setTimeout(() => {
        router.push('/login'); // Redirige a la página de inicio de sesión después de unos segundos
      }, 2000);
    } catch (error) {
      console.error("Error al registrar usuario:", error.message);
      setError(error.message); // Muestra el mensaje de error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Registrarse</h1>
      <form onSubmit={handleRegister} className="w-full max-w-xs">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          autoComplete="new-password"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Registrarse
        </button>
        {success && <p className="text-green-600 mt-4">Registro exitoso, redirigiendo...</p>}
        {error && <p className="text-red-600 mt-4">Error: {error}</p>}
      </form>
      <button
        onClick={() => router.push('/login')}
        className="mt-4 text-blue-600 hover:underline"
      >
        Volver al login
      </button>
    </div>
  );
}
