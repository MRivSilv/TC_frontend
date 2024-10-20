"use client"
import { useState } from "react";

const CalendarComponent = () => {
  const [tasks, setTasks] = useState([
    { name: "Gym", time: "9 - 11 am", reminder: false },
    { name: "Clases", time: "11:30 am - 4 pm", reminder: true },
    { name: "Reunion", time: "5 - 6 pm", reminder: true },
    { name: "Cita", time: "7 - 8 pm", reminder: true },
    { name: "Partido", time: "11 - 12 pm", reminder: true },
  ]);

  const toggleReminder = (index) => {
    const newTasks = [...tasks];
    newTasks[index].reminder = !newTasks[index].reminder;
    setTasks(newTasks);
  };

  const addTask = () => {
    // Lógica para agregar nueva tarea
  };

  const endDay = () => {
    // Lógica para finalizar el día
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-4 text-center">HOY</h2>

        {/* Tabla de tareas */}
        <table className="table-auto w-full mb-4">
          <thead>
            <tr>
              <th className="text-left">Tarea</th>
              <th className="text-left">Hora</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{task.name}</td>
                <td className="border px-4 py-2">{task.time}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => toggleReminder(index)}>
                    {task.reminder ? "🔔" : "🔕"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botones de acción */}
        <div className="flex justify-between mt-4">
          <button
            onClick={addTask}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900"
          >
            Ingresar Tarea
          </button>
          <button
            onClick={endDay}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Terminar Día
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
