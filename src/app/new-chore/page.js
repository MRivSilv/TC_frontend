"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import '../styles/NewChorePage.css'

export default function NewChore() {
  const router = useRouter();

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    dias: {
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
    },
    fecha_inicio: "",
    hora_inicio: "",
    fecha_fin: "",
    hora_fin: "",
    prioridad: "",
    notificacion: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Si el campo es un checkbox (días de la semana), actualizamos los días
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        dias: { ...prevData.dias, [name]: checked },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple para asegurarse de que todos los campos requeridos estén llenos
    if (
      !formData.nombre ||
      !formData.prioridad 
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    try {
      // Obtener el ID del usuario autenticado
      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (!userId) {
        alert("No se pudo identificar al usuario. Por favor, inicie sesión.");
        return;
      }

      // Añadir la tarea a la colección "tareas" en Firestore junto con el ID del usuario
      await addDoc(collection(db, "tareas"), {
        ...formData, // Los días seleccionados ya están reflejados aquí
        userId, // Incluir el ID del usuario
      });

      alert("Tarea ingresada con éxito");
      router.push("/main"); // Redirige a la página principal después de guardar
    } catch (error) {
      console.error("Error al ingresar la tarea:", error);
      alert("Hubo un error al ingresar la tarea");
    }
  };

  const handleBack = () => {
    router.back(); // Volver a la página anterior
  };

  return (
    <div className="container">
      <div className="card">
        {/* Botón de volver */}
        <button onClick={handleBack} className="back-button">
          &#8592; {/* Flecha hacia la izquierda */}
        </button>

        <h2 className="title">Ingresar Nueva Tarea</h2>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="label">Días de la Tarea</label>
            {["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"].map((dia) => (
              <div key={dia} className="checkbox-container">
                <input
                  type="checkbox"
                  name={dia}
                  checked={formData.dias[dia]}
                  onChange={handleChange}
                  className="checkbox"
                />
                <label>{dia.charAt(0).toUpperCase() + dia.slice(1)}</label>
              </div>
            ))}
          </div>
          <div>
            <label className="label">Fecha de Inicio</label>
            <input
              type="date"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Hora de Inicio</label>
            <input
              type="time"
              name="hora_inicio"
              value={formData.hora_inicio}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div>
            <label className="label">Prioridad</label>
            <select
              name="prioridad"
              value={formData.prioridad}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="">Seleccione una prioridad</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <button type="submit" className="button">
            Guardar Tarea
          </button>
        </form>
      </div>
    </div>
  );
}
