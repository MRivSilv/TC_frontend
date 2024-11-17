"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // Si el usuario no está autenticado, redirigir a /login
          router.push("/login");
        }
      });

      return () => unsubscribe(); // Cleanup el listener cuando el componente se desmonta
    }, [router]);

    return <Component {...props} />;
  };
}