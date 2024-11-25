"use client"
import React from "react";
import { Line } from "react-chartjs-2";
import { useRouter } from "next/navigation";

import '../../styles/HistoryPage.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SurveyHistory = () => {
  const router = useRouter();

  // Datos simulados (reemplazar con datos reales desde Firebase)
  const data = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"], // Etiquetas para el eje X
    datasets: [
      {
        label: "Nivel de Estrés",
        data: [6, 7, 5, 8, 7], // Niveles de estrés por semana
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#4f46e5",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  // Manejar redirección al inicio
  const handleBackToMain = () => {
    navigate("/main");
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Historial de Estrés Semanal</h2>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
        <button onClick={() => router.push("/main")} className="nav-button">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default SurveyHistory;