"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter(); // Hook de enrutamiento

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías realizar validaciones y enviar los datos al backend (API)
    console.log(formData);
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

        {/* Formulario */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <input
              type="password"
              name="confirmarContraseña"
              placeholder="Confirmar Contraseña"
              value={formData.confirmarContraseña}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botón de Registrarse */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Registrarse
            </button>
          </div>
        </form>

        {/* Botón de Volver */}
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
