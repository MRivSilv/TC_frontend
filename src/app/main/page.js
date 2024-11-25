"use client";
import { useState, useEffect } from "react";
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Para obtener el usuario logueado
import { useRouter } from "next/navigation";
import withAuth from "../hoc/withAuth";

import "../styles/MainPage.css";

function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date().getDay()); // Día actual
  const [selectedDay, setSelectedDay] = useState(new Date().getDay()); // Día seleccionado
  const [notifications, setNotifications] = useState({}); // Almacenar el estado de la campana de cada tarea
  const daysOfWeek = [
    "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",
  ];

  const router = useRouter();

  useEffect(() => {
    // Función para obtener las tareas del usuario logueado
    const fetchTasks = async () => {
      try {
        // Obtener el ID del usuario logueado
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("No se pudo identificar al usuario.");
          return;
        }

        const userId = user.uid;

        // Consultar las tareas de Firestore para este usuario
        const tasksQuery = query(
          collection(db, "tareas"),
          where("userId", "==", userId) // Filtrar por el ID del usuario
        );
        const querySnapshot = await getDocs(tasksQuery);
        const tasksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Filtrar las tareas por el día seleccionado
  const filteredTasks = tasks.filter(
    (task) => task.dias && task.dias[daysOfWeek[selectedDay].toLowerCase()] === true
  );

  // Ordenar las tareas por hora de inicio
  const sortedTasks = filteredTasks.sort((a, b) => {
    const timeA = a.hora_inicio ? new Date(`1970-01-01T${a.hora_inicio}:00`) : null;
    const timeB = b.hora_inicio ? new Date(`1970-01-01T${b.hora_inicio}:00`) : null;

    if (!timeA) return 1; // Si `timeA` no está definido, lo mueve al final
    if (!timeB) return -1; // Si `timeB` no está definido, lo mueve al final
    return timeA - timeB;
  });

  // Funciones para cambiar entre días
  const handlePrevDay = () => {
    setSelectedDay((prevDay) => (prevDay === 0 ? 6 : prevDay - 1));
  };

  const handleNextDay = () => {
    setSelectedDay((prevDay) => (prevDay === 6 ? 0 : prevDay + 1));
  };

  // Función para manejar el cambio de estado de la campana
  const handleNotificationToggle = (taskId) => {
    setNotifications((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  // Verificar la hora y enviar la notificación si la campana está activada
  const checkTaskTime = () => {
    const now = new Date();
    sortedTasks.forEach((task) => {
      if (task.hora_inicio) {
        const taskTime = new Date(`1970-01-01T${task.hora_inicio}:00`);
        if (
          now.getHours() === taskTime.getHours() &&
          now.getMinutes() === taskTime.getMinutes()
        ) {
          if (notifications[task.id]) {
            new Notification(`¡Es hora de ${task.nombre}!`, {
              body: `Es hora de empezar la tarea: ${task.nombre}`,
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    // Verificar la hora cada minuto
    const interval = setInterval(checkTaskTime, 60000);
    return () => clearInterval(interval);
  }, [notifications, sortedTasks]);

  return (
    <div className="container">
      {/* Encabezado con el día */}
      <div className="header">
        <button onClick={handlePrevDay} className="button">⬅️</button>
        <span className="day">{daysOfWeek[selectedDay]}</span>
        <button onClick={handleNextDay} className="button">➡️</button>
      </div>

      {/* Tabla de Tareas */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre de la Tarea</th>
              <th>Hora</th>
              <th>Prioridad</th>
              <th>Notificación</th> {/* Nueva columna para la campana */}
            </tr>
          </thead>
          <tbody>
            {sortedTasks.length > 0 ? (
              sortedTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.nombre}</td>
                  <td>{task.hora_inicio || "Indefinida"}</td>
                  <td>{task.prioridad}</td>
                  <td>
                    <button
                      onClick={() => handleNotificationToggle(task.id)}
                      className={`bell-button ${notifications[task.id] ? "active" : ""}`}
                    >
                      🔔
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty">No hay tareas para este día</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Botón para agregar tarea */}
      <button onClick={() => router.push("/new-chore")} className="add-task">
        Ingresar Nueva Tarea
      </button>
      <button onClick={() => router.push("/main/delete")} className="delete-task">
        Borrar Tarea
      </button>

      {/* Botón para la encuesta */}
      <button onClick={() => router.push("/survey")} className="survey-button">
        Encuesta
      </button>
    </div>
  );
}

export default withAuth(MainPage);
