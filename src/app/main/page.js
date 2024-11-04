"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function mainPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState([
    { task: 'Gym', time: '9 - 11 am', muted: true },
    { task: 'Clases', time: '11:30 am - 4 pm', muted: false },
    { task: 'Reunion', time: '5 - 6 pm', muted: false },
    { task: 'Cita', time: '7 - 8 pm', muted: false },
    { task: 'Partido', time: '11 - 12 pm', muted: false },
  ]);

  const handleNewTask = () => {
    router.push('/new-chore');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-black">
      <div className="w-full max-w-md p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => alert('Día anterior')} className="text-2xl">&#8592;</button>
          <h1 className="text-3xl font-bold text-center">HOY</h1>
          <button onClick={() => alert('Día siguiente')} className="text-2xl">&#8594;</button>
        </div>

        {/* Calendar */}
        <table className="w-full bg-white rounded-lg shadow-md text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-medium">Tarea</th>
              <th className="px-4 py-2 border-b font-medium">Hora</th>
              <th className="px-4 py-2 border-b font-medium">Silenciar</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{task.task}</td>
                <td className="px-4 py-2 border-b">{task.time}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => {
                      let updatedTasks = [...tasks];
                      updatedTasks[index].muted = !updatedTasks[index].muted;
                      setTasks(updatedTasks);
                    }}
                  >
                    {task.muted ? '🔕' : '🔔'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleNewTask}
            className="w-full bg-black text-white py-2 mr-2 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Ingresar Tarea
          </button>
          <button
            onClick={() => alert('Día terminado')}
            className="w-full bg-red-600 text-white py-2 ml-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Terminar Día
          </button>
        </div>
      </div>
    </div>
  );
}
