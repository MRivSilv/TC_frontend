import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAgeavzNgSN6fK_Zjt7Hkj3HCc5JWxzevg",
    authDomain: "timecrafter-d7f33.firebaseapp.com",
    projectId: "timecrafter-d7f33",
    storageBucket: "timecrafter-d7f33.firebasestorage.app",
    messagingSenderId: "656539494832",
    appId: "1:656539494832:web:d420ece74d1d563cc60e75",
    measurementId: "G-9JG4N1ZTYZ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de autenticación
const auth = getAuth(app);
export { auth };
export const db = getFirestore(app);