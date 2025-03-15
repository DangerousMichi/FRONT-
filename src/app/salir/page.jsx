"use client";

import { useRouter } from "next/navigation";

export const cerrarSesion = async () => {
    try {
        const response = await fetch("/api/salir", {
            method: "POST",
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Sesión cerrada correctamente:", data);
            const router = useRouter();
            router.push("/login");
        } else {
            console.error("Error al cerrar sesión:", response.status, data);
        }
    } catch (error) {
        console.error("Error en la solicitud de cierre de sesión:", error);
    }
};
 