"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import withAuth from "../../hoc/withAuth";

import "../../styles/MainPage.css";

function DeletePage() {
  const [tasks, setTasks] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const daysOfWeek = [
    "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",
  ];

  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.error("No se pudo identificar al usuario.");
          return;
        }

        const userId = user.uid;

        const tasksQuery = query(
          collection(db, "tareas"),
          where("userId", "==", userId)
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

  const filteredTasks = tasks.filter(
    (task) => task.dias && task.dias[daysOfWeek[selectedDay].toLowerCase()] === true
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    const timeA = a.hora_inicio ? new Date(`1970-01-01T${a.hora_inicio}:00`) : null;
    const timeB = b.hora_inicio ? new Date(`1970-01-01T${b.hora_inicio}:00`) : null;
    if (!timeA) return 1;
    if (!timeB) return -1;
    return timeA - timeB;
  });

  const handlePrevDay = () => {
    setSelectedDay((prevDay) => (prevDay === 0 ? 6 : prevDay - 1));
  };

  const handleNextDay = () => {
    setSelectedDay((prevDay) => (prevDay === 6 ? 0 : prevDay + 1));
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tareas", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={handlePrevDay} className="button">⬅️</button>
        <span className="day">{daysOfWeek[selectedDay]}</span>
        <button onClick={handleNextDay} className="button">➡️</button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre de la Tarea</th>
              <th>Hora</th>
              <th>Prioridad</th>
              <th>Acciones</th>
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
                      onClick={() => handleDeleteTask(task.id)}
                      className="delete-button"
                    >
                      🗑️
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

      <button onClick={() => router.push("/main")} className="survey-button">
        Volver
      </button>
    </div>
  );
}

export default DeletePage;
