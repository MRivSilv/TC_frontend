"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter(); // Hook para la navegación
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías realizar validaciones y enviar la solicitud de restablecimiento de contraseña
    console.log("Correo enviado para restablecer contraseña:", email);
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirige a la página de login
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        {/* Imagen del logo */}
        <div className="flex justify-center mb-4">
          <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Logo</span>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botón de Enviar */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Enviar Correo de Recuperación
            </button>
          </div>
        </form>

        {/* Botón de Volver al Login */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            onClick={handleLoginRedirect}
          >
            Volver al Login
          </button>
        </div>
      </div>
    </div>
  );
}
