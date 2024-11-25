"use client";

import { useState } from "react";
import { db, auth } from "../firebase"; // Asegúrate de que estas rutas sean correctas
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import '../styles/SurveyPage.css'

function SurveyPage() {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [stressLevel, setStressLevel] = useState(null);

    const router = useRouter();
    const questions = [
        {
            id: 1,
            text: "¿Con qué frecuencia te sientes abrumado por tus responsabilidades?",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Rara vez", value: 1 },
                { label: "A veces", value: 2 },
                { label: "Frecuentemente", value: 3 },
                { label: "Siempre", value: 4 },
            ],
        },
        {
            id: 2,
            text: "¿Te resulta difícil relajarte incluso en tu tiempo libre?",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Rara vez", value: 1 },
                { label: "A veces", value: 2 },
                { label: "Frecuentemente", value: 3 },
                { label: "Siempre", value: 4 },
            ],
        },
        {
            id: 3,
            text: "¿Con qué frecuencia tienes problemas para dormir debido a preocupaciones?",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Rara vez", value: 1 },
                { label: "A veces", value: 2 },
                { label: "Frecuentemente", value: 3 },
                { label: "Siempre", value: 4 },
            ],
        },
        {
            id: 4,
            text: "¿Sientes que tienes poco control sobre los eventos de tu vida?",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Rara vez", value: 1 },
                { label: "A veces", value: 2 },
                { label: "Frecuentemente", value: 3 },
                { label: "Siempre", value: 4 },
            ],
        },
        {
            id: 5,
            text: "¿Te sientes físicamente agotado sin razón aparente?",
            options: [
                { label: "Nunca", value: 0 },
                { label: "Rara vez", value: 1 },
                { label: "A veces", value: 2 },
                { label: "Frecuentemente", value: 3 },
                { label: "Siempre", value: 4 },
            ],
        },
    ];

    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = async () => {
        const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
        const weeklyStressLevel = Math.min(Math.round((totalScore / (questions.length * 4)) * 10), 10);

        setStressLevel(weeklyStressLevel);
        setSubmitted(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error("Usuario no autenticado");
            }

            await addDoc(collection(db, "estres"), {
                userId: user.uid,
                stressLevel: weeklyStressLevel,
                timestamp: new Date(),
            });
            console.log("Nivel de estrés guardado exitosamente.");
        } catch (error) {
            console.error("Error al guardar el nivel de estrés:", error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                {!submitted ? (
                    <>
                        <h2 className="title">Cuestionario de Estrés Semanal</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="form">
                            {questions.map((question) => (
                                <div key={question.id} className="question">
                                    <p>{question.text}</p>
                                    <div className="checkbox-container">
                                        {question.options.map((option) => (
                                            <label key={option.value}>
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`}
                                                    value={option.value}
                                                    onChange={() => handleAnswerChange(question.id, option.value)}
                                                    className="checkbox"
                                                    required
                                                />
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={handleSubmit} className="button">
                                Enviar Respuestas
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="result">
                        <h2 className="title">Tu Nivel de Estrés Semanal es: {stressLevel}</h2>
                        <div className="button-container">
                            <button onClick={() => router.push("/main")} className="nav-button">
                                Volver al Inicio
                            </button>
                            <button onClick={() => router.push("/survey/history")} className="nav-button secondary">
                                Ver Historial
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SurveyPage;
