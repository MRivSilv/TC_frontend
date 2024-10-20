"use client"
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const router = useRouter(); // Hook de enrutamiento

  const handleRegisterRedirect = () => {
    router.push("/register"); // Redirige a la página de registro
  };

  const handleForgotRedirect = () => {
    router.push("/login/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {/* Contenedor del formulario */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        {/* Imagen */}
        <div className="flex justify-center mb-4">
          <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Logo</span>
          </div>
        </div>
        {/* Formulario */}
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Iniciar Sesion
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
              onClick={handleRegisterRedirect}  // Llama a la función para redirigir
            >
              Registrarse
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-gray-500 hover:underline" onClick={handleForgotRedirect}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
